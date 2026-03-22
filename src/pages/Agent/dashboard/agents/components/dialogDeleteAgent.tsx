import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";

type DialogDeleteProps = {
    showDeleteDialog: boolean
    setShowDeleteDialog: (show: boolean) => void
    onConfirm: () => Promise<void>
}

export const DialogDeleteAgent = ({ showDeleteDialog, setShowDeleteDialog, onConfirm }: DialogDeleteProps) => {
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            await onConfirm();
        } catch (error) {
            console.error("Errore durante l'eliminazione dell'agente:", error)
        } finally {
            setIsDeleting(false)
            setShowDeleteDialog(false)
        }
    }

    return (
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogContent showCloseButton={false} className="border border-destructive">
                <DialogHeader>
                    <DialogTitle className="text-destructive!">Elimina agente</DialogTitle>
                    <DialogDescription>
                        Sei sicuro di voler eliminare questo agente? Questa azione è irreversibile e tutti i dati verranno persi.
                    </DialogDescription>
                </DialogHeader>
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
    );
}