import type { ReactNode } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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
            <SelectTrigger className="w-38 rounded-sm text-foreground">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-foreground">
                        <span className="flex items-center gap-2">
                            <span>{option.label}</span>
                            {option.icon}
                        </span>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}