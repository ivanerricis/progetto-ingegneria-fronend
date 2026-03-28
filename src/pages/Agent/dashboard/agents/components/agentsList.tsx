import type { Agent } from "@/types/types"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Trash } from "lucide-react"
import { CardAgent } from "./cardAgent"
import { DialogDeleteAgent } from "./dialogDeleteAgent"

type AgentListProps = Readonly<{
    agents: Agent[]
    onDelete: (id: number) => Promise<void>
}>

export default function AgentsList({ agents, onDelete }: AgentListProps) {
    const [open, setOpen] = useState(false)
    const [selectedId, setSelectedId] = useState<number | null>(null)

    const handleAskDelete = (id: number) => {
        setSelectedId(id)
        setOpen(true)
    }

    const handleConfirmDelete = async () => {
        if (selectedId !== null) {
            await onDelete(selectedId)
            setOpen(false)
            setSelectedId(null)
        }
    }

    return (
        <div className="w-full">
            <div className="flex flex-col gap-2 sm:hidden">
                {agents.map(agent => (
                    <div key={agent.id} className="block sm:hidden">
                        <CardAgent agent={agent} onAskDelete={handleAskDelete} />
                    </div>
                ))}
            </div>
            <Table className="hidden sm:table bg-background">
                <TableHeader className="w-full">
                    <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Cognome</TableHead>
                        <TableHead>Telefono</TableHead>
                        <TableHead>Username</TableHead>
                        <TableHead>Creato il</TableHead>
                        <TableHead>Admin</TableHead>
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
                            <TableCell>{agent.isAdmin ? "Sì" : "No"}</TableCell>
                            <TableCell className="text-right">
                                <Button
                                    variant={"destructive"}
                                    size={"lg"}
                                    onClick={() => handleAskDelete(Number(agent.id))}
                                >
                                    <Trash className="size-5" />
                                    Elimina
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <DialogDeleteAgent
                showDeleteDialog={open}
                setShowDeleteDialog={setOpen}
                onConfirm={handleConfirmDelete}
            />
        </div>
    );
}