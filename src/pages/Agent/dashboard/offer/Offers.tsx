import { useState } from "react";
import type { Offer } from "@/types/types";
import SidebarOffers from "./components/sidebarOffers";
import OfferChat from "./components/offerChat";
import useNegotiations from "@/hooks/agent/useNegotiations";
import DashboardFilterSelect from "../advertisement/components/dashboardFilterSelect";
import { BadgeCheck, Clock } from "lucide-react";

type StatusFilter = "inProgress" | "accepted"

const statusOptions = [
    {
        value: "inProgress",
        label: "In corso",
        icon: <Clock className="text-foreground size-5" />,
    },
    {
        value: "accepted",
        label: "Accettate",
        icon: <BadgeCheck className="text-foreground size-5" />,
    },
] as const

export default function Offers() {
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("inProgress")
    const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
    const { negotiations } = useNegotiations();

    return (
        <div className="w-full h-full flex flex-col">
            <div className={`p-2 ${selectedOffer ? "hidden" : "block"} sm:block`}>
                <DashboardFilterSelect
                    value={statusFilter}
                    placeholder="Stato"
                    options={[...statusOptions]}
                    onValueChange={(value) => setStatusFilter(value as StatusFilter)}
                />
            </div>

            <div className="flex flex-row w-full h-full divide-x">
                <SidebarOffers
                    negotiations={negotiations}
                    selectedOffer={selectedOffer}
                    onSelect={setSelectedOffer}
                />

                <OfferChat
                    selectedOffer={selectedOffer}
                    onBack={() => setSelectedOffer(null)}
                />
            </div>
        </div>
    );
}