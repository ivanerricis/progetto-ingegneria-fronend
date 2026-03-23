import { useEffect, useState } from "react"
import { isCancel } from "axios"
import { apiClient } from "@/lib/api/config"
import type { Offer } from "@/types/types"

/**
 * Hook for fetching the list of offers (negotiations) for an agent. Handles loading and error states.
 * @returns An object containing the list of offers, loading state, and error message (if any).
 */
export default function useNegotiations() {
     const [negotiations, setNegotiations] = useState<Offer[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const abortController = new AbortController()

        const fetchOffers = async () => {
            setError(null)
            setIsLoading(true)

            try {
                const { data } = await apiClient.get("/agent/negotiations", {
                    signal: abortController.signal,
                })
                setNegotiations(data.items)
                console.log(data.items)
            } catch (error) {
                if (isCancel(error)) return

                setError(error instanceof Error ? error.message : "Errore")
            } finally {
                setIsLoading(false)
            }
        }

        fetchOffers()

        return () => abortController.abort()
    }, [])

    return { negotiations, isLoading, error }
}