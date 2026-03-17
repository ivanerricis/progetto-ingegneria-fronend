import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Check, Trash, X } from "lucide-react";
import { PreviewPhoto } from "./previewPhoto";
import { formatCreatedAt } from "@/utils/formatCreatedAt";
import type { AppointmentsResult } from "@/hooks/agent/useAppointments";

type CardAppointmentProps = {
    appointment?: AppointmentsResult
}

export const CardAppointment = ({ appointment }: CardAppointmentProps) => {
    return (
        <div className="flex flex-col sm:flex-row w-full sm:h-50 border rounded-sm divide-y sm:divide-y-0 sm:divide-x *:flex *:flex-1 *:items-center *:justify-center *:text-foreground [&>*:not(:first-child)]:p-2">
            <div className="aspect-square w-full h-full flex items-center justify-center">
                {appointment?.advertisement.previewPhoto &&
                    <PreviewPhoto photo={appointment.advertisement.previewPhoto} />}
            </div>

            {/* Advertisement Address */}
            <div className="flex items-center justify-center">
                <Label className="text-lg">{appointment?.advertisement.addressFormatted}</Label>
            </div>

            {/* DateTime */}
            <div className="flex flex-col items-center justify-center">
                <Label className="text-lg">{formatCreatedAt(appointment?.appointmentAt)}</Label>
            </div>

            {/* Account */}
            <div className="flex flex-col items-center justify-center">
                <Label className="text-lg">{appointment?.account.firstName} {appointment?.account.lastName}</Label>
            </div>

            {/* Buttons */}
            {((appointment?.status === "requested") || (appointment?.status === "confirmed")) &&
                <div className="flex flex-col w-full h-full gap-2">
                    {appointment?.status === "requested" && (
                        <div className="flex flex-col gap-2 w-full">
                            <Button size={"lg"}>
                                <Check />
                                Conferma
                            </Button>

                            <Button variant="outline" size={"lg"}>
                                <X />
                                Rifiuta
                            </Button>
                        </div>
                    )}
                    {appointment?.status === "confirmed" &&
                        <Button variant="destructive" size={"lg"}>
                            <Trash />
                            Elimina
                        </Button>
                    }
                </div>
            }
        </div>
    );
}