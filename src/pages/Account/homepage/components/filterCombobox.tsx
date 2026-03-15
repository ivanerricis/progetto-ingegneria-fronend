import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown } from "lucide-react"

export const filterOptions = [
    "Più vicini", "Più lontani",
    "Più costosi", "Meno costosi",
    "Più grandi", "Meno grandi",
    "Più recenti", "Meno recenti",
] as const

export type FilterOption = typeof filterOptions[number]

type FilterComboboxProps = {
    value: FilterOption
    onValueChange: (value: FilterOption) => void
}

const FilterCombobox = ({ value, onValueChange }: FilterComboboxProps) => {
    return (
        <Select value={value} onValueChange={(nextValue) => onValueChange(nextValue as FilterOption)}>
            <SelectTrigger className="w-42 sm:mr-5">
                <ArrowUpDown className="text-foreground"/>
                <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
                {filterOptions.map((filter) => (
                    <SelectItem key={filter} value={filter}>
                        {filter}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default FilterCombobox