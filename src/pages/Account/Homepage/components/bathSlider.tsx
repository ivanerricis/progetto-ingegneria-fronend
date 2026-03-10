import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import React from "react"

export function BathSlider() {
    const [value, setValue] = React.useState([0, 10])
    const [minValue, maxValue] = value

    return (
        <div className="flex flex-col gap-3">
            <div className="w-full flex items-center justify-between">
                <Label>{minValue}</Label>
                <Label>{maxValue}</Label>
            </div>

            <Slider
                id="price-slider"
                value={value}
                min={0}
                max={10}
                step={1}
                onValueChange={setValue}
                className="w-full"
            />
        </div>
    )
}
