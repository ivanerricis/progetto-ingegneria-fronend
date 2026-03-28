import { useState } from "react";
import type { Negotiation } from "@/types/types";
import useNegotiations from "@/hooks/useNegotiations";
import { ArrowLeft, BadgeCheck, BadgeX, Clock } from "lucide-react";
import DashboardFilterSelect from "@/pages/Agent/dashboard/advertisement/components/dashboardFilterSelect";
import SidebarOffers from "./components/sidebarOffers";
import OfferChat from "./components/offerChat";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";
import { AccountBadge } from "../homepage/components/accountBadge";
import { Footer } from "@/components/footer";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate()
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
                    <Button variant="outline" type="button" onClick={() => navigate("/homepage")}>
                        <ArrowLeft />
                        <Label className="hidden sm:inline text-md">Indietro</Label>
                    </Button>
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