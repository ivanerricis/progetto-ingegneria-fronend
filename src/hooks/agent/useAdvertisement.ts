import type { Advertisement } from "@/types/types"
import { useEffect, useState } from "react"

export default function useAdvertisement(apiBaseUrl: string, advertisementId?: string) {
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
                const response = await fetch(`${apiBaseUrl}/agent/advertisements/${advertisementId}`, {
                    credentials: "include",
                    signal: abortController.signal
                })

                if (!response.ok) {
                    throw new Error("Impossibile caricare l'annuncio")
                }

                const data = await response.json()
                const item = data?.item ?? data?.advertisement ?? data
                setAdvertisement(item)

            } catch (error) {
                if (error instanceof DOMException && error.name === "AbortError") return

                setError(error instanceof Error ? error.message : "Errore")
            } finally {
                setIsLoading(false)
            }
        }

        fetchAdvertisement()

        return () => abortController.abort()
    }, [apiBaseUrl, advertisementId])

    return { advertisement, isLoading, error }
}