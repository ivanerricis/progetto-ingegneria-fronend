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
    const agencyNameToId = new Map(agencies.map((agency) => [agency.name, String(agency.id)]));

    return (
        <Combobox items={agencies.map((agency) => agency.name)}>
            <ComboboxInput
                placeholder={selectedAgency ? selectedAgency.name : "Seleziona un'agenzia"}
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
                        const agencyId = agencyNameToId.get(item);
                        return (
                            <ComboboxItem
                                key={item}
                                value={item}
                                onSelect={() => {
                                    if (agencyId) onValueChange(agencyId);
                                }}
                                onClick={() => {
                                    if (agencyId) onValueChange(agencyId);
                                }}
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