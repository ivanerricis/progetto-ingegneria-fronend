import { useState } from "react";
import type { Negotiation } from "@/types/types";
import SidebarOffers from "./components/sidebarOffers";
import OfferChat from "./components/offerChat";
import useNegotiations from "@/hooks/useNegotiations";
import DashboardFilterSelect from "../advertisement/components/dashboardFilterSelect";
import { BadgeCheck, BadgeX, Clock } from "lucide-react";

type StatusFilter = "pending" | "accepted" | "rejected";

const statusOptions = [
    {
        value: "pending",
        label: "In attesa",
        icon: <Clock className="text-foreground size-5" />,
    },
    {
        value: "accepted",
        label: "Accettate",
        icon: <BadgeCheck className="text-foreground size-5" />,
    },
    {
        value: "rejected",
        label: "Rifiutate",
        icon: <BadgeX className="text-foreground size-5" />,
    },
] as const

export default function Offers() {
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("pending")
    const [selectedNegotiation, setSelectedNegotiation] = useState<Negotiation | null>(null);
    const { negotiations } = useNegotiations("AGENT");

    const filteredNegotiations = negotiations.filter((negotiation) => {
        return negotiation.lastOffer?.status === statusFilter;
    });

    const handleFilterChange = (value: StatusFilter) => {
        setStatusFilter(value);
        setSelectedNegotiation(null);
    }

    return (
        <div className="w-full h-full flex flex-col">
            <div className={`p-2 ${selectedNegotiation ? "hidden" : "block"} sm:block`}>
                <DashboardFilterSelect
                    value={statusFilter}
                    placeholder="Stato"
                    options={[...statusOptions]}
                    onValueChange={(value) => handleFilterChange(value as StatusFilter)}
                />
            </div>

            <div className="flex flex-row w-full h-full divide-x">
                <SidebarOffers
                    negotiations={filteredNegotiations}
                    selectedNegotiation={selectedNegotiation}
                    onSelect={setSelectedNegotiation}
                />

                <OfferChat
                    selectedNegotiation={selectedNegotiation}
                    onBack={() => setSelectedNegotiation(null)}
                />
            </div>
        </div>
    );
}