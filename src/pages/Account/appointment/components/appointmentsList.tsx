import type { AppointmentsResult } from "@/hooks/account/useAppointments";
import { CardAppointment } from "./cardAppointment";

type Props = {
    appointments: AppointmentsResult[]
    cancelAppointment: (id: number) => Promise<void>
}
export const AppointmentList = ({ appointments, cancelAppointment }: Props) => {
    return (
        <div className="flex flex-wrap items-start w-full gap-2 overflow-y-auto">
            {appointments.map((appointment, index) => (
                <CardAppointment
                    appointment={appointment}
                    key={index}
                    cancelAppointment={cancelAppointment}
                />
            ))}
        </div>
    );
}