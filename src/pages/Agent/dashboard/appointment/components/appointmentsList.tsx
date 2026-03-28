import { CardAppointment } from "./cardAppointment"
import type { AppointmentsResult } from "@/hooks/agent/useAppointments"

type Props = Readonly<{
    appointments: AppointmentsResult[]
    onConfirm: (id: number) => Promise<void>
    onReject: (id: number) => Promise<void>
}>

export default function AppointmentsList({ appointments, onConfirm, onReject }: Props) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">
            {appointments.map((appointment) => {

                return (
                    <CardAppointment
                        key={appointment.appointmentId}
                        appointment={appointment}
                        onConfirm={onConfirm}
                        onReject={onReject}
                    />
                )
            })}
        </div>
    )
}