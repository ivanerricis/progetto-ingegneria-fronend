import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useHomepageSearch } from "@/hooks/account/useHomepageSearch";
import { X } from "lucide-react";

const HOUSING_TYPES = ["apartment", "villa"];
const HOUSING_TYPE_LABELS: Record<string, string> = {
    apartment: "Appartamento",
    villa: "Villa",
};
const ROOMS_OPTIONS = ["1", "2", "3", "4", "5+"];
const BATHROOMS_OPTIONS = ["1", "2", "3", "4+"];

// Aggiungi/rimuovi qui in base ai campi reali di realEstate nel backend
const REAL_ESTATE_FEATURES: { key: string; label: string }[] = [
    { key: "airConditioning", label: "Aria condizionata" },
    { key: "balcony", label: "Balcone" },
    { key: "concierge", label: "Concierge" },
    { key: "elevator", label: "Ascensore" },
    { key: "furnished", label: "Arredato" },
    { key: "garage", label: "Garage" },
    { key: "garden", label: "Giardino" },
    { key: "heating", label: "Riscaldamento" },
    { key: "parking", label: "Posto auto" },
    { key: "solarPanels", label: "Pannelli solari" },
    { key: "terrace", label: "Terrazzo" },
];

const SidebarFilter = () => {
    const {
        searchParams,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        rooms,
        bathrooms,
        setFilter,
        clearFilters,
    } = useHomepageSearch();

    const isFeatureActive = (key: string) => searchParams.get(key) === "true";

    return (
        <aside className="flex h-full w-72 flex-col gap-4 overflow-y-auto border-r p-4">
            <div className="flex items-center justify-between">
                <Label className="text-xl font-bold">Filtri</Label>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="gap-1 rounded-sm"
                >
                    <X className="h-3 w-3" />
                    Cancella filtri
                </Button>
            </div>

            <div className="flex flex-col gap-2">
                <Label className="text-lg">
                    Prezzo (€)
                </Label>
                <div className="flex gap-2">
                    <div className="flex flex-1 flex-col gap-1">
                        <Label htmlFor="minPrice" className="text-muted-foreground">Min</Label>
                        <Input
                            id="minPrice"
                            type="number"
                            min={0}
                            placeholder="0"
                            value={minPrice}
                            onChange={(e) => setFilter("minPrice", e.target.value || null)}
                        />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                        <Label htmlFor="maxPrice" className="text-muted-foreground">Max</Label>
                        <Input
                            id="maxPrice"
                            type="number"
                            min={0}
                            placeholder="∞"
                            value={maxPrice}
                            onChange={(e) => setFilter("maxPrice", e.target.value || null)}
                        />
                    </div>
                </div>
            </div>

            <Separator orientation="horizontal" className="shrink-0" />

            <div className="flex flex-col gap-2">
                <Label className="text-lg">
                    Superficie (m²)
                </Label>
                <div className="flex gap-2">
                    <div className="flex flex-1 flex-col gap-1">
                        <Label htmlFor="minSize" className="text-muted-foreground">Min</Label>
                        <Input
                            id="minSize"
                            type="number"
                            min={0}
                            placeholder="0"
                            value={minSize}
                            onChange={(e) => setFilter("minSize", e.target.value || null)}
                        />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                        <Label htmlFor="maxSize" className="text-muted-foreground">Max</Label>
                        <Input
                            id="maxSize"
                            type="number"
                            min={0}
                            placeholder="∞"
                            value={maxSize}
                            onChange={(e) => setFilter("maxSize", e.target.value || null)}
                        />
                    </div>
                </div>
            </div>

            <Separator orientation="horizontal" className="shrink-0" />

            <div className="flex flex-col gap-2">
                <Label className="text-lg">
                    Numero locali
                </Label>
                <div className="flex flex-wrap gap-2">
                    {ROOMS_OPTIONS.map((r) => (
                        <Button
                            key={r}
                            type="button"
                            variant={rooms === r ? "default" : "outline"}
                            size="sm"
                            className="w-10 rounded-sm"
                            onClick={() => setFilter("rooms", rooms === r ? null : r)}
                        >
                            {r}
                        </Button>
                    ))}
                </div>
            </div>

            <Separator orientation="horizontal" className="shrink-0" />

            <div className="flex flex-col gap-2">
                <Label className="text-lg">
                    Numero bagni
                </Label>
                <div className="flex flex-wrap gap-2">
                    {BATHROOMS_OPTIONS.map((b) => (
                        <Button
                            key={b}
                            type="button"
                            variant={bathrooms === b ? "default" : "outline"}
                            size="sm"
                            className="w-10 rounded-sm"
                            onClick={() => setFilter("bathrooms", bathrooms === b ? null : b)}
                        >
                            {b}
                        </Button>
                    ))}
                </div>
            </div>

            <Separator orientation="horizontal" className="shrink-0" />

            <div className="flex flex-col gap-2">
                <Label className="text-lg">
                    Tipo immobile
                </Label>
                <div className="flex flex-wrap gap-2">
                    {HOUSING_TYPES.map((type) => {
                        const selected = searchParams.get("housingType") === type;
                        return (
                            <Button
                                key={type}
                                type="button"
                                variant={selected ? "default" : "outline"}
                                size="sm"
                                className="rounded-sm"
                                onClick={() =>
                                    setFilter("housingType", selected ? null : type)
                                }
                            >
                                {HOUSING_TYPE_LABELS[type] || type}
                            </Button>
                        );
                    })}
                </div>
            </div>

            <Separator orientation="horizontal" className="shrink-0" />

            <div className="flex flex-col gap-2">
                <Label className="text-lg">
                    Caratteristiche
                </Label>
                <div className="flex flex-wrap gap-2">
                    {REAL_ESTATE_FEATURES.map((feature) => {
                        const active = isFeatureActive(feature.key);
                        return (
                            <Button
                                key={feature.key}
                                type="button"
                                variant={active ? "default" : "outline"}
                                size="sm"
                                className="rounded-full border-2"
                                onClick={() => setFilter(feature.key, active ? null : "true")}
                            >
                                {feature.label}
                            </Button>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
};

export default SidebarFilter;