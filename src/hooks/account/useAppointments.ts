import { useCallback, useEffect, useState } from "react"
import { isCancel } from "axios"
import { apiClient } from "@/lib/api/config"
import { CancelAppointment } from "@/lib/api/account"

export type AppointmentsResult = {
    appointmentId: number
    agent: { id: number; firstName: string; lastName: string }
    advertisement: { id: number; address: string; previewPhoto: string }
    appointmentAt: string
    status: "requested" | "confirmed" | "rejected" | "cancelled"
}


export default function useAppointments() {
    const [appointments, setAppointments] = useState<AppointmentsResult[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchAppointments = useCallback(async (signal: AbortSignal) => {
        setError(null)
        setIsLoading(true)

        try {
            const { data } = await apiClient.get(`/account/appointments`, {
                signal,
            })
            const item = data?.appointments ?? data?.items ?? data
            setAppointments(item)
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
        return () => { abortController.abort() }
    }, [fetchAppointments])

    const cancelAppointment = async (id: number) => {
        await CancelAppointment(id)

        setAppointments(prev =>
            prev.map(a =>
                a.appointmentId === id
                    ? { ...a, status: "cancelled" }
                    : a
            )
        )
    }

    return {
        appointments,
        isLoading,
        error,
        refetch: fetchAppointments,
        cancelAppointment
    }
}