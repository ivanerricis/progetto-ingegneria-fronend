import { Button } from "@/components/ui/button";
import { Check, Send, Trash } from "lucide-react";
import { useState } from "react";
import { DialogAcceptOffer } from "./dialogAcceptOffer";
import { DialogRejectOffer } from "./dialogRejectOffer";
import type { Advertisement, Offer } from "@/types/types";
import { DialogCounterOffer } from "@/pages/components/dialogCounterOffer";
import { Label } from "@/components/ui/label";

type Props = {
    sortedOffers: Offer[];
    advertisement: Advertisement;
}

export const FooterChat = ({ sortedOffers, advertisement }: Props) => {
    const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
    const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
    const [isCounterOfferDialogOpen, setIsCounterOfferDialogOpen] = useState(false);

    const lastOffer = sortedOffers.at(-1);
    const lastOfferStatus = lastOffer?.status;
    const lastOfferOwner = lastOffer?.madeBy;
    const lastOfferDisableActions = lastOfferStatus === "pending" && lastOfferOwner === "ACCOUNT";

    return (
        <>
            <div className="w-full bg-background flex gap-2 p-2 *:*:*:text-lg *:*:*:cursor-pointer">

                <Button
                    variant="destructive"
                    size="icon-lg"
                    className="flex-1"
                    onClick={() => setIsRejectDialogOpen(true)}
                    disabled={lastOfferDisableActions}
                >
                    <Trash className="size-5" />
                    <div className="flex gap-1">
                        <Label>Rifiuta</Label>
                        <Label className="hidden sm:block">offerta</Label>
                    </div>
                </Button>

                <Button
                    size="icon-lg"
                    className="flex-1"
                    onClick={() => setIsAcceptDialogOpen(true)}
                    disabled={lastOfferDisableActions}>
                    <Check className="size-5" />
                    <div className="flex gap-1">
                        <Label>Accetta</Label>
                        <Label className="hidden sm:block">offerta</Label>
                    </div>
                </Button>

                <Button
                    variant="outline"
                    size="icon-lg"
                    className="flex-1"
                    onClick={() => setIsCounterOfferDialogOpen(true)}
                    disabled={lastOfferDisableActions}
                >
                    <Send className="size-5" />
                    <div className="flex gap-1">
                        <Label>Invia</Label>
                        <Label className="hidden sm:block">contro-offerta</Label>
                    </div>
                </Button>
            </div>

            <DialogRejectOffer
                isRejectDialogOpen={isRejectDialogOpen}
                setIsRejectDialogOpen={setIsRejectDialogOpen}
                offerId={lastOffer?.id}
            />

            <DialogAcceptOffer
                isAcceptDialogOpen={isAcceptDialogOpen}
                setIsAcceptDialogOpen={setIsAcceptDialogOpen}
                offerId={lastOffer?.id}
            />

            <DialogCounterOffer
                isCounterOfferDialogOpen={isCounterOfferDialogOpen}
                setIsCounterOfferDialogOpen={setIsCounterOfferDialogOpen}
                advertisementId={advertisement.id}
            />
        </>
    );
};