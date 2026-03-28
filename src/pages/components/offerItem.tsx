import type { Offer, Role } from "@/types/types";
import { formatPrice } from "@/utils/formatPrice";

type Props = {
    offer: Offer;
    role: Role;
}

export const OfferItem = ({ offer, role }: Props) => {
    const isMine = offer.madeBy === role;

    return (
        <div
            key={offer.id}
            className={`flex ${isMine ? "justify-end" : "justify-start"}`}
        >
            <div
                className={`max-w-[70%] p-2 rounded-sm border ${isMine ? "bg-primary text-background dark:text-foreground" : "bg-background text-foreground"
                    }`}
            >
                <div className="text-lg font-bold">Prezzo offerto: {formatPrice(offer.price)}</div>
                <div>
                    Stato:{" "}
                    {offer.status === "pending"
                        ? "In attesa"
                        : offer.status === "accepted"
                            ? "Accettata"
                            : "Rifiutata"}
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