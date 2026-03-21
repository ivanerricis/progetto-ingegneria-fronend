import type { Agent } from "@/types/types"
import { useCallback, useEffect, useState } from "react"
import { isCancel } from "axios"
import { apiClient } from "@/lib/api/config"
import { DeleteAgent } from "@/lib/api/agent"

export default function useAgents() {
    const [agents, setAgents] = useState<Agent[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchAgent = useCallback(async (signal?: AbortSignal) => {
        setError(null)
        setIsLoading(true)

        try {
            const { data } = await apiClient.get("/agent/agents", {
                signal,
            })

            setAgents(data.items)
            console.log(data)
        } catch (error) {
            if (isCancel(error)) return
            setError(error instanceof Error ? error.message : "Errore")
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        const abortController = new AbortController()
        fetchAgent(abortController.signal)
        return () => abortController.abort()
    }, [fetchAgent])

    const deleteAgent = async (id: number) => {
        await DeleteAgent(id)

        setAgents(prev => prev.filter(a => a.id !== id))
    }

    return {
        agents,
        isLoading,
        error,
        refetch: fetchAgent,
        deleteAgent
    }
}