import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CheckboxFilter from "@/pages/Account/homepage/components/checkboxFilter";
import type { FC } from "react";
import type { Services } from "@/types/types";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { SERVICE_LABELS } from "../constants/serviceLabels";

interface StepFeaturesProps {
    rooms: string;
    setRooms: (value: string) => void;
    floor: string;
    setFloor: (value: string) => void;
    surface: string;
    setSurface: (value: string) => void;
    bathrooms: string;
    setBathrooms: (value: string) => void;
    services: Services;
    onServiceChange: (service: keyof Services) => void;
    description: string;
    setDescription: (desc: string) => void;
    typeValue: "sale" | "rent";
    setTypeValue: (value: "sale" | "rent") => void;
    energyClass: "A" | "B" | "C" | "D" | "E" | "F" | "G";
    setEnergyClass: (value: "A" | "B" | "C" | "D" | "E" | "F" | "G") => void;
    housingType: "apartment" | "villa";
    setHousingType: (value: "apartment" | "villa") => void;
}

const StepFeatures: FC<StepFeaturesProps> = ({
    rooms, setRooms, floor, setFloor, surface, setSurface, bathrooms, setBathrooms,
    services, onServiceChange, description, setDescription, typeValue, setTypeValue,
    energyClass, setEnergyClass, housingType, setHousingType
}) => (
    <div className="flex flex-col gap-4">
        <Label className="text-2xl">Caratteristiche</Label>

        <div className="flex flex-col lg:flex-row gap-4">
            <div className="w-full lg:w-1/4 gap-3 grid grid-cols-2">
                <div>
                    <Label className="text-lg">Locali</Label>
                    <Input
                        type="number"
                        value={rooms}
                        placeholder="0"
                        onChange={e => setRooms(e.target.value || "")}
                    />
                </div>
                <div>
                    <Label className="text-lg">Piano</Label>
                    <Input
                        type="number"
                        value={floor}
                        placeholder="0"
                        onChange={e => setFloor(e.target.value || "")}
                    />
                </div>
                <div>
                    <Label className="text-lg">Superficie (m²)</Label>
                    <Input
                        type="number"
                        value={surface}
                        placeholder="0"
                        onChange={e => setSurface(e.target.value || "")}
                    />
                </div>
                <div>
                    <Label className="text-lg">Bagni</Label>
                    <Input
                        type="number"
                        value={bathrooms}
                        placeholder="0"
                        onChange={e => setBathrooms(e.target.value || "")}
                    />
                </div>
            </div>

            <Separator orientation="horizontal" className="sm:hidden" />
            <Separator orientation="vertical" className="hidden sm:block" />

            <div className="flex lg:w-1/3 flex-wrap gap-4 lg:mb-3">

                <div className="flex flex-col gap-1">
                    <Label className="text-lg">Tipo annuncio</Label>
                    <Select value={typeValue} onValueChange={setTypeValue}>
                        <SelectTrigger className="w-40 bg-background">
                            <SelectValue placeholder="Seleziona tipo" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            <SelectItem value="sale">Vendita</SelectItem>
                            <SelectItem value="rent">Affitto</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-1">
                    <Label className="text-lg">Classe energetica</Label>
                    <Select value={energyClass} onValueChange={setEnergyClass}>
                        <SelectTrigger className="w-40 bg-background">
                            <SelectValue placeholder="Seleziona classe" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            <SelectItem value="A">A</SelectItem>
                            <SelectItem value="B">B</SelectItem>
                            <SelectItem value="C">C</SelectItem>
                            <SelectItem value="D">D</SelectItem>
                            <SelectItem value="E">E</SelectItem>
                            <SelectItem value="F">F</SelectItem>
                            <SelectItem value="G">G</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-1">
                    <Label className="text-lg">Tipo immobile</Label>
                    <Select value={housingType} onValueChange={setHousingType}>
                        <SelectTrigger className="w-40 bg-background">
                            <SelectValue placeholder="Seleziona tipologia" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            <SelectItem value="apartment">Appartamento</SelectItem>
                            <SelectItem value="villa">Villa</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Separator orientation="horizontal" className="sm:hidden" />
            <Separator orientation="vertical" className="hidden sm:block" />

            <div className="flex flex-col w-full lg:w-2/3 gap-2">
                <Label className="text-xl">Servizi</Label>
                <div className="flex flex-wrap gap-2 h-full w-full">
                    {Object.keys(services).map((serviceKey) => (
                        <CheckboxFilter
                            key={serviceKey}
                            label={SERVICE_LABELS[serviceKey as keyof Services]}
                            checked={services[serviceKey as keyof Services]}
                            onCheckedChange={() => onServiceChange(serviceKey as keyof Services)}
                        />
                    ))}
                </div>
            </div>
        </div>

        <Separator orientation="horizontal" />

        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <Label className="text-2xl">Descrizione</Label>
                <span className="text-sm text-muted-foreground">{description.length}/2000</span>
            </div>
            <Textarea
                placeholder="Descrizione dell'immobile"
                className="h-40 min-h-40 max-h-40 w-full text-foreground border p-2 bg-background"
                value={description}
                onChange={e => setDescription(e.target.value)}
                maxLength={2000}
            />
        </div>
    </div>
);

export default StepFeatures;