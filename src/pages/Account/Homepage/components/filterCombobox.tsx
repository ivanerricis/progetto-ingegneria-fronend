import { Combobox, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";

const filters = [
    "Più costosi", "Meno costosi",
    "Più grandi", "Meno grandi",
    "Più recenti", "Meno recenti",
    "Più vicini",
]

const FilterCombobox = () => {
    return (
        <Combobox items={filters}>
            <ComboboxInput placeholder="Più vicini" />
            <ComboboxContent>
                <ComboboxList>
                    {(item) => (
                        <ComboboxItem key={item} value={item}>
                            {item}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
}

export default FilterCombobox;