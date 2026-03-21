import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CheckboxFilter from "@/pages/Account/homepage/components/checkboxFilter";
import type { FC } from "react";
import type { Services } from "@/types/types";

interface StepFeaturesProps {
    rooms: number;
    setRooms: (value: number) => void;
    bedrooms: number;
    setBedrooms: (value: number) => void;
    surface: number;
    setSurface: (value: number) => void;
    bathrooms: number;
    setBathrooms: (value: number) => void;
    services: Services;
    onServiceChange: (service: keyof Services) => void;
    description: string;
    setDescription: (desc: string) => void;
}

const StepFeatures: FC<StepFeaturesProps> = ({
    rooms, setRooms, bedrooms, setBedrooms, surface, setSurface, bathrooms, setBathrooms,
    services, onServiceChange, description, setDescription
}) => (
    <div className="flex flex-col gap-4">
        <Label className="text-2xl">Caratteristiche</Label>
        <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-1/2 gap-3 grid grid-cols-2">
                <div>
                    <Label className="text-lg">Numero di locali</Label>
                    <Input type="number" value={rooms} onChange={e => setRooms(parseInt(e.target.value) || 0)} />
                </div>
                <div>
                    <Label className="text-lg">Numero di stanze</Label>
                    <Input type="number" value={bedrooms} onChange={e => setBedrooms(parseInt(e.target.value) || 0)} />
                </div>
                <div>
                    <Label className="text-lg">Superficie (m²)</Label>
                    <Input type="number" value={surface} onChange={e => setSurface(parseInt(e.target.value) || 0)} />
                </div>
                <div>
                    <Label className="text-lg">Numero di bagni</Label>
                    <Input type="number" value={bathrooms} onChange={e => setBathrooms(parseInt(e.target.value) || 0)} />
                </div>
            </div>
            <div className="flex flex-col w-full sm:w-1/2 gap-2">
                <Label className="text-xl">Servizi</Label>
                <div className="flex flex-wrap gap-2 h-full w-full">
                    {Object.keys(services).map((serviceKey) => (
                        <CheckboxFilter
                            key={serviceKey}
                            label={serviceKey}
                            checked={services[serviceKey as keyof Services]}
                            onCheckedChange={() => onServiceChange(serviceKey as keyof Services)}
                        />
                    ))}
                </div>
            </div>
        </div>

        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <Label className="text-2xl">Descrizione</Label>
                <span className="text-sm text-muted-foreground">{description.length}/2000</span>
            </div>
            <textarea
                placeholder="Descrizione dell'immobile"
                className="h-40 w-full text-foreground border rounded-sm p-2"
                value={description}
                onChange={e => setDescription(e.target.value)}
                maxLength={2000}
            />
        </div>
    </div>
);

export default StepFeatures;