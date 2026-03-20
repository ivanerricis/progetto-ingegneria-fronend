import { useEffect, useState, useCallback } from "react"
import { apiClient } from "@/lib/api/config"
import { ConfirmAppointment, RejectAppointment } from "@/lib/api/agent"
import { isCancel } from "axios"

export type AppointmentsResult = {
    appointmentId: number
    account: { id: number; firstName: string; lastName: string }
    advertisement: { id: number; addressFormatted: string; previewPhoto: string }
    appointmentAt: string
    status: "requested" | "confirmed" | "rejected" | "cancelled"
}

export default function useAppointments() {
    const [appointments, setAppointments] = useState<AppointmentsResult[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchAppointments = useCallback(async (signal?: AbortSignal) => {
        setError(null)
        setIsLoading(true)

        try {
            const { data } = await apiClient.get("/agent/appointments", {
                signal,
            })

            setAppointments(data.appointments)
        } catch (error) {
            if (isCancel(error)) return
            setError(error instanceof Error ? error.message : "Errore")
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        const abortController = new AbortController()
        fetchAppointments(abortController.signal)
        return () => abortController.abort()
    }, [fetchAppointments])

    const confirmAppointment = async (id: number) => {
        await ConfirmAppointment(id)

        setAppointments(prev =>
            prev.map(a =>
                a.appointmentId === id
                    ? { ...a, status: "confirmed" }
                    : a
            )
        )
    }

    const rejectAppointment = async (id: number) => {
        await RejectAppointment(id)

        setAppointments(prev =>
            prev.map(a =>
                a.appointmentId === id
                    ? { ...a, status: "rejected" }
                    : a
            )
        )
    }

    return {
        appointments,
        isLoading,
        error,
        refetch: fetchAppointments,
        confirmAppointment,
        rejectAppointment,
    }
}