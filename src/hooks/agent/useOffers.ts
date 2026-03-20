import { useEffect, useState } from "react"
import { isCancel } from "axios"
import { apiClient } from "@/lib/api/config"
import type { Offer } from "@/types/types"

export default function useOffers() {
     const [offers, setOffers] = useState<Offer[]>([])
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
                setOffers(data.items)
                console.log(data)
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

    return { offers, isLoading, error }
}