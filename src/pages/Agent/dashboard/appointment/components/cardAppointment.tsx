import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Check, Trash, X } from "lucide-react";
import { PreviewPhoto } from "./previewPhoto";
import type { AppointmentsResult } from "@/hooks/agent/useAppointments";
import { formatDaysTimes } from "@/utils/formatDayTimes";

type CardAppointmentProps = {
    appointment: AppointmentsResult
}

export const CardAppointment = ({ appointment }: CardAppointmentProps) => {
    return (
        <div className="flex flex-col w-full border rounded-sm divide-y *:flex *:items-center *:justify-start [&>*:not(:first-child)]:p-2">
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
            {((appointment.status === "requested") || (appointment.status === "confirmed")) &&
                <div className="flex flex-col w-full h-full gap-2">
                    {appointment.status === "requested" && (
                        <div className="flex gap-2 w-full">
                            <Button size={"lg"} className="flex-1 rounded-sm">
                                <Check className="size-5" />
                                Conferma
                            </Button>

                            <Button variant="outline" size={"lg"} className="flex-1 rounded-sm">
                                <X className="size-5" />
                                Rifiuta
                            </Button>
                        </div>
                    )}
                    {appointment.status === "confirmed" &&
                        <Button variant="destructive" size={"lg"} className="flex-1 rounded-sm">
                            <Trash className="size-5" />
                            Elimina
                        </Button>
                    }
                </div>
            }
        </div>
    );
}