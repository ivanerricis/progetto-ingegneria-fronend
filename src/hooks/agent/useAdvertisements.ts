import type { Advertisement } from "@/types/types"
import { useCallback, useEffect, useState } from "react"
import { isCancel } from "axios"
import { apiClient } from "@/lib/api/config"
import { DeleteAdvertisement } from "@/lib/api/agent"

export default function useAdvertisements() {
    const [advertisements, setAdvertisements] = useState<Advertisement[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchAdvertisement = useCallback(async (signal?: AbortSignal) => {
        setError(null)
        setIsLoading(true)

        try {
            const { data } = await apiClient.get("/agent/advertisements", {
                signal,
            })

            setAdvertisements(data.items)
            console.log("Fetched advertisements:", data.items)
        } catch (error) {
            if (isCancel(error)) return
            setError(error instanceof Error ? error.message : "Errore")
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        const abortController = new AbortController()
        fetchAdvertisement(abortController.signal)
        return () => abortController.abort()
    }, [fetchAdvertisement])

    const deleteAdvertisement = async (id: number) => {
        await DeleteAdvertisement(id)

        setAdvertisements(prev => prev.filter(a => a.id !== id))
    }

    return {
        advertisements,
        isLoading,
        error,
        refetch: fetchAdvertisement,
        deleteAdvertisement
    }
}