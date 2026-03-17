import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import useCreateOffer from "@/hooks/account/useCreateOffer";
import { toast } from "sonner";
import type { Advertisement } from "@/types/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPrice } from "@/utils/formatPrice";

type Props = {
    showOfferDialog: boolean;
    setShowOfferDialog: (value: boolean) => void;
    advertisement: Advertisement;
};

export const DialogCreateOffer = ({ showOfferDialog, setShowOfferDialog, advertisement }: Props) => {
    const [offerAmount, setOfferAmount] = useState("");
    const { createOffer, isLoading, error } = useCreateOffer();

    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowOfferDialog(false);
        setOfferAmount("");
    };

    const handleCreateOffer = async () => {
        if (!offerAmount || isNaN(Number(offerAmount))) return;
        try {
            await createOffer(
                Number(advertisement.id),
                Number(offerAmount)
            );
            setShowOfferDialog(false);
            setOfferAmount("");
            toast.success("Offerta inviata con successo!");
        } catch (err: any) {
            toast.error(error || "Errore nell'invio dell'offerta");
        }
    };

    return (
        <Dialog open={showOfferDialog} onOpenChange={setShowOfferDialog}>
            <DialogContent
                showCloseButton={false}
                onClick={(e) => e.stopPropagation()}
                className="flex flex-col gap-6 sm:max-w-md"
            >
                <DialogTitle>Fai un'offerta</DialogTitle>
                <DialogDescription className="hidden" />
                <div className="flex flex-col gap-2">
                    <Input
                        className="text-lg!"
                        placeholder="Inserisci la tua offerta"
                        type="number"
                        min={0}
                        value={offerAmount}
                        onChange={e => setOfferAmount(e.target.value)}
                        disabled={isLoading}
                    />
                    <div className="flex gap-2 items-center">
                        <Label className="text-lg">Questa è la tua offerta:</Label>
                        {offerAmount && <Label className="text-lg">{formatPrice(Number(offerAmount))}</Label>}
                    </div>
                </div>
                <DialogFooter>
                    <Button variant={"outline"} onClick={handleClose} disabled={isLoading}>Annulla</Button>
                    <Button disabled={!offerAmount || isNaN(Number(offerAmount)) || isLoading} onClick={handleCreateOffer}>
                        {isLoading ? "Invio offerta..." : "Offri"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}