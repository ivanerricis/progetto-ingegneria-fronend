import type { Advertisement } from "@/types/types"
import { useEffect, useState } from "react"
import axios from "axios"
import { apiClient } from "@/lib/api/config"

export default function useAdvertisements() {
    const [advertisements, setAdvertisements] = useState<Advertisement[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const abortController = new AbortController()

        const fetchAdvertisements = async () => {
            setError(null)
            setIsLoading(true)

            try {
                const { data } = await apiClient.get("/agent/advertisements", {
                    signal: abortController.signal,
                })
                console.log(data.items)
                setAdvertisements(data.items)
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

    return { advertisements, isLoading, error }
}