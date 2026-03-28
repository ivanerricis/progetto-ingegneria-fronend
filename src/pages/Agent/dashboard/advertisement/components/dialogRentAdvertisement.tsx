import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Props = Readonly<{
    showRentDialog: boolean
    setShowRentDialog: (show: boolean) => void
    isRenting: boolean
    handleRent: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>
}>

export const DialogRentAdvertisement = ({ showRentDialog, setShowRentDialog, isRenting, handleRent }: Props) => {
    return (
        <Dialog open={showRentDialog} onOpenChange={setShowRentDialog}>
            <DialogContent showCloseButton={false} className="border border-primary">
                <DialogHeader>
                    <DialogTitle>Affitta annuncio</DialogTitle>
                    <DialogDescription>
                        Sei sicuro di voler affittare questo annuncio? Questa azione è irreversibile e tutti i dati verranno persi.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2">
                    <Button
                        variant="outline"
                        onClick={e => {
                            e.stopPropagation();
                            setShowRentDialog(false);
                        }}
                        disabled={isRenting}
                    >
                        Annulla
                    </Button>
                    <Button
                        onClick={handleRent}
                        disabled={isRenting}
                    >
                        {isRenting ? "Affitto..." : "Affitta"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}