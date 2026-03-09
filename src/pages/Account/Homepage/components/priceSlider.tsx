import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { formatPrice } from "@/utils/formatPrice"
import React from "react"

export function PriceSlider() {
    const [value, setValue] = React.useState([0, 1000000])
    const [minValue, maxValue] = value

    return (
        <div className="flex flex-col gap-3">
            <div className="w-full flex items-center justify-between">
                <Label>{formatPrice(minValue)}</Label>
                <Label>{formatPrice(maxValue)}</Label>
            </div>

            <Slider
                id="price-slider"
                value={value}
                min={0}
                max={1000000}
                step={10000}
                onValueChange={setValue}
                className="w-full"
            />
        </div>
    )
}
