import AppointmentsList from "./appointmentsList"
import type { AppointmentsResult } from "@/hooks/agent/useAppointments"
import { CardAppointmentSkeleton } from "./cardAppointmentSkeleton"

type AppointmentsTabPanelProps = {
    appointments: AppointmentsResult[]
    isLoading: boolean
    error: string | null
    onConfirm: (id: number) => Promise<void>
    onReject: (id: number) => Promise<void>
}

export default function AppointmentsPanel({ appointments, isLoading, error, onConfirm, onReject }: AppointmentsTabPanelProps) {
    return (
        <div className="flex flex-col gap-2">
            {isLoading && (
                <div className="flex flex-col sm:flex-row gap-2">
                    <CardAppointmentSkeleton />
                    <CardAppointmentSkeleton />
                    <CardAppointmentSkeleton />
                    <CardAppointmentSkeleton />
                </div>
            )}

            {error && (
                <p className="text-sm text-destructive" role="alert">
                    {error}
                </p>
            )}

            {!isLoading && !error && appointments.length === 0 && (
                <p className="text-sm text-muted-foreground">Nessun appuntamento disponibile.</p>
            )}

            {!isLoading && !error && appointments.length > 0 && (
                <div className="pr-1">
                    <AppointmentsList
                        appointments={appointments}
                        onConfirm={onConfirm}
                        onReject={onReject}
                    />
                </div>
            )}
        </div>
    )
}