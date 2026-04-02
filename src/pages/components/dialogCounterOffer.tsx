import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CounterOffer as CounterOfferAgent } from "@/lib/api/agent";
import { CounterOffer as CounterOfferAccount } from "@/lib/api/account";
import { formatPrice } from "@/utils/formatPrice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Props = {
    isCounterOfferDialogOpen: boolean;
    setIsCounterOfferDialogOpen: (open: boolean) => void;
    advertisementId: number;
    accountId?: number;
}
export const DialogCounterOffer = ({ isCounterOfferDialogOpen, setIsCounterOfferDialogOpen, advertisementId, accountId }: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [price, setPrice] = useState("");
    const navigate = useNavigate();

    const handleSendCounterOffer = async () => {
        setIsLoading(true);
        try {
            if (price !== "") {
                if (accountId)
                    await CounterOfferAgent(advertisementId, accountId, Number.parseInt(price));
                else
                    await CounterOfferAccount(advertisementId, Number.parseInt(price))
                toast.success("Contro-offerta inviata con successo");
                navigate(0);
            }
        } catch (error) {
            toast.error("Errore durante l'invio della contro-offerta: " + (error instanceof Error ? error.message : "Errore sconosciuto"));
        } finally {
            setIsLoading(false);
            setIsCounterOfferDialogOpen(false);
        }
    };

    const handleCloseDialog = () => {
        setIsCounterOfferDialogOpen(false);
        setPrice("");
    }

    return (
        <Dialog open={isCounterOfferDialogOpen} onOpenChange={setIsCounterOfferDialogOpen}>
            <DialogContent showCloseButton={false} className="border border-primary">
                <DialogHeader>
                    <DialogTitle>Invia contro proposta</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Sei sicuro di voler inviare una contro proposta? Questa azione è irreversibile.
                </DialogDescription>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="price" className="text-lg">
                        Prezzo
                    </Label>
                    <Input
                        id="price"
                        type="number"
                        value={price}
                        className="text-lg!"
                        placeholder="0"
                        onChange={(e) => setPrice(e.target.value || "")}
                    />
                    <Label className="text-lg">
                        Qeusta è la tua offerta: {price === formatPrice("0") ? "" : formatPrice(price)}
                    </Label>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={handleCloseDialog}
                    >
                        Annulla
                    </Button>
                    <Button onClick={handleSendCounterOffer} disabled={isLoading || price === ""}>
                        {isLoading ? "Invio..." : "Invia"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}