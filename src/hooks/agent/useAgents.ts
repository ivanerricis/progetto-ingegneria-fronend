import type { Agent } from "@/types/types"
import { useCallback, useEffect, useState } from "react"
import { isCancel } from "axios"
import { apiClient } from "@/lib/api/config"
import { DeleteAgent } from "@/lib/api/agent"

/**
 * Hook for fetching the list of agents. Handles loading and error states, and provides a refetch function.
 * @returns An object containing the list of agents, loading state, error message (if any), a refetch function to reload the agents, and a deleteAgent function to remove an agent by ID.
 */
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