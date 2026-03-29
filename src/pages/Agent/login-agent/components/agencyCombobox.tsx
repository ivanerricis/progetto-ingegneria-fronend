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

    const getEmptyStateMessage = () => {
        if (loading) return "Caricamento agenzie...";
        if (loadError) return loadError;
        return "Nessuna agenzia trovata.";
    };

    return (
        <Combobox items={agencies.map((agency) => agency.name)}>
            <ComboboxInput
                className="text-lg"
                placeholder={selectedAgency ? selectedAgency.name : "Seleziona un'agenzia"}
            />
            <ComboboxContent>
                <ComboboxEmpty className="text-lg">
                    {getEmptyStateMessage()}
                </ComboboxEmpty>

                <ComboboxList>
                    {(item) => {
                        const agencyId = agencyNameToId.get(item);
                        return (
                            <ComboboxItem
                                className="text-lg hover:text-background! dark:hover:text-foreground! cursor-pointer"
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