import type { Appointment } from "@/types/types"
import { CardAppointment } from "./cardAppointment"

type Props = {
    appointments: Appointment[]
}

export default function AppointmentsList({ appointments }: Props) {
    return (
        <div className="flex flex-wrap gap-2">
            {appointments.map((appointment) => {

                return (
                    <CardAppointment
                        key={appointment.id}
                        appointment={appointment}
                    />
                )
            })}
        </div>
    )
}