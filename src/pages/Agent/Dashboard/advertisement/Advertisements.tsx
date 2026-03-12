import { Button } from "@/components/ui/button";
import useAdvertisements from "@/hooks/agent/useAdvertisements";
import DashboardFilterSelect from "@/pages/Agent/Dashboard/advertisement/components/dashboardFilterSelect";
import { BadgeCheck, CalendarClock, Clock, Plus, Tag } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdvertisementsPanel from "@/pages/Agent/Dashboard/advertisement/components/advertisementsPanel";
import { Label } from "@/components/ui/label";

type StatusFilter = "inProgress" | "completed"
type TypeFilter = "rent" | "sale"

const statusOptions = [
    {
        value: "inProgress",
        label: "In corso",
        icon: <Clock className="text-foreground size-5" />,
    },
    {
        value: "completed",
        label: "Conclusi",
        icon: <BadgeCheck className="text-foreground size-5" />,
    },
] as const

const typeOptions = [
    {
        value: "rent",
        label: "In affitto",
        icon: <CalendarClock className="text-foreground size-5" />,
    },
    {
        value: "sale",
        label: "In vendita",
        icon: <Tag className="text-foreground size-5" />,
    },
] as const

export default function Advertisements() {
    const navigate = useNavigate()
    const { advertisements, isLoading, error } = useAdvertisements()

    const [statusFilter, setStatusFilter] = useState<StatusFilter>("inProgress")
    const [typeFilter, setTypeFilter] = useState<TypeFilter>("sale")

    const filteredAdvertisements = advertisements.filter((advertisement) => {
        const matchesStatus =
            statusFilter === "inProgress"
                ? advertisement.status === "active"
                : advertisement.status === "sold" || advertisement.status === "rented"

        const matchesType = advertisement.type === typeFilter

        return matchesStatus && matchesType
    })

    return (
        <div className="flex h-full min-h-0 w-full flex-col gap-2 overflow-hidden">
            <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                            <DashboardFilterSelect
                                value={statusFilter}
                                placeholder="Stato"
                                options={[...statusOptions]}
                                onValueChange={(value) => setStatusFilter(value as StatusFilter)}
                            />

                            <DashboardFilterSelect
                                value={typeFilter}
                                placeholder="Tipologia"
                                options={[...typeOptions]}
                                onValueChange={(value) => setTypeFilter(value as TypeFilter)}
                            />
                        </div>
                        <Button className="w-fit rounded-sm" onClick={() => navigate("/agent/dashboard/create-advertisement")}>
                            <Plus className="size-5"/>
                            <Label className="hidden sm:block text-md">Aggiungi annuncio</Label>
                        </Button>
                    </div>

                    {!isLoading && !error && (
                        <div className="flex items-center text-start text-foreground">
                            Numero di annunci trovati: {filteredAdvertisements.length}
                        </div>
                    )}
                </div>

                <div className="w-full min-h-0 flex-1 overflow-y-auto pr-1">
                    <AdvertisementsPanel
                        advertisements={filteredAdvertisements}
                        isLoading={isLoading}
                        error={error}
                    />
                </div>
            </div>
        </div>
    );
}