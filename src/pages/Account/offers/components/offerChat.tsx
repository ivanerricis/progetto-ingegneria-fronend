import type { Negotiation } from "@/types/types";
import { useEffect, useRef } from "react";
import { HeaderOffer } from "@/pages/components/headerOffer";
import { FooterChat } from "./footerChat";
import { Spinner } from "@/components/ui/spinner";
import { OfferItem } from "./offerItem";
import useOffers from "@/hooks/account/useOffers";

type Props = {
    selectedNegotiation: Negotiation | null;
    onBack: () => void;
};

export default function OfferChat({ selectedNegotiation, onBack }: Props) {
    const { offers, isLoading, error } = useOffers(
        selectedNegotiation?.advertisement.id,
        selectedNegotiation?.agent.id
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
            className={`w-full md:w-3/4 border border-l-0 h-full ${!selectedNegotiation ? "hidden md:flex" : "flex"
                } flex-col`}
        >
            {!selectedNegotiation ? (
                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                    Seleziona una trattativa
                </div>
            ) : (
                <>
                    <HeaderOffer
                        selectedNegotiation={selectedNegotiation}
                        onBack={onBack}
                        type="agent"
                    />

                    <div className="flex-1 overflow-y-auto p-2 space-y-2">
                        {isLoading && <div className="w-full h-full flex items-center justify-center">
                            <Spinner className="size-7 text-foreground" />
                        </div>
                        }
                        {error && <div>{error}</div>}

                        {sortedOffers.map((offer) => {
                            return <OfferItem offer={offer} key={offer.id} />;
                        })}

                        <div ref={bottomRef} />
                    </div>

                    {selectedNegotiation.lastOffer.status === "pending" &&
                        <FooterChat
                            sortedOffers={sortedOffers}
                            advertisement={selectedNegotiation.advertisement}
                        />
                    }
                </>
            )}
        </div>
    );
}