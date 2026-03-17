import type { ReactNode } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type SelectOption = {
    value: string
    label: string
    icon?: ReactNode
}

type DashboardFilterSelectProps = {
    value: string
    placeholder: string
    options: SelectOption[]
    onValueChange: (value: string) => void
}

export default function DashboardFilterSelect({
    value,
    placeholder,
    options,
    onValueChange,
}: DashboardFilterSelectProps) {
    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger className="w-44 rounded-sm h-10! text-foreground">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent position="popper">
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-foreground">
                        <div className="flex items-center justify-start gap-2">
                            {option.icon}
                            <Label className="text-lg">{option.label}</Label>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}