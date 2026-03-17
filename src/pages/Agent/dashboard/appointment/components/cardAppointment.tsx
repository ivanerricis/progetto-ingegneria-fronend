import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { Appointment } from "@/types/types";
import { Check, Trash, X } from "lucide-react";
import { PreviewPhoto } from "./previewPhoto";
import { formatCreatedAt } from "@/utils/formatCreatedAt";

type CardAppointmentProps = {
    appointment?: Appointment
}

export const CardAppointment = ({ appointment }: CardAppointmentProps) => {
    return (
        <div className="flex flex-col w-full h-30 border rounded-sm *:flex *:flex-1 *:items-center *:justify-center *:text-foreground">
            <div className="aspect-square h-full">
                {appointment?.advertisement.previewPhoto &&
                    <PreviewPhoto photo={appointment.advertisement.previewPhoto} />}
            </div>

            {/* Advertisement Address */}
            <div className="flex items-center justify-center">
                {/* <Label className="text-nowrap">{appointment?.advertisement.realEstate.addressFormatted}</Label> */}
            </div>

            {/* DateTime */}
            <div className="flex flex-col items-center justify-center">
                <Label className="text-nowrap">{formatCreatedAt(appointment?.appointmentAt)}</Label>
            </div>

            {/* Buttons */}
            {((appointment?.status === "requested") || (appointment?.status === "confirmed")) &&
                <div className="flex flex-col w-full h-full gap-2">
                    {appointment?.status === "requested" &&
                        <>
                            <Button>
                                <Check />
                                Conferma
                            </Button>
                            <Button variant="outline">
                                <X />
                                Rifiuta
                            </Button>
                        </>
                    }
                    {appointment?.status === "confirmed" &&
                        <Button variant="destructive">
                            <Trash />
                            Elimina
                        </Button>
                    }
                </div>
            }
        </div>
    );
}