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

type DashboardFilterSelectProps = Readonly<{
    value: string
    placeholder: string
    options: SelectOption[]
    onValueChange: (value: string) => void
}>

export default function DashboardFilterSelect({
    value,
    placeholder,
    options,
    onValueChange,
}: DashboardFilterSelectProps) {
    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger className="w-44 rounded-sm h-10! text-foreground bg-background!">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent position="popper">
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="group text-foreground">
                        <div className="flex items-center justify-start gap-2 group-hover:*:text-background group-hover:dark:*:text-foreground group-focus:*:text-background group-focus:dark:*:text-foreground">
                            {option.icon}
                            <Label className="text-lg cursor-pointer group-hover:text-background">{option.label}</Label>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}