import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { Agent } from "@/types/types";
import { formatCreatedAt } from "@/utils/formatCreatedAt";
import { Trash } from "lucide-react";

type CardAgentProps = {
    agent: Agent
    onAskDelete: (id: number) => void
}
export const CardAgent = ({ agent, onAskDelete }: CardAgentProps) => {
    return (
        <div className="
        flex flex-col w-full h-full gap-2 border rounded-sm p-2 bg-background
        *:flex *:items-center *:text-nowrap *:gap-2
        *:*:text-lg
        ">
            <div>
                <Label className="font-bold">Nome:</Label>
                <Label>{agent.firstName}</Label>
            </div>
            <div>
                <Label className="font-bold">Cognome:</Label>
                <Label>{agent.lastName}</Label>
            </div>
            <div>
                <Label className="font-bold">Numero di telefono:</Label>
                <Label>{agent.phoneNumber}</Label>
            </div>
            <div>
                <Label className="font-bold">Creato il:</Label>
                <Label>{formatCreatedAt(agent.createdAt)}</Label>
            </div>
            <div>
                <Label className="font-bold">Admin:</Label>
                <Label>{agent.isAdmin ? "Sì" : "No"}</Label>
            </div>
            <Button
                variant={"destructive"}
                size={"lg"}
                className="flex items-center justify-center text-lg!"
                onClick={() => onAskDelete(Number(agent.id))}
            >
                <Trash className="size-5"/>
                Elimina
            </Button>
        </div>
    );
}