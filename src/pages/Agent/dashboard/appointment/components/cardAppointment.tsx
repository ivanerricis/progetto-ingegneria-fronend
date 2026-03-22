import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";
import { PreviewPhoto } from "./previewPhoto";
import type { AppointmentsResult } from "@/hooks/agent/useAppointments";
import { formatDaysTimes } from "@/utils/formatDayTimes";
import { DialogConfirmAppointment } from "./dialogConfirmAppointment";
import { useState, type MouseEvent } from "react";
import { DialogRejectAppointment } from "./dialogRejectAppointment";

type CardAppointmentProps = {
    appointment: AppointmentsResult
    onConfirm: (id: number) => Promise<void>
    onReject: (id: number) => Promise<void>
}

export const CardAppointment = ({ appointment, onConfirm, onReject }: CardAppointmentProps) => {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [showRejectDialog, setShowRejectDialog] = useState(false)

    const handleAppointmentButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        setShowConfirmDialog(true)
    }

    const handleRejectButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        setShowRejectDialog(true)
    }

    return (
        <div className="flex flex-col w-fit border rounded-sm divide-y bg-background shadow-sm *:flex *:items-center *:justify-start [&>*:not(:first-child)]:p-2">
            <div className="flex items-center justify-center">
                {appointment?.advertisement.previewPhoto &&
                    <PreviewPhoto photo={appointment.advertisement.previewPhoto} />}
            </div>

            {/* Advertisement Address */}
            <div className="flex flex-col items-start! gap-2">
                <Label className="text-lg font-bold">Indirizzo</Label>
                <Label className="text-lg">{appointment.advertisement.addressFormatted}</Label>
            </div>

            {/* DateTime */}
            <div className="flex items-center gap-2">
                <Label className="text-lg font-bold">Orario: </Label>
                <Label className="text-lg">{formatDaysTimes(appointment.appointmentAt)}</Label>
            </div>

            {/* Account */}
            <div className="flex items-center gap-2">
                <Label className="text-lg font-bold">Cliente: </Label>
                <Label className="text-lg">{appointment.account.firstName} {appointment.account.lastName}</Label>
            </div>

            {/* Buttons */}
            {((appointment.status === "requested")) &&
                <div className="flex flex-col w-f h-full gap-2">
                    {appointment.status === "requested" && (
                        <div className="flex gap-2 w-full">
                            <Button onClick={handleAppointmentButtonClick} size={"lg"} className="flex-1 rounded-sm">
                                <Check className="size-5" />
                                Conferma
                            </Button>

                            <Button onClick={handleRejectButtonClick} variant="outline" size={"lg"} className="flex-1 rounded-sm">
                                <X className="size-5" />
                                Rifiuta
                            </Button>
                        </div>
                    )}
                </div>
            }

            {showConfirmDialog && (
                <DialogConfirmAppointment
                    showConfirmDialog={showConfirmDialog}
                    setShowConfirmDialog={setShowConfirmDialog}
                    appointmentId={appointment.appointmentId}
                    onConfirm={onConfirm}
                />
            )}

            {showRejectDialog && (
                <DialogRejectAppointment
                    showRejectDialog={showRejectDialog}
                    setShowRejectDialog={setShowRejectDialog}
                    appointmentId={appointment.appointmentId}
                    onReject={onReject}
                />
            )}
        </div>
    );
}