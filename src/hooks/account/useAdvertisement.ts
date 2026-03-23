import type { Advertisement } from "@/types/types"
import { useEffect, useState } from "react"
import { isCancel } from "axios"
import { apiClient } from "@/lib/api/config"

/**
 * Hook for fetching a single advertisement by ID. Handles loading and error states.
 * @param advertisementId The ID of the advertisement to fetch. If not provided, the hook will set an error state.
 * @returns An object containing the advertisement data, loading state, and error message (if any).
 */
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
                const { data } = await apiClient.get(`/account/advertisement/${advertisementId}`, {
                    signal: abortController.signal,
                })
                const item = data?.item ?? data?.advertisement ?? data
                setAdvertisement(item)
            } catch (error) {
                if (isCancel(error)) return

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