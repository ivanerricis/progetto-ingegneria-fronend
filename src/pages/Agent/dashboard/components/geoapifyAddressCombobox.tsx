import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox";
import { useEffect, useRef, useState } from "react";

type GeoapifySuggestion = {
    properties: {
        place_id: string;
        formatted: string;
        street?: string;
        housenumber?: string;
        city?: string;
        state?: string;
        postcode?: string;
        country?: string;
        lat: number;
        lon: number;
    };
};

export type AddressData = {
    street: string;
    housenumber: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    lat: number | null;
    lon: number | null;
};

type GeoapifyAddressComboboxProps = {
    value: string;
    onValueChange: (value: string) => void;
    onAddressSelect: (address: AddressData) => void;
    placeholder?: string;
};

const GeoapifyAddressCombobox = ({
    value,
    onValueChange,
    onAddressSelect,
    placeholder = "Scrivi via, citta...",
}: GeoapifyAddressComboboxProps) => {
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const [suggestions, setSuggestions] = useState<GeoapifySuggestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const skipNextFetchRef = useRef(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => setDebouncedQuery(value.trim()), 300);
        return () => clearTimeout(timeoutId);
    }, [value]);

    useEffect(() => {
        if (!debouncedQuery) {
            setSuggestions([]);
            return;
        }

        if (skipNextFetchRef.current) {
            skipNextFetchRef.current = false;
            return;
        }

        const controller = new AbortController();

        const fetchSuggestions = async () => {
            setIsLoading(true);

            try {
                const response = await fetch(
                    `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
                        debouncedQuery
                    )}&limit=5&types=city,street&apiKey=${import.meta.env.VITE_GEOAPIFY_KEY}`,
                    { signal: controller.signal }
                );
                const data = (await response.json()) as { features?: GeoapifySuggestion[] };
                setSuggestions(data.features || []);
            } catch (error) {
                if (!(error instanceof DOMException && error.name === "AbortError")) {
                    console.error(error);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchSuggestions();

        return () => controller.abort();
    }, [debouncedQuery]);

    return (
        <Combobox<GeoapifySuggestion>
            items={suggestions}
            inputValue={value}
            itemToStringLabel={(item) => item.properties.formatted}
            onInputValueChange={(inputValue) => onValueChange(inputValue)}
            onValueChange={(selectedSuggestion) => {
                if (!selectedSuggestion) {
                    return;
                }

                const props = selectedSuggestion.properties;

                skipNextFetchRef.current = true;
                setSuggestions([]);
                onValueChange(props.formatted);
                onAddressSelect({
                    street: props.street || "",
                    housenumber: props.housenumber || "",
                    city: props.city || "",
                    state: props.state || "",
                    postcode: props.postcode || "",
                    country: props.country || "",
                    lat: props.lat,
                    lon: props.lon,
                });
            }}
        >
            <ComboboxInput placeholder={placeholder} showClear />
            <ComboboxContent>
                <ComboboxEmpty>
                    {isLoading ? "Ricerca indirizzi..." : "Nessun risultato trovato."}
                </ComboboxEmpty>
                <ComboboxList>
                    {(item) => {
                        return (
                            <ComboboxItem key={item.properties.place_id} value={item}>
                                {item.properties.formatted}
                            </ComboboxItem>
                        );
                    }}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    );
};

export default GeoapifyAddressCombobox;
