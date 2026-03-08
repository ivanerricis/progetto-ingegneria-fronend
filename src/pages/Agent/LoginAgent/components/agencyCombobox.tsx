import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox";
import type { Agency } from "@/types/types";

type AgencyComboboxProps = {
    agencies: Agency[];
    value: string;
    onValueChange: (value: string) => void;
    loading?: boolean;
    loadError?: string | null;
};

const AgencyCombobox = ({
    agencies,
    value,
    onValueChange,
    loading = false,
    loadError = null,
}: AgencyComboboxProps) => {
    const selectedAgency = agencies.find((a) => String(a.id) === value);

    return (
        <Combobox items={agencies.map((agency) => `${agency.id} - ${agency.name}`)}>
            <ComboboxInput
                placeholder={selectedAgency ? `${selectedAgency.id} - ${selectedAgency.name}` : "Seleziona un'agenzia"}
            />
            <ComboboxContent>
                <ComboboxEmpty>
                    {loading
                        ? "Caricamento agenzie..."
                        : loadError
                            ? loadError
                            : "Nessuna agenzia trovata."}
                </ComboboxEmpty>

                <ComboboxList>
                    {(item) => {
                        const [idPart] = item.split(" - ");
                        return (
                            <ComboboxItem
                                key={item}
                                value={item}
                                onSelect={() => onValueChange(idPart)}
                                onClick={() => onValueChange(idPart)}
                            >
                                {item}
                            </ComboboxItem>
                        );
                    }}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
};

export default AgencyCombobox;