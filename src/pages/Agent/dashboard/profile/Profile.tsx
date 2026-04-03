import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Footer } from "@/components/footer";
import { useAgent } from "@/providers/agent-provider";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatCreatedAt } from "@/utils/formatCreatedAt";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { DeleteAgency } from "@/lib/api/agent";

export default function Profile() {
    const { agent } = useAgent()
    const navigate = useNavigate()
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            if (agent) {
                await DeleteAgency(agent.agency.id)
                toast.success("Agenzia eliminata con successo")
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Si è verificato un errore durante l'eliminazione dell'agenzia")
        } finally {
            setIsDeleting(false)
            setShowDeleteDialog(false)
        }
    }

    if (!agent) return null

    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="flex flex-col w-full h-full items-center justify-center p-4 sm:px-40">
                <div className="flex flex-col items-start justify-center gap-6">
                    <Label className="text-2xl font-bold">Le tue informazioni</Label>
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col gap-1 w-full">
                            <Label className="text-lg text-nowrap">Nome</Label>
                            <Input disabled className="w-full" value={agent.firstName} />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label className="text-lg text-nowrap">Cognome</Label>
                            <Input disabled className="w-full" value={agent.lastName} />
                        </div>
                    </div>
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col gap-1 w-full">
                            <Label className="text-lg text-nowrap">Username</Label>
                            <Input disabled className="w-full" value={agent.username} />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label className="text-lg text-nowrap">Numero di telefono</Label>
                            <Input disabled className="w-full" value={agent.phoneNumber} />
                        </div>
                    </div>
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col gap-1 w-full">
                            <Label className="text-lg text-nowrap">Agenzia</Label>
                            <Input disabled className="w-full" value={agent.agency.name} />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label className="text-lg text-nowrap">Email Agenzia</Label>
                            <Input disabled className="w-full" value={agent.agency.email} />
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 w-full">
                        <div className="flex flex-col flex-1 gap-1">
                            <Label className="text-lg text-nowrap">Creato il</Label>
                            <Input disabled className="w-full" value={formatCreatedAt(agent.createdAt)} />
                        </div>
                        <div className="flex flex-1"></div>
                    </div>
                    <div className="flex flex-row gap-4 w-full">
                        <Button
                            type="button"
                            onClick={() => navigate("/agent/dashboard/password")}
                            className="flex items-center justify-center flex-1"
                        >
                            <Pencil className="size-5" />
                            <span>Modifica password</span>
                        </Button>
                        <Button
                            type="button"
                            variant={"destructive"}
                            size={"lg"}
                            className="flex items-center justify-center flex-1"
                            onClick={() => setShowDeleteDialog(true)}
                        >
                            <Trash2 className="size-5" />
                            <span>Elimina agenzia</span>
                        </Button>
                    </div>
                </div>
            </div>
            <Footer isHomepage />

            {showDeleteDialog && (
                <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                    <DialogContent showCloseButton={false} className="border border-destructive">
                        <DialogHeader>
                            <DialogTitle className="text-destructive!">Elimina agenzia</DialogTitle>
                            <DialogDescription className="text-destructive">
                                Sei sicuro di voler eliminare questa agenzia? Questa azione è irreversibile e tutti i dati verranno persi.
                            </DialogDescription>
                        </DialogHeader>
                        <p className="text-foreground font-bold">Tutti gli agenti associati a questa agenzia perderanno l'accesso al sistema e i loro dati saranno eliminati. Se sei l'amministratore dell'agenzia, perderai anche l'accesso al tuo account.</p>
                        <p className="text-foreground font-bold">Tutti gli annunci associati a questa agenzia saranno eliminati e non saranno più visibili agli utenti. Tutte le negoziazioni in corso saranno terminate e non potranno essere completate.</p>
                        <DialogFooter className="gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setShowDeleteDialog(false)}
                                disabled={isDeleting}
                            >
                                Annulla
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? "Eliminazione..." : "Elimina"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}