import { Button } from "@/components/ui/button";
import { Check, Send, Trash } from "lucide-react";
import { useState } from "react";
import { DialogAcceptOffer } from "./dialogAcceptOffer";
import { DialogRejectOffer } from "./dialogRejectOffer";
import type { Account, Advertisement, Offer } from "@/types/types";
import { DialogCounterOffer } from "./dialogCounterOffer";
import { Label } from "@/components/ui/label";

type Props = {
    sortedOffers: Offer[];
    advertisement: Advertisement;
    account: Account;
}

export const FooterChat = ({ sortedOffers, advertisement, account }: Props) => {
    const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
    const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
    const [isCounterOfferDialogOpen, setIsCounterOfferDialogOpen] = useState(false);

    const lastOfferStatus = sortedOffers[sortedOffers.length - 1]?.status;
    const lastOfferOwner = sortedOffers[sortedOffers.length - 1]?.madeBy;

    return (
        <>
            <div className="w-full bg-background flex gap-2 p-2 *:*:*:text-lg *:*:*:cursor-pointer">

                <Button
                    variant="destructive"
                    size="icon-lg"
                    className="flex-1"
                    onClick={() => setIsRejectDialogOpen(true)}
                    disabled={lastOfferStatus !== "pending" && lastOfferOwner !== "agent"}
                >
                    <Trash className="size-5"/>
                    <div className="flex gap-1">
                        <Label>Rifiuta</Label>
                        <Label className="hidden sm:block">offerta</Label>
                    </div>
                </Button>

                <Button
                    size="icon-lg"
                    className="flex-1"
                    onClick={() => setIsAcceptDialogOpen(true)}
                    disabled={lastOfferStatus !== "pending" && lastOfferOwner !== "agent"}>
                    <Check className="size-5"/>
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
                    disabled={lastOfferStatus !== "pending" && lastOfferOwner !== "agent"}
                >
                    <Send className="size-5"/>
                    <div className="flex gap-1">
                        <Label>Invia</Label>
                        <Label className="hidden sm:block">contro-offerta</Label>
                    </div>
                </Button>
            </div>

            <DialogRejectOffer
                isRejectDialogOpen={isRejectDialogOpen}
                setIsRejectDialogOpen={setIsRejectDialogOpen}
                offerId={sortedOffers[sortedOffers.length - 1]?.id}
            />

            <DialogAcceptOffer
                isAcceptDialogOpen={isAcceptDialogOpen}
                setIsAcceptDialogOpen={setIsAcceptDialogOpen}
                offerId={sortedOffers[sortedOffers.length - 1]?.id}
            />

            <DialogCounterOffer
                isCounterOfferDialogOpen={isCounterOfferDialogOpen}
                setIsCounterOfferDialogOpen={setIsCounterOfferDialogOpen}
                advertisementId={advertisement.id}
                accountId={account.id}
            />
        </>
    );
};