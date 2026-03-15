import { Label } from "@/components/ui/label";
import CheckboxFilter from "./checkboxFilter";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/utils/formatPrice";
import { RangeSliderFilter } from "./rangeSliderFilter";
import { Button } from "@/components/ui/button";

const SidebarFilter = () => {
    return (
        <div className="flex h-full w-70 flex-col gap-4 bg-background p-2 dark:text-foreground">

            <div className="min-h-0 flex flex-1 flex-col gap-4 overflow-y-auto">
                <div className="flex flex-col gap-1">
                    <Label className="text-xl">Prezzo</Label>
                    <RangeSliderFilter
                        id="price-slider"
                        min={0}
                        max={1000000}
                        step={10000}
                        formatValue={formatPrice}
                    />
                </div>

                <Separator className="mt-2" />

                <div className="flex flex-col gap-1">
                    <Label className="text-xl">Bagni</Label>
                    <RangeSliderFilter
                        id="bath-slider"
                        min={0}
                        max={10}
                        step={1}
                    />
                </div>

                <Separator className="mt-2" />

                <div className="flex flex-col gap-1">
                    <Label className="text-xl">Superficie</Label>
                    <RangeSliderFilter
                        id="size-slider"
                        min={0}
                        max={500}
                        step={10}
                    />
                </div>

                <Separator className="mt-2" />

                <div className="flex flex-col gap-1">
                    <Label className="text-xl">Piano</Label>
                    <RangeSliderFilter
                        id="floor-slider"
                        min={0}
                        max={50}
                        step={1}
                    />
                </div>

                <Separator className="mt-2" />

                {/* Checkbox filters */}
                <div className="h-full w-full flex flex-col gap-1">
                    <Label className="text-xl">Servizi</Label>
                    <div className="flex flex-wrap gap-2 w-full">
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
                        <CheckboxFilter label="Aria condizionata" />
                    </div>
                </div>
            </div>

            <Button>Applica</Button>
        </div>
    );
}

export default SidebarFilter;