import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { formatDaysTimes } from "@/utils/formatDayTimes";
import { useState, type MouseEvent } from "react";
import { PreviewPhoto } from "@/pages/Agent/dashboard/appointment/components/previewPhoto";
import type { AppointmentsResult } from "@/hooks/account/useAppointments";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

type CardAppointmentProps = {
    appointment: AppointmentsResult;
    cancelAppointment: (id: number) => Promise<void>;
}

export const CardAppointment = ({ appointment, cancelAppointment }: CardAppointmentProps) => {
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);

    const handleCancelButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        setShowCancelDialog(true);
    }

    const handleCancel = async () => {
        setIsCancelling(true);
        try {
            await cancelAppointment(appointment.appointmentId);
            toast.success("Appuntamento annullato con successo!");
        } catch (submitError) {
            const message =
                submitError instanceof Error
                    ? submitError.message
                    : "Errore durante l'annullamento dell'appuntamento"
            toast.error("Annullo fallito: " + message)
        } finally {
            setIsCancelling(false);
            setShowCancelDialog(false)
        }
    }

    return (
        <div className="flex flex-col w-full sm:w-md border rounded-sm divide-y bg-background shadow-sm *:flex *:items-center *:justify-start [&>*:not(:first-child)]:p-2">
            <div className="flex items-center justify-center w-full">
                {appointment?.advertisement.previewPhoto &&
                    <PreviewPhoto photo={appointment.advertisement.previewPhoto} />}
            </div>

            {/* Advertisement Address */}
            <div className="flex flex-col items-start! gap-2 h-28">
                <Label className="text-lg font-bold">Indirizzo</Label>
                <p className="text-lg text-foreground line-clamp-2">{appointment.advertisement.address}</p>
            </div>

            {/* DateTime */}
            <div className="flex items-center gap-2">
                <Label className="text-lg font-bold">Orario: </Label>
                <Label className="text-lg">{formatDaysTimes(appointment.appointmentAt.toString())}</Label>
            </div>

            {/* Agent */}
            <div className="flex items-center gap-2">
                <Label className="text-lg font-bold">Agente: </Label>
                <Label className="text-lg">{appointment.agent.firstName} {appointment.agent.lastName}</Label>
            </div>

            {/* Buttons */}
            {(appointment.status === "requested" || appointment.status === "confirmed") && (
                <div className="flex gap-2 w-full">
                    <Button
                        onClick={handleCancelButtonClick}
                        size={"lg"}
                        variant={"destructive"}
                        className="flex-1"
                    >
                        <X className="size-5" />
                        Annnulla
                    </Button>
                </div>
            )}

            {showCancelDialog && (
                <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                    <DialogContent showCloseButton={false} className="border border-destructive">
                        <DialogHeader>
                            <DialogTitle className="text-destructive!">Annulla appuntamento</DialogTitle>
                            <DialogDescription>
                                Sei sicuro di voler annullare questo appuntamento? Questa azione è irreversibile.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setShowCancelDialog(false)}
                                disabled={isCancelling}
                            >
                                Annulla
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleCancel}
                                disabled={isCancelling}
                            >
                                {isCancelling ? "Annullamento..." : "Annulla"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}