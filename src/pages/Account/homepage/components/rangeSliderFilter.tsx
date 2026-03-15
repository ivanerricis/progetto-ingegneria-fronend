import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"

type RangeSliderFilterProps = {
    id: string
    min: number
    max: number
    step: number
    defaultValue?: [number, number]
    formatValue?: (value: number) => string
}

const defaultFormatter = (value: number) => value.toString()

export const RangeSliderFilter = ({
    id,
    min,
    max,
    step,
    defaultValue,
    formatValue = defaultFormatter,
}: RangeSliderFilterProps) => {
    const [value, setValue] = useState<number[]>(defaultValue ?? [min, max])
    const [minValue, maxValue] = value

    return (
        <div className="flex flex-col gap-3">
            <div className="w-full flex items-center justify-between p-1">
                <Label>{formatValue(minValue)}</Label>
                <Label>{formatValue(maxValue)}</Label>
            </div>

            <Slider
                id={id}
                value={value}
                min={min}
                max={max}
                step={step}
                onValueChange={setValue}
                className="w-full"
            />
        </div>
    )
}