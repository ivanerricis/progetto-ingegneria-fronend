import { useEffect, useState } from "react"
import type { Agency } from "@/types/types"

type AgenciesResponse = {
    agencies: Agency[]
}

export function useAgencies(apiBaseUrl: string) {
    const [agencies, setAgencies] = useState<Agency[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const abortController = new AbortController()

        async function fetchAgencies() {
            try {
                setLoading(true)
                setError(null)

                const response = await fetch(`${apiBaseUrl}/auth/agencies`, {
                    credentials: "include",
                    signal: abortController.signal
                })

                if (!response.ok) {
                    throw new Error("Impossibile caricare le agenzie")
                }

                const data: AgenciesResponse = await response.json()
                setAgencies(data.agencies ?? [])
            } catch (err) {
                if (err instanceof DOMException && err.name === "AbortError") return

                setError(err instanceof Error ? err.message : "Errore")
                setAgencies([])
            } finally {
                setLoading(false)
            }
        }

        fetchAgencies()

        return () => abortController.abort()
    }, [apiBaseUrl])

    return { agencies, loading, error }
}