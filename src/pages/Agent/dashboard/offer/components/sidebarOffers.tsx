import { BadgeChat } from "./badgeChat";
import type { Offer } from "@/types/types";

type Props = {
    negotiations?: Offer[];
    selectedOffer: Offer | null;
    onSelect: (offer: Offer) => void;
};

export default function SidebarOffers({
    negotiations,
    selectedOffer,
    onSelect,
}: Props) {
    return (
        <div
            className={`w-full md:w-1/4 h-full divide-y overflow-y-auto ${selectedOffer ? "hidden md:block" : "block"
                }`}
        >
            {negotiations && negotiations.length > 0 ? (
                negotiations.map((negotiation) => (

                    <BadgeChat
                        key={`${negotiation.advertisement.id}-${negotiation.account.id}`}
                        onClick={() => onSelect(negotiation)}
                        addressFormatted={
                            negotiation.advertisement.realEstate.addressFormatted
                        }
                        accountName={
                            negotiation.account.firstName +
                            " " +
                            negotiation.account.lastName
                        }
                        accountEmail={negotiation.account.email}
                    />
                ))
            ) : (
                <div className="p-4 text-center text-muted-foreground">
                    Nessuna offerta trovata
                </div>
            )}
        </div>
    );
}