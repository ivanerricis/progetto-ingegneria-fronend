import type { Appointment } from "@/types/types";
import { Button } from "@mantine/core";

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
            <div>
                <Button variant="outline">
                    Modifica
                </Button>
                <Button variant="outline">
                    Elimina
                </Button>
            </div>
        </div>
    );
}