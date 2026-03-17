import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Advertisement } from "@/types/types";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { apiClient } from "@/lib/api/config";
import { useAvailableTimes } from "@/hooks/account/useAvailableSlots";
import { toast } from "sonner";

type Props = {
    showAppointmentDialog: boolean
    setShowAppointmentDialog: (value: boolean) => void
    advertisement: Advertisement
}

export const DialogCreateAppointment = ({ showAppointmentDialog, setShowAppointmentDialog, advertisement }: Props) => {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [selectedTime, setSelectedTime] = useState<string>("");
    const { times, loading: timesLoading, error: timesError } = useAvailableTimes(advertisement.id, date);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setShowAppointmentDialog(false)
        setDate(undefined)
    }

    const handleCreateAppointment = async () => {
        if (!date || !selectedTime) return;
        setLoading(true);
        setError(null);
        try {
            const formattedDate = date.toISOString().split("T")[0];
            await apiClient.post(`/advertisement/create_appointment/${advertisement.id}`, {
                date: formattedDate,
                time: selectedTime,
            });
            setShowAppointmentDialog(false);
            setDate(undefined);
            setSelectedTime("");
            toast.success("Appuntamento creato con successo!");
        } catch (err: any) {
            setError(err?.response?.data?.message || err.message || "Errore nella creazione dell'appuntamento");
            toast.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={showAppointmentDialog} onOpenChange={setShowAppointmentDialog}>
            <DialogContent
                showCloseButton={false}
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col gap-6 sm:max-w-md"
            >
                <DialogTitle>Prenota un appuntamento</DialogTitle>
                <DialogDescription className="hidden" />
                <div className="flex flex-col gap-1">
                    <Label className="text-xl">Seleziona una data</Label>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                id="date"
                                className="justify-between font-normal"
                            >
                                {date ? date.toLocaleDateString() : "gg/mm/aaaa"}
                                <CalendarIcon />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                defaultMonth={date}
                                captionLayout="dropdown"
                                onSelect={(date) => {
                                    setDate(date)
                                    setOpen(false)
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex flex-col gap-1">
                    <Label className="text-xl">Seleziona un orario</Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime} disabled={!date || timesLoading || times.length === 0}>
                        <SelectTrigger className="w-full text-lg!">
                            <SelectValue
                                placeholder={timesLoading ? "Caricamento..." : (!date ? "Seleziona una data prima" : (times.length === 0 ? "Nessun orario disponibile" : "Scegli un orario"))}
                            />
                        </SelectTrigger>
                        <SelectContent position={"popper"}>
                            <SelectGroup>
                                {times.map((time) => (
                                    <SelectItem
                                        key={time}
                                        value={time}
                                        className="text-lg"
                                        >
                                        {time}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <Button variant={"outline"} size={"lg"} onClick={handleClose} disabled={loading}>Annulla</Button>
                    <Button disabled={!date || !selectedTime || loading} size={"lg"} onClick={handleCreateAppointment}>
                        {loading ? "Prenotazione..." : "Prenota"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}