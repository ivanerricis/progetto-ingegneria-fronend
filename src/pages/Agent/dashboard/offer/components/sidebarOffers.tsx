import type { Negotiation } from "@/types/types";
import { BadgeChat } from "@/pages/components/badgeChat";

type Props = Readonly<{
    negotiations?: Negotiation[];
    selectedNegotiation: Negotiation | null;
    onSelect: (negotiation: Negotiation) => void;
}>;

export default function SidebarOffers({
    negotiations,
    selectedNegotiation,
    onSelect,
}: Props) {
    return (
        <div
            className={`w-full min-w-0 md:w-1/4 h-full border-t divide-y overflow-x-hidden overflow-y-auto ${selectedNegotiation ? "hidden md:block" : "block"
                }`}
        >
            {negotiations && negotiations.length > 0 ? (
                negotiations.map((negotiation) => (
                    
                    <BadgeChat
                        key={`${negotiation.advertisement.id}-${negotiation.account.id}`}
                        onClick={() => onSelect(negotiation)}
                        addressFormatted={negotiation.advertisement.realEstate.addressFormatted}
                        name={negotiation.account.firstName + " " + negotiation.account.lastName}
                        email={negotiation.account.email}
                        selected={
                            selectedNegotiation?.advertisement.id === negotiation.advertisement.id
                            && selectedNegotiation?.account.id === negotiation.account.id
                        }
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