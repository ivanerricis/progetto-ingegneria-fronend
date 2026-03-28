import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Props = Readonly<{
    showDeleteDialog: boolean
    setShowDeleteDialog: (show: boolean) => void
    isDeleting: boolean
    handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>
}>

export const DialogDeleteAdvertisement = ({showDeleteDialog, setShowDeleteDialog, isDeleting, handleDelete }: Props) => {
    return (
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogContent showCloseButton={false} className="border border-destructive">
                <DialogHeader>
                    <DialogTitle className="text-destructive!">Elimina annuncio</DialogTitle>
                    <DialogDescription>
                        Sei sicuro di voler eliminare questo annuncio? Questa azione è irreversibile e tutti i dati verranno persi.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2">
                    <Button
                        variant="outline"
                        onClick={e => {
                            e.stopPropagation();
                            setShowDeleteDialog(false);
                        }}
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