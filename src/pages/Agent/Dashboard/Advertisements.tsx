import { Button } from "@/components/ui/button";
import useAdvertisements from "@/hooks/agent/useAdvertisements";
import { API_BASE_URL } from "@/lib/api/config";
import AdvertisementsList from "@/pages/Agent/Dashboard/components/advertisementList";
import AdvertisementListSkeleton from "@/pages/Account/Homepage/components/advertisementListSkeleton";
import type { Advertisement } from "@/types/types";
import { BadgeCheck, Clock, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroupCard } from "./components/radioGroupCard";

type AdvertisementTabPanelProps = {
    advertisements: Advertisement[]
    isLoading: boolean
    error: string | null
}

function AdvertisementTabPanel({ advertisements, isLoading, error }: AdvertisementTabPanelProps) {
    return (
        <div className="flex flex-col gap-2">
            {isLoading && (
                <AdvertisementListSkeleton />
            )}

            {error && (
                <p className="text-sm text-destructive" role="alert">
                    {error}
                </p>
            )}

            {!isLoading && !error && advertisements.length === 0 && (
                <p className="text-sm text-muted-foreground">Nessun annuncio disponibile.</p>
            )}

            {!isLoading && !error && (
                <div className="pr-1">
                    <AdvertisementsList advertisements={advertisements} />
                </div>
            )}
        </div>
    )
}

export default function Advertisements() {
    const navigate = useNavigate()
    const { advertisements, isLoading, error } = useAdvertisements(API_BASE_URL)
    const [activeTab, setActiveTab] = useState<"onsale" | "rental">("onsale")
    const saleAdvertisements = advertisements.filter((advertisement) => advertisement.type === "sale")
    const rentalAdvertisements = advertisements.filter((advertisement) => advertisement.type === "rent")
    const activeAdvertisements = activeTab === "onsale" ? saleAdvertisements : rentalAdvertisements

    return (
        <div className="flex h-full min-h-0 w-full flex-col gap-2 overflow-hidden">
            <Button className="w-fit rounded-sm" onClick={() => navigate("/agent/dashboard/create-advertisement")}>
                <Plus />
                Aggiungi annuncio
            </Button>
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "onsale" | "rental")} className="w-full min-h-0 flex-1 overflow-hidden">
                <TabsList className="rounded-sm">
                    <TabsTrigger value="onsale" className="rounded-sm">
                        In corso
                        <Clock />
                    </TabsTrigger>
                    <TabsTrigger value="rental" className="rounded-sm">
                        Conclusi
                        <BadgeCheck />
                    </TabsTrigger>
                </TabsList>

                {!isLoading && !error && activeAdvertisements.length !== 0 && (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center text-start text-foreground">
                            Numero di annunci trovati: {activeAdvertisements.length}
                        </div>
                        <RadioGroupCard />
                    </div>
                )}

                <TabsContent value="onsale" className="w-full min-h-0 flex-1 overflow-y-auto border p-2 rounded-sm">
                    <AdvertisementTabPanel advertisements={saleAdvertisements} isLoading={isLoading} error={error} />
                </TabsContent>
                <TabsContent value="rental" className="w-full min-h-0 flex-1 overflow-y-auto border p-2 rounded-sm">
                    <AdvertisementTabPanel advertisements={rentalAdvertisements} isLoading={isLoading} error={error} />
                </TabsContent>
            </Tabs>
        </div>
    );
}