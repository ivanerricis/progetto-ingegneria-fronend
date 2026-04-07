import type { Offer, Role } from "@/types/types";
import { formatPrice } from "@/utils/formatPrice";

type Props = {
    offer: Offer;
    role: Role;
}

export const OfferItem = ({ offer, role }: Props) => {
    const isMine = offer.madeBy === role;

    const getOfferStatus = () => {
        if (offer.status === "pending") return "In attesa";
        if (offer.status === "accepted") return "Accettata";
        if (offer.status === "rejected") return "Rifiutata";
        return "Sconosciuto";
    }

    return (
        <div
            key={offer.id}
            className={`flex ${isMine ? "justify-end" : "justify-start"}`}
        >
            <div
                className={`max-w-[70%] py-3 px-4 rounded-xl border ${isMine ?
                    "bg-primary text-background dark:text-foreground rounded-br-xs"
                    : "bg-background text-foreground rounded-bl-xs"
                    }`}
            >
                <div className="text-lg font-bold">Prezzo offerto: {formatPrice(offer.price)}</div>
                <div>
                    Stato:{" "}
                    {getOfferStatus()}
                </div>
                <div
                    className={`text-sm ${isMine ? "text-background dark:text-foreground" : "text-muted-foreground"
                        } mt-1`}
                >
                    {new Date(offer.createdAt).toLocaleString()}
                </div>
            </div>
        </div>
    );
};