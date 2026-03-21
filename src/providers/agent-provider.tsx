import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { apiClient } from "@/lib/api/config";
import { setLogoutHandler } from "@/lib/api/interceptors";
import type { Agent } from "@/types/types";

type AgentContextType = {
    agent: Agent | null;
    loading: boolean;
    setAgent: (agent: Agent | null) => void;
    logout: () => Promise<void>;
    refreshAgent: () => Promise<void>;
};

const AgentContext = createContext<AgentContextType | undefined>(undefined);

const STORAGE_KEY = "agent";

type Props = {
    children: ReactNode;
};

export const AgentProvider = ({ children }: Props) => {
    const [agent, setAgentState] = useState<Agent | null>(null);
    const [loading, setLoading] = useState(true);

    const setAgent = useCallback((ag: Agent | null) => {
        setAgentState(ag);

        if (ag) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(ag));
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    }, []);

    const refreshAgent = useCallback(async () => {
        try {
            const res = await apiClient.get<Agent>("/auth/agent");
            setAgent(res.data);
        } catch {
            setAgent(null);
        }
    }, [setAgent]);

    const logout = async () => {
        try {
            await apiClient.post("/auth/agent/logout");
        } catch {
            console.log("Logout failed, but clearing agent data anyway.");
        }

        setAgent(null);
    };

    useEffect(() => {
        setLogoutHandler(() => {
            setAgent(null);
        });
    }, [setAgent]);

    useEffect(() => {
        const init = async () => {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);

                if (stored) {
                    setAgentState(JSON.parse(stored));
                }

                await refreshAgent();
            } finally {
                setLoading(false);
            }
        };

        init();
    }, [refreshAgent]);

    return (
        <AgentContext.Provider
            value={{
                agent,
                loading,
                setAgent,
                logout,
                refreshAgent,
            }}
        >
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