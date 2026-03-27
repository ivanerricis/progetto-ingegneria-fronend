import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import type { Advertisement } from "@/types/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPrice } from "@/utils/formatPrice";
import { CreateOffer } from "@/lib/api/account";

type DialogProps = {
    showOfferDialog: boolean;
    setShowOfferDialog: (value: boolean) => void;
    advertisement: Advertisement;
};

export const DialogCreateOffer = ({ showOfferDialog, setShowOfferDialog, advertisement }: DialogProps) => {
    const [price, setPrice] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowOfferDialog(false);
        setPrice("");
    };

    const handleCreateOffer = async () => {
        setIsLoading(true)
        if (!price || Number.isNaN(Number(price))) return;
        try {
            CreateOffer(advertisement.id, Number(price))
            setShowOfferDialog(false);
            setPrice("");
            toast.success("Offerta inviata con successo!");
        } catch (submitError) {
            console.log(submitError)
            const message =
                submitError instanceof Error
                    ? submitError.message
                    : "Errore durante la creazione dell'offerta"
            toast.error("Creazione fallita: " + message)
        }
        finally {
            setIsLoading(false)
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
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                        disabled={isLoading}
                    />
                    <div className="flex gap-2 items-center">
                        <Label className="text-lg">Questa è la tua offerta:</Label>
                        {price && <Label className="text-lg">{formatPrice(Number(price))}</Label>}
                    </div>
                </div>
                <DialogFooter>
                    <Button variant={"outline"} onClick={handleClose} disabled={isLoading}>Annulla</Button>
                    <Button disabled={!price || Number.isNaN(Number(price)) || isLoading} onClick={handleCreateOffer}>
                        {isLoading ? "Invio offerta..." : "Offri"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}