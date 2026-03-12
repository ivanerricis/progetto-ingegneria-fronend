import type { Advertisement } from "@/types/types"
import { useEffect, useState } from "react"
import axios from "axios"
import { apiClient } from "@/lib/api/config"

export default function useAdvertisement(advertisementId?: string) {
    const [advertisement, setAdvertisement] = useState<Advertisement | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!advertisementId) {
            setAdvertisement(null)
            setError("ID annuncio non valido")
            setIsLoading(false)
            return
        }

        const abortController = new AbortController()

        const fetchAdvertisement = async () => {
            setError(null)
            setIsLoading(true)

            try {
                const { data } = await apiClient.get(`/agent/advertisements/${advertisementId}`, {
                    signal: abortController.signal,
                })
                const item = data?.item ?? data?.advertisement ?? data
                setAdvertisement(item)
            } catch (error) {
                if (axios.isCancel(error)) return

                setError(error instanceof Error ? error.message : "Errore")
            } finally {
                setIsLoading(false)
            }
        }

        fetchAdvertisement()

        return () => abortController.abort()
    }, [advertisementId])

    return { advertisement, isLoading, error }
}