import type { FC } from "react";
import { Label } from "@/components/ui/label";
import type { Services } from "@/types/types";

interface StepSummaryProps {
    files: File[];
    rooms: number;
    floor: number;
    surface: number;
    bathrooms: number;
    services: Services;
    description: string;
    address: string;
    formattedPrice: string;
    priceInput: string;
    formatPrice: (price: string) => string;
}

const StepSummary: FC<StepSummaryProps> = ({
    files, rooms, floor, surface, bathrooms, services,
    description, address, formattedPrice, priceInput, formatPrice
}) => (
    <div className="flex flex-col gap-4 text-sm *:flex *:gap-2 *:*:text-lg">
        <div className="flex gap-4">
            <div className="flex flex-col flex-1 gap-2 *:flex *:gap-2 *:*:text-lg">
                <div>
                    <Label className="font-bold">Foto caricate: </Label>
                    <Label>{files.length}</Label>
                </div>

                <div>
                    <Label className="font-bold">Locali: </Label>
                    <Label>{rooms}</Label>
                </div>

                <div>
                    <Label className="font-bold">Piano: </Label>
                    <Label>{floor}</Label>
                </div>
            </div>
            <div className="flex flex-col flex-1 gap-2  *:flex *:gap-2 *:*:text-lg">
                <div>
                    <Label className="font-bold">Superficie: </Label>
                    <Label>{surface} m²</Label>
                </div>

                <div>
                    <Label className="font-bold">Bagni: </Label>
                    <Label>{bathrooms}</Label>
                </div>
            </div>
        </div>

        <div className="flex flex-col">
            <Label className="font-bold">Servizi: </Label>
            <Label>
                {Object.entries(services)
                    .filter(([, value]) => value)
                    .map(([key]) => key)
                    .join(", ")}
            </Label>
        </div>

        <div className="flex flex-col">
            <Label className="font-bold">Descrizione: </Label>
            <Label>{description}</Label>
        </div>

        <div>
            <Label className="font-bold">Indirizzo: </Label>
            <Label>
                {address}
            </Label>
        </div>

        <div>
            <Label className="font-bold">Prezzo: </Label>
            <Label>{formattedPrice || formatPrice(priceInput)}</Label>
        </div>
    </div>
);

export default StepSummary;