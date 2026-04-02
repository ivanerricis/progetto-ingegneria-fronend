import { useState } from "react";
import type { Negotiation } from "@/types/types";
import useNegotiations from "@/hooks/useNegotiations";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import DashboardFilterSelect from "@/pages/Agent/dashboard/advertisement/components/dashboardFilterSelect";
import SidebarOffers from "./components/sidebarOffers";
import OfferChat from "./components/offerChat";
import Header from "@/components/header";
import { ModeToggle } from "@/components/mode-toggle";
import { AccountBadge } from "../homepage/components/accountBadge";
import { Footer } from "@/components/footer";
import ButtonBack from "@/components/buttonBack";

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
        icon: <CheckCircle2 className="text-foreground size-5" />,
    },
    {
        value: "rejected",
        label: "Rifiutate",
        icon: <XCircle className="text-foreground size-5" />,
    },
] as const

export default function Offers() {
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("pending")
    const [selectedNegotiation, setSelectedNegotiation] = useState<Negotiation | null>(null);
    const { negotiations } = useNegotiations("ACCOUNT");

    const filteredNegotiations = negotiations.filter((negotiation) => {
        return negotiation.lastOffer?.status === statusFilter;
    });

    const handleFilterChange = (value: StatusFilter) => {
        setStatusFilter(value);
        setSelectedNegotiation(null);
    }

    return (
        <div className="w-full h-screen flex flex-col">
            <Header
                isHomepage
                left={
                    <ButtonBack to="/homepage" />
                }
                right={
                    <>
                        <ModeToggle />
                        <AccountBadge />
                    </>
                }
            />

            <div className="w-full h-full flex flex-col flex-1">
                <div className={`p-2 ${selectedNegotiation ? "hidden" : "block"} sm:block`}>
                    <DashboardFilterSelect
                        value={statusFilter}
                        placeholder="Stato"
                        options={[...statusOptions]}
                        onValueChange={(value) => handleFilterChange(value as StatusFilter)}
                    />
                </div>

                <div className="flex flex-row w-full h-full flex-1 divide-x">
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

            <Footer isHomepage />
        </div>
    );
}