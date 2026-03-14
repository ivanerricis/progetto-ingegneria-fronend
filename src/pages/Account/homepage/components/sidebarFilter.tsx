import { Label } from "@/components/ui/label";
import CheckboxFilter from "./checkboxFilter";
import { PriceSlider } from "./priceSlider";
import { Separator } from "@/components/ui/separator";
import { BathSlider } from "./bathSlider";

const SidebarFilter = () => {
    return (
        <div className="h-full w-46 flex flex-col p-2 dark:text-foreground gap-4 bg-background">

            <div className="flex flex-col gap-1">
                <Label className="text-xl">Prezzo</Label>
                <PriceSlider />
            </div>

            <Separator className="mt-2" />

            <div className="flex flex-col gap-1">
                <Label className="text-xl">Bagni</Label>
                <BathSlider />
            </div>

            <Separator className="mt-2" />

            {/* Checkbox filters */}
            <div className="h-full flex flex-col gap-1">
                <Label className="text-xl">Servizi</Label>
                <CheckboxFilter label="Aria condizionata" />
                <CheckboxFilter label="Balcone" />
                <CheckboxFilter label="Portineria" />
                <CheckboxFilter label="Ascensore" />
                <CheckboxFilter label="Piano" />
                <CheckboxFilter label="Arredata" />
                <CheckboxFilter label="Garage" />
                <CheckboxFilter label="Giardino" />
                <CheckboxFilter label="Riscaldamenti" />
                <CheckboxFilter label="Posto auto" />
                <CheckboxFilter label="Pannelli solari" />
                <CheckboxFilter label="Terrazzo" />
            </div>
        </div>
    );
}

export default SidebarFilter;