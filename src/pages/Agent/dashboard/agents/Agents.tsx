import useAgents from "@/hooks/agent/useAgents";
import AgentsList from "./components/agentsList";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAgent } from "@/providers/agent-provider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Agents() {
    const { agent } = useAgent();
    const navigate = useNavigate();
    const { agents, isLoading, error, deleteAgent } = useAgents();

    useEffect(() => {
        if (agent && !agent.isAdmin) {
            navigate("/agent/dashboard", { replace: true });
        }
    }, [agent, navigate]);

    if (!agent?.isAdmin) {
        return null;
    }

    const handleCreateAgent = () => {
        navigate("/agent/dashboard/create-agent");
    }

    return (
        <div className="w-full h-full flex min-h-0 flex-1 flex-col gap-2 overflow-hidden p-2">
            <div className="flex flex-col gap-4">
                {!isLoading && !error && (
                    <div className="flex items-center justify-between text-start text-foreground">
                        <div>
                            Risultati della ricerca: {agents.length}
                        </div>
                        <Button
                            size={"lg"}
                            className="size-10 sm:w-fit sm:h-10 sm:px-4 sm:py-2"
                            onClick={handleCreateAgent}
                        >
                            <Plus className="size-5" />
                            <Label className="hidden sm:flex text-lg">Crea agente</Label>
                        </Button>
                    </div>
                )}
            </div>

            <div className="w-full min-h-0 flex-1 overflow-y-auto">
                <AgentsList
                    agents={agents}
                    onDelete={deleteAgent}
                />
            </div>
        </div>
    );
}