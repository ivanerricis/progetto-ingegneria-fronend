import type { Advertisement } from "@/types/types"
import { useEffect, useState } from "react"

export default function useAdvertisements(apiBaseUrl: string) {
    const [advertisements, setAdvertisements] = useState<Advertisement[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const abortController = new AbortController()

        const fetchAdvertisements = async () => {
            setError(null)
            setIsLoading(true)

            try {
                const response = await fetch(`${apiBaseUrl}/account/advertisements`, {
                    credentials: "include",
                    signal: abortController.signal
                })

                if (!response.ok) {
                    throw new Error("Impossibile caricare gli annunci")
                }

                const data = await response.json()
                setAdvertisements(data.items)
                console.log(data.items)

            } catch (error) {
                if (error instanceof DOMException && error.name === "AbortError") return

                setError(error instanceof Error ? error.message : "Errore")
            } finally {
                setIsLoading(false)
            }
        }

        fetchAdvertisements()

        return () => abortController.abort()
    }, [apiBaseUrl])

    return { advertisements, isLoading, error }
}