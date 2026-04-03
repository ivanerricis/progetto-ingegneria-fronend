import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import { apiClient } from "@/lib/api/config";
import { setLogoutHandler } from "@/lib/api/interceptors";
import type { Agent } from "@/types/types";

type AgentContextType = {
    agent: Agent | null;
    loading: boolean;
    updateAgent: (agent: Agent | null) => void;
    logout: () => Promise<void>;
    refreshAgent: () => Promise<void>;
};

const AgentContext = createContext<AgentContextType | undefined>(undefined);

const STORAGE_KEY = "agent";

type Props = {
    children: ReactNode;
};

export const AgentProvider = ({ children }: Props) => {
    const [agent, setAgent] = useState<Agent | null>(null);
    const [loading, setLoading] = useState(true);

    const updateAgent = useCallback((ag: Agent | null) => {
        console.log("Updating agent:", ag);
        setAgent(ag);

        if (ag) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(ag));
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    }, []);

    const refreshAgent = useCallback(async () => {
        try {
            const res = await apiClient.get<Agent>("/auth/agent");
            updateAgent(res.data);
            console.log("Agent refreshed:", res.data);
        } catch {
            updateAgent(null);
        }
    }, [updateAgent]);

    const logout = useCallback (async () => {
        try {
            await apiClient.post("/auth/agent/logout");
        } catch {
            console.warn("Logout failed, but clearing agent data anyway.");
        }

        updateAgent(null);
    }, [updateAgent]);

    useEffect(() => {
        setLogoutHandler(() => {
            updateAgent(null);
        });
    }, [updateAgent]);

    useEffect(() => {
        const init = async () => {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);

                if (stored) {
                    setAgent(JSON.parse(stored));
                }

                await refreshAgent();
            } finally {
                setLoading(false);
            }
        };

        init();
    }, [refreshAgent]);

    const contextValue = useMemo(() => ({
        agent,
        loading,
        updateAgent,
        logout,
        refreshAgent,
    }), [agent, loading, updateAgent, logout, refreshAgent]);

    return (
        <AgentContext.Provider value={contextValue}>
            {children}
        </AgentContext.Provider>
    );
};

export const useAgent = () => {
    const context = useContext(AgentContext);

    if (!context) {
        throw new Error("useAgent must be used inside AgentProvider");
    }

    return context;
};