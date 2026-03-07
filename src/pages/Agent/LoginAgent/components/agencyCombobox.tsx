import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"]

const AgencyCombobox = () => {
    return (
        <Combobox items={frameworks}>
            <ComboboxInput placeholder="Seleziona un'agenzia" />
            <ComboboxContent>
                <ComboboxEmpty>Nessuna agenzia trovata.</ComboboxEmpty>
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

export default AgencyCombobox;