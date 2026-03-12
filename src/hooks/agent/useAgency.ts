import { useEffect, useState } from "react"
import type { Agency } from "@/types/types"
import axios from "axios"
import { apiClient } from "@/lib/api/config"

type AgenciesResponse = {
    agencies: Agency[]
}

export function useAgencies() {
    const [agencies, setAgencies] = useState<Agency[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const abortController = new AbortController()

        async function fetchAgencies() {
            try {
                setLoading(true)
                setError(null)

                const { data } = await apiClient.get<AgenciesResponse>("/auth/agencies", {
                    signal: abortController.signal,
                })

                setAgencies(data.agencies ?? [])
            } catch (err) {
                if (axios.isCancel(err)) return

                setError(err instanceof Error ? err.message : "Errore")
                setAgencies([])
            } finally {
                setLoading(false)
            }
        }

        fetchAgencies()

        return () => abortController.abort()
    }, [])

    return { agencies, loading, error }
}