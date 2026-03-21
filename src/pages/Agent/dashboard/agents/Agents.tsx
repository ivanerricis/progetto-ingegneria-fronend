import useAgents from "@/hooks/agent/useAgents";
import AgentsList from "./components/agentsList";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Agents() {
    const { agents, isLoading, error, deleteAgent } = useAgents()

    return (
        <div className="w-full h-full flex min-h-0 flex-1 flex-col gap-2 overflow-hidden p-2">
            <div className="flex flex-col gap-4">
                {!isLoading && !error && (
                    <div className="flex items-center justify-between text-start text-foreground">
                        <Label>Risultati della ricerca: {agents.length}</Label>
                        <Button>
                            <Plus />
                            Crea agente
                        </Button>
                    </div>
                )}
            </div>

            <div className="w-full min-h-0 flex-1 overflow-y-auto pr-1">
                <AgentsList
                    agents={agents}
                    onDelete={deleteAgent}
                />
            </div>
        </div>
    );
}