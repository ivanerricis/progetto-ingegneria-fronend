import useAppointments from "@/hooks/agent/useAppointments";
import AppointmentsPanel from "./components/appointmentsPanel";
import DashboardFilterSelect from "../advertisement/components/dashboardFilterSelect";
import { useState } from "react";
import { BadgeCheck, BadgeX, Clock, Trash } from "lucide-react";

type StatusFilter = "requested" | "confirmed" | "rejected" | "cancelled"

const statusOptions = [
    {
        value: "requested",
        label: "In corso",
        icon: <Clock className="text-foreground size-5" />,
    },
    {
        value: "confirmed",
        label: "Confermati",
        icon: <BadgeCheck className="text-foreground size-5" />,
    },
    {
        value: "rejected",
        label: "Rifiutati",
        icon: <Trash className="text-foreground size-5" />,
    },
    {
        value: "cancelled",
        label: "Annullati",
        icon: <BadgeX className="text-foreground size-5" />,
    },
] as const

export default function Appointments() {
    const { appointments, isLoading, error, confirmAppointment, rejectAppointment } = useAppointments()

    const [statusFilter, setStatusFilter] = useState<StatusFilter>("requested")

    const filteredAppointments = appointments.filter((appointment) => {
        const matchesStatus = statusFilter === appointment.status

        return matchesStatus
    })

    return (
        <div className="flex h-full min-h-0 w-full flex-col gap-2 overflow-hidden p-2">
            <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                            <DashboardFilterSelect
                                value={statusFilter}
                                placeholder="Stato"
                                options={[...statusOptions]}
                                onValueChange={(value) => setStatusFilter(value as StatusFilter)}
                            />
                        </div>
                    </div>

                    {!isLoading && !error && (
                        <div className="flex items-center text-start text-foreground">
                            Risultati della ricerca: {filteredAppointments.length}
                        </div>
                    )}
                </div>

                <div className="w-full min-h-0 flex-1 overflow-y-auto pr-1">
                    <AppointmentsPanel
                        appointments={filteredAppointments}
                        isLoading={isLoading}
                        error={error}
                        onConfirm={confirmAppointment}
                        onReject={rejectAppointment}
                    />
                </div>
            </div>
        </div>
    );
}