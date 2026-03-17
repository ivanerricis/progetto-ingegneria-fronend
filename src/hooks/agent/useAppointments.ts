import type { Appointment } from "@/types/types"
import { useEffect, useState } from "react"
import axios from "axios"
import { apiClient } from "@/lib/api/config"

export default function useAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const abortController = new AbortController()

        const fetchAdvertisements = async () => {
            setError(null)
            setIsLoading(true)

            try {
                const { data } = await apiClient.get("/agent/appointments", {
                    signal: abortController.signal,
                })
                setAppointments(data.appointments)
                console.log(data.appointments)
            } catch (error) {
                if (axios.isCancel(error)) return

                setError(error instanceof Error ? error.message : "Errore")
            } finally {
                setIsLoading(false)
            }
        }

        fetchAdvertisements()

        return () => abortController.abort()
    }, [])

    return { appointments, isLoading, error }
}