import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ModeToggle } from "@/components/mode-toggle";
import { CheckCircle2, Clock, Trash, XCircle } from "lucide-react";
import { AppointmentList } from "./components/appointmentsList";
import useAppointments from "@/hooks/account/useAppointments";
import { useState } from "react";
import DashboardFilterSelect from "@/pages/Agent/dashboard/advertisement/components/dashboardFilterSelect";
import { AccountBadge } from "../homepage/components/accountBadge";
import { CardAppointmentSkeleton } from "@/pages/Agent/dashboard/appointment/components/cardAppointmentSkeleton";
import ButtonBack from "@/components/buttonBack";

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
        icon: <CheckCircle2 className="text-foreground size-5" />,
    },
    {
        value: "rejected",
        label: "Rifiutati",
        icon: <Trash className="text-foreground size-5" />,
    },
    {
        value: "cancelled",
        label: "Annullati",
        icon: <XCircle className="text-foreground size-5" />,
    },
] as const

export default function Appointments() {
    const { appointments, isLoading, error, cancelAppointment } = useAppointments()

    const [statusFilter, setStatusFilter] = useState<StatusFilter>("requested")

    const filteredAppointments = appointments.filter((appointment) => {
        const matchesStatus = statusFilter === appointment.status

        return matchesStatus
    })

    const hasError = Boolean(error)
    const isEmpty = !isLoading && !hasError && filteredAppointments.length === 0
    const hasResults = !isLoading && !hasError && filteredAppointments.length > 0

    return (
        <div className="w-full min-h-screen flex flex-col">
            <Header
                isHomepage
                left={
                    <ButtonBack to="/homepage" />
                }
                right={
                    <>
                        <ModeToggle />
                        <AccountBadge />
                    </>
                }
            />

            <div className="flex flex-1 flex-col gap-2 p-2 w-full bg-secondary overflow-hidden">
                <div className="flex items-center justify-between w-full">
                    <DashboardFilterSelect
                        value={statusFilter}
                        placeholder="Stato"
                        options={[...statusOptions]}
                        onValueChange={(value) => setStatusFilter(value as StatusFilter)}
                    />
                </div>
                <div className="flex-1 min-h-0 w-full">
                    {isLoading && (<div className="flex flex-col sm:flex-row gap-2">
                        <CardAppointmentSkeleton />
                        <CardAppointmentSkeleton />
                        <CardAppointmentSkeleton />
                        <CardAppointmentSkeleton />
                    </div>)}
                    {hasError && (
                        <p className="text-md text-destructive" role="alert">
                            {error}
                        </p>
                    )}

                    {isEmpty && (
                        <p className="text-md text-muted-foreground">Nessun annuncio disponibile.</p>
                    )}

                    {hasResults && (
                        <AppointmentList
                            appointments={filteredAppointments}
                            cancelAppointment={cancelAppointment}
                        />
                    )}
                </div>
            </div>

            <Footer isHomepage />
        </div>
    );
}