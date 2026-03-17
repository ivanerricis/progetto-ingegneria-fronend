import AdvertisementListSkeleton from "@/pages/Account/homepage/components/advertisementListSkeleton"
import type { Appointment } from "@/types/types"
import AppointmentsList from "./appointmentsList"

type AppointmentsTabPanelProps = {
    appointments: Appointment[]
    isLoading: boolean
    error: string | null
}

export default function AppointmentsPanel({ appointments, isLoading, error }: AppointmentsTabPanelProps) {
    return (
        <div className="flex flex-col gap-2">
            {isLoading && (
                <AdvertisementListSkeleton />
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
                    <AppointmentsList appointments={appointments} />
                </div>
            )}
        </div>
    )
}