import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Advertisement } from "@/types/types";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useAvailableSlots } from "@/hooks/account/useAvailableSlots";
import { toast } from "sonner";
import { useAvailableDays } from "@/hooks/account/useAvailableDays";
import { formatLocalDate } from "@/utils/formatLocalDate";
import { CreateAppointment } from "@/lib/api/account";

type DialogProps = {
    showAppointmentDialog: boolean
    setShowAppointmentDialog: (value: boolean) => void
    advertisement: Advertisement
}

export const DialogCreateAppointment = ({ showAppointmentDialog, setShowAppointmentDialog, advertisement }: DialogProps) => {
    const [isOpenPopover, setIsOpenPopover] = useState(false)
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const { daysSet, loading: daysLoading } = useAvailableDays(advertisement.id)
    const { slots, loading: slotsLoading } = useAvailableSlots(advertisement.id, date);

    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setShowAppointmentDialog(false)
        setDate(undefined)
    }

    const handleCreateAppointment = async () => {
        if (!date || !selectedTime) return;
        setIsLoading(true);
        try {
            CreateAppointment(date, selectedTime, advertisement.id)
            setShowAppointmentDialog(false);
            setDate(undefined);
            setSelectedTime("");
            toast.success("Appuntamento creato con successo!");
        } catch (submitError) {
            console.log(submitError)
            const message =
                submitError instanceof Error
                    ? submitError.message
                    : "Errore durante la creazione dell'appuntamento"
            toast.error("Creazione fallita: " + message)
        } finally {
            setIsLoading(false);
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
                    <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
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
                                defaultMonth={daysSet.size ? new Date([...daysSet][0]) : new Date()}
                                captionLayout="dropdown"
                                onSelect={(date) => {
                                    setDate(date)
                                    setIsOpenPopover(false)
                                }}
                                disabled={(day) => {
                                    if (daysLoading) return true;

                                    return !daysSet.has(formatLocalDate(day))
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex flex-col gap-1">
                    <Label className="text-xl">Seleziona un orario</Label>
                    <Select value={selectedTime} onValueChange={setSelectedTime} disabled={!date || slotsLoading || slots.length === 0}>
                        <SelectTrigger className="w-full text-lg!">
                            <SelectValue
                                placeholder={slotsLoading ? "Caricamento..." : (!date ? "Seleziona una data prima" : (slots.length === 0 ? "Nessun orario disponibile" : "Scegli un orario"))}
                            />
                        </SelectTrigger>
                        <SelectContent position={"popper"}>
                            <SelectGroup>
                                {slots.map((slot) => (
                                    <SelectItem
                                        key={slot}
                                        value={slot}
                                        className="text-lg"
                                    >
                                        {slot}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <Button variant={"outline"} size={"lg"} onClick={handleClose} disabled={isLoading}>Annulla</Button>
                    <Button disabled={!date || !selectedTime || isLoading} size={"lg"} onClick={handleCreateAppointment}>
                        {isLoading ? "Prenotazione..." : "Prenota"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}