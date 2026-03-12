import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const filters = [
    "Più costosi", "Meno costosi",
    "Più grandi", "Meno grandi",
    "Più recenti", "Meno recenti",
    "Più vicini",
]

const FilterCombobox = () => {
    return (
        <Select defaultValue="Più vicini">
            <SelectTrigger className="w-42">
                <SelectValue />
            </SelectTrigger>
            <SelectContent position="popper">
                {filters.map((filter) => (
                    <SelectItem key={filter} value={filter}>
                        {filter}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

export default FilterCombobox;