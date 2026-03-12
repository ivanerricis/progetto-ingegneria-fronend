import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react"
import { apiClient } from "@/lib/api/config"
import { setLogoutHandler } from "@/lib/api/interceptors"

export type AgentData = {
    id?: string | number
    username?: string
    firstName?: string
    lastName?: string
    email?: string
    agencyId?: string | number
    agencyName?: string
}

type AgentContextValue = {
    agent: AgentData | null
    loading: boolean
    setAgent: (agent: AgentData | null) => void
    clearAgent: () => void
    logout: () => Promise<void>
    refreshAgent: () => Promise<void>
}

const STORAGE_KEY = "agent-data"

const AgentContext = createContext<AgentContextValue | undefined>(undefined)

const isRecord = (value: unknown): value is Record<string, unknown> => {
    return typeof value === "object" && value !== null
}

const getString = (value: unknown) => {
    return typeof value === "string" && value.length > 0 ? value : undefined
}

const getIdentifier = (value: unknown) => {
    return typeof value === "string" || typeof value === "number" ? value : undefined
}

function readStoredAgent() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) return null

        const parsed = JSON.parse(raw) as AgentData
        if (!parsed || typeof parsed !== "object") return null

        return parsed
    } catch {
        return null
    }
}

function normalizeAgentData(payload: unknown, fallback: AgentData | null = null): AgentData | null {
    if (!isRecord(payload)) {
        return fallback
    }

    const rawAgent = isRecord(payload.agent)
        ? payload.agent
        : isRecord(payload.user)
            ? payload.user
            : payload

    const rawAgency = isRecord(rawAgent.agency)
        ? rawAgent.agency
        : isRecord(payload.agency)
            ? payload.agency
            : null

    const agent: AgentData = {
        id: getIdentifier(rawAgent.id) ?? fallback?.id,
        username: getString(rawAgent.username) ?? fallback?.username,
        firstName: getString(rawAgent.firstName) ?? fallback?.firstName,
        lastName: getString(rawAgent.lastName) ?? fallback?.lastName,
        email: getString(rawAgent.email) ?? fallback?.email,
        agencyId:
            getIdentifier(rawAgent.agencyId) ??
            getIdentifier(rawAgency?.id) ??
            fallback?.agencyId,
        agencyName:
            getString(rawAgent.agencyName) ??
            getString(rawAgency?.name) ??
            fallback?.agencyName,
    }

    const hasAgentData = Object.values(agent).some((value) => value !== undefined)
    return hasAgentData ? agent : fallback
}

export function AgentProvider({ children }: { children: ReactNode }) {
    const [agent, setAgentState] = useState<AgentData | null>(null)
    const [loading, setLoading] = useState(true)

    const setAgent = (nextAgent: AgentData | null) => {
        setAgentState(nextAgent)

        if (!nextAgent) {
            localStorage.removeItem(STORAGE_KEY)
            return
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextAgent))
    }

    const refreshAgent = async () => {
        try {
            const response = await apiClient.get("/auth/agent")
            const nextAgent = normalizeAgentData(response.data, readStoredAgent())
            setAgent(nextAgent)
        } catch {
            setAgent(null)
        }
    }

    const logout = async () => {
        try {
            await apiClient.post("/auth/agent/logout")
        } catch { }

        setAgent(null)
    }

    const clearAgent = () => {
        setAgent(null)
    }

    useEffect(() => {
        setLogoutHandler(() => {
            setAgent(null)
        })
    }, [])

    useEffect(() => {
        const init = async () => {
            try {
                const storedAgent = readStoredAgent()

                if (storedAgent) {
                    setAgentState(storedAgent)
                }

                await refreshAgent()
            } finally {
                setLoading(false)
            }
        }

        void init()
    }, [])

    return (
        <AgentContext.Provider
            value={{
                agent,
                loading,
                setAgent,
                clearAgent,
                logout,
                refreshAgent,
            }}
        >
            {children}
        </AgentContext.Provider>
    )
}

export function useAgent() {
    const context = useContext(AgentContext)
    if (!context) {
        throw new Error("useAgent must be used within AgentProvider")
    }

    return context
}
