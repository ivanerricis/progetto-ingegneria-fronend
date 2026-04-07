import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import useOffers from "@/hooks/useOffers";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Props = {
    isRejectDialogOpen: boolean;
    setIsRejectDialogOpen: (open: boolean) => void;
    offerId: number | undefined;
}
export const DialogRejectOffer = ({ isRejectDialogOpen, setIsRejectDialogOpen, offerId }: Props) => {
    const { rejectOffer, isLoading } = useOffers("AGENT");
    const navigate = useNavigate();

    const handleReject = async () => {
        try {
            if (!offerId) {
                toast.error("Nessuna offerta selezionata");
                return;
            }
            await rejectOffer(offerId);
            setIsRejectDialogOpen(false);
            toast.success("Offerta rifiutata con successo");
            navigate(0);
        } catch (error) {
            console.error("Errore durante il rifiuto dell'offerta:", error);
            toast.error("Errore durante il rifiuto dell'offerta: " + (error instanceof Error ? error.message : "Errore sconosciuto"));
        }
    }

    return (
        <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
            <DialogContent showCloseButton={false} className="border border-destructive">
                <DialogHeader>
                    <DialogTitle>Rifiuta offerta</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Sei sicuro di voler rifiutare questa offerta? Questa azione è irreversibile.
                </DialogDescription>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setIsRejectDialogOpen(false)}
                    >
                        Annulla
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleReject}
                    >
                        {isLoading ? "Rifiuto..." : "Rifiuta"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}