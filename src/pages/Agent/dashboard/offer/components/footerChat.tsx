import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Send, Trash } from "lucide-react";
import { useState } from "react";
import { DialogAcceptOffer } from "./dialogAcceptOffer";
import { DialogRejectOffer } from "./dialogRejectOffer";

type Props = {
    sortedOffers: any[];
}

export const FooterChat = ({ sortedOffers }: Props) => {
    const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState(false);
    const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

    return (
        <>
            <div className="w-full flex gap-1 p-2">
                <Button size="icon-lg" onClick={() => setIsAcceptDialogOpen(true)}>
                    <Check />
                </Button>

                <Button
                    variant="destructive"
                    size="icon-lg"
                    onClick={() => setIsRejectDialogOpen(true)}
                >
                    <Trash />
                </Button>

                <div className="flex gap-1 w-full">
                    <Input
                        type="number"
                        min={0}
                        className="h-full"
                        placeholder="Inserisci un prezzo..."
                    />
                    <Button variant="outline" size="icon-lg">
                        <Send />
                    </Button>
                </div>
            </div>

            {/* Dialog Accetta */}
            <DialogAcceptOffer
                isAcceptDialogOpen={isAcceptDialogOpen}
                setIsAcceptDialogOpen={setIsAcceptDialogOpen}
                offerId={sortedOffers[sortedOffers.length - 1]?.id}
            />

            {/* Dialog Rifiuta */}
            <DialogRejectOffer
                isRejectDialogOpen={isRejectDialogOpen}
                setIsRejectDialogOpen={setIsRejectDialogOpen}
                offerId={sortedOffers[sortedOffers.length - 1]?.id}
            />
        </>
    );
};