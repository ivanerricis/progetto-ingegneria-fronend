import { Button } from "@/components/ui/button";
import type { Appointment } from "@/types/types";
import { Pencil, Trash } from "lucide-react";

type Props = {
    appointment?: Appointment
}

export const CardAppointment = ({ appointment }: Props) => {
    return (
        <div className="flex items-center w-full h-30 border rounded-sm *:flex *:flex-1 *:items-center *:justify-center *:text-foreground divide-x">
            <div className="aspect-square h-full">
                Photo
            </div>

            {/* Advertisement Address */}
            <div>
                {appointment?.advertisement.realEstate.addressFormatted}
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
                <Button variant="outline">
                    <Pencil />
                    Modifica
                </Button>
                <Button variant="destructive">
                    <Trash />
                    Elimina
                </Button>
            </div>
        </div>
    );
}