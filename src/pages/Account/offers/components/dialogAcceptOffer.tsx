import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import useOffers from "@/hooks/account/useOffers";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Props = {
    isAcceptDialogOpen: boolean;
    setIsAcceptDialogOpen: (open: boolean) => void;
    offerId: number | undefined;
}

export const DialogAcceptOffer = ({ isAcceptDialogOpen, setIsAcceptDialogOpen, offerId }: Props) => {
    const { acceptOffer, isLoading } = useOffers();
    const navigate = useNavigate();

    const handleAccept = async () => {
        try {
            if (!offerId) {
                toast.error("Nessuna offerta selezionata");
                return;
            }
            await acceptOffer(offerId);
            toast.success("Offerta accettata con successo");
            navigate(0);
        } catch (error) {
            console.error("Errore durante l'accettazione dell'offerta:", error);
            toast.error("Errore durante l'accettazione dell'offerta: " + (error instanceof Error ? error.message : "Errore sconosciuto"));
        } finally {
            setIsAcceptDialogOpen(false);
        }
    };

    return (
        <Dialog open={isAcceptDialogOpen} onOpenChange={setIsAcceptDialogOpen}>
            <DialogContent showCloseButton={false} className="border border-primary">
                <DialogHeader>
                    <DialogTitle>Accetta offerta</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Sei sicuro di voler accettare questa offerta? Questa azione è irreversibile.
                </DialogDescription>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setIsAcceptDialogOpen(false)}
                    >
                        Annulla
                    </Button>
                    <Button onClick={handleAccept}>
                        {isLoading ? "Accettazione..." : "Accetta"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}