import type { Offer } from "@/types/types";
import { useEffect, useRef } from "react";
import { HeaderOffer } from "./headerOffer";
import { OfferItem } from "./offerItem";
import { FooterChat } from "./footerChat";
import useOffers from "@/hooks/agent/useOffers";
import { Spinner } from "@/components/ui/spinner";

type Props = {
    selectedOffer: Offer | null;
    onBack: () => void;
};

export default function OfferChat({ selectedOffer, onBack }: Props) {
    const { offers, isLoading, error } = useOffers(
        selectedOffer?.advertisement.id,
        selectedOffer?.account.id
    );
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [offers]);

    const sortedOffers = [...offers].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    return (
        <div
            className={`w-full md:w-3/4 border border-l-0 h-full ${!selectedOffer ? "hidden md:flex" : "flex"
                } flex-col`}
        >
            {!selectedOffer ? (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                    Seleziona una trattativa
                </div>
            ) : (
                <>
                    <HeaderOffer selectedOffer={selectedOffer} onBack={onBack} />

                    <div className="flex-1 overflow-y-auto p-2 space-y-2">
                        {isLoading && <div className="w-full h-full flex items-center justify-center">
                            <Spinner className="size-7 text-foreground"/>
                        </div>
                        }
                        {error && <div>{error}</div>}

                        {sortedOffers.map((offer) => {
                            return <OfferItem offer={offer} key={offer.id} />;
                        })}

                        <div ref={bottomRef} />
                    </div>

                    <FooterChat sortedOffers={sortedOffers} />
                </>
            )}
        </div>
    );
}