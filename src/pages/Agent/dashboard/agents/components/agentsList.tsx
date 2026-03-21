import type { Agent } from "@/types/types"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { CardAgent } from "./cardAgent"

type AgentListProps = {
    agents: Agent[]
    onDelete: (id: number) => Promise<void>
}

export default function AgentsList({ agents, onDelete }: AgentListProps) {
    return (
        <div className="w-full">
            {agents.map(agent => (
                <div key={agent.id} className="block sm:hidden">
                    <CardAgent agent={agent} onDelete={onDelete} />
                </div>
            ))}
            <Table className="hidden sm:table">
                <TableHeader className="w-full">
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Cognome</TableHead>
                        <TableHead>Telefono</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Creato il</TableHead>
                        <TableHead className="text-right">Azioni</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {agents.map((agent) => (
                        <TableRow key={agent.id}>
                            <TableCell className="font-medium">{agent.firstName}</TableCell>
                            <TableCell>{agent.lastName}</TableCell>
                            <TableCell>{agent.phoneNumber}</TableCell>
                            <TableCell>{agent.username}</TableCell>
                            <TableCell>{new Date(agent.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                                <Button
                                    variant={"destructive"}
                                    size={"lg"}
                                    onClick={() => onDelete(Number(agent.id))}
                                >
                                    <Trash className="size-5" />
                                    Elimina
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}