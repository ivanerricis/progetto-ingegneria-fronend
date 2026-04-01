import type { FC } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPrice } from "@/utils/formatPrice";

interface StepPriceProps {
    priceInput: string;
    setPriceInput: (value: string) => void;
    formattedPrice: string;
}

const StepPrice: FC<StepPriceProps> = ({ priceInput, setPriceInput, formattedPrice }) => (
    <div className="flex flex-col w-fit gap-2">
        <Label className="text-2xl">Prezzo</Label>
        <div className="flex items-center gap-3">
            <Input
            className="text-lg!"
                type="number"
                placeholder="Prezzo dell'immobile"
                value={priceInput}
                onChange={(event) => setPriceInput(event.target.value)}
            />
            {formattedPrice && (
                <span className="text-2xl font-medium text-foreground whitespace-nowrap">
                    {formattedPrice || formatPrice(priceInput)}
                </span>
            )}
        </div>
    </div>
);

export default StepPrice;