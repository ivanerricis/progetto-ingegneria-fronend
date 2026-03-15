import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CheckboxFilter from "@/pages/Account/homepage/components/checkboxFilter";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "@/pages/Agent/dashboard/advertisement/components/fileUpload";
import GeoapifyAddressCombobox from "@/pages/Agent/dashboard/components/geoapifyAddressCombobox";
import type { AddressData } from "@/pages/Agent/dashboard/components/geoapifyAddressCombobox";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/utils/formatPrice";

export default function CreateAdvertisement() {
    const emptyAddressData: AddressData = {
        street: "",
        housenumber: "",
        city: "",
        state: "",
        postcode: "",
        country: "",
        lat: null,
        lon: null,
    };

    const [description, setDescription] = useState("");
    const [addressQuery, setAddressQuery] = useState("");
    const [addressData, setAddressData] = useState<AddressData>(emptyAddressData);
    const [priceInput, setPriceInput] = useState("");
    const [formattedPrice, setFormattedPrice] = useState("");

    const navigate = useNavigate();

    const handleGoBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
            return;
        }
        navigate("/agent/login");
    };

    const handleAddressQueryChange = (newValue: string) => {
        setAddressQuery(newValue);

        if (!newValue.trim()) {
            setAddressData(emptyAddressData);
        }
    };

    useEffect(() => {
        if (!priceInput.trim()) {
            setFormattedPrice("");
            return;
        }

        const timeoutId = setTimeout(() => {
            setFormattedPrice(formatPrice(priceInput));
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [priceInput]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Submit logic will be added when backend payload is finalized.
    };

    return (
        <form className="w-full h-full flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col w-full h-full gap-6 overflow-y-auto p-2">
                {/* Upload photos */}
                <FileUpload />

                <Separator orientation="horizontal" className="shrink-0" />

                {/* Checkboxes */}
                <div className="flex flex-col gap-2">
                    <Label className="text-2xl">Caratteristiche</Label>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="w-full sm:w-1/2 gap-3 grid grid-cols-2">
                            <div>
                                <Label className="text-lg">Numero di locali</Label>
                                <Input type="number" placeholder="Numero di locali" defaultValue={1} />
                            </div>
                            <div>
                                <Label className="text-lg">Numero di stanze</Label>
                                <Input type="number" placeholder="Numero di stanze" defaultValue={1} />
                            </div>
                            <div>
                                <Label className="text-lg">Superficie (m²)</Label>
                                <Input type="number" placeholder="Superficie (m²)" defaultValue={1} />
                            </div>
                            <div>
                                <Label className="text-lg">Numero di bagni</Label>
                                <Input type="number" placeholder="Numero di bagni" defaultValue={1} />
                            </div>
                        </div>

                        <Separator orientation="vertical" className="shrink-0 hidden sm:block" />
                        <Separator orientation="horizontal" className="shrink-0 block sm:hidden" />

                        <div className="flex flex-col w-full sm:w-1/2 gap-2">
                            <Label className="text-xl">Servizi</Label>
                            <div className="flex flex-wrap gap-2 h-full w-full">
                                <CheckboxFilter label="Aria condizionata" />
                                <CheckboxFilter label="Balcone" />
                                <CheckboxFilter label="Portineria" />
                                <CheckboxFilter label="Ascensore" />
                                <CheckboxFilter label="Piano" />
                                <CheckboxFilter label="Arredata" />
                                <CheckboxFilter label="Garage" />
                                <CheckboxFilter label="Giardino" />
                                <CheckboxFilter label="Riscaldamenti" />
                                <CheckboxFilter label="Posto auto" />
                                <CheckboxFilter label="Pannelli solari" />
                                <CheckboxFilter label="Terrazzo" />
                            </div>
                        </div>
                    </div>
                </div>

                <Separator orientation="horizontal" className="shrink-0" />

                <div className="flex flex-col sm:flex-row gap-4 w-full">
                    {/* Description */}
                    <div className="flex flex-col gap-2 sm:w-1/2">
                        <div className="flex items-center justify-between">
                            <Label className="text-2xl">Descrizione</Label>
                            <span className="text-sm text-muted-foreground">{description.length}/2000</span>
                        </div>
                        <Textarea
                            placeholder="Descrizione dell'immobile"
                            className="h-full min-h-32 text-foreground"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            maxLength={2000}
                        />
                    </div>

                    <Separator orientation="vertical" className="shrink-0 hidden sm:block" />
                    <Separator orientation="horizontal" className="shrink-0 block sm:hidden" />

                    {/* Indirizzo con autocomplete e campi completi */}
                    <div className="flex flex-col gap-2 sm:w-1/2">
                        <Label className="text-2xl">Indirizzo</Label>
                        <Label className="text-md text-muted-foreground">(Via, Numero civico, CAP, Città, Paese)</Label>
                        <GeoapifyAddressCombobox
                            value={addressQuery}
                            onValueChange={handleAddressQueryChange}
                            onAddressSelect={setAddressData}
                            placeholder="Scrivi via, citta..."
                        />

                        {/* Campi separati con tutte le informazioni */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                            <Input value={addressData.street} placeholder="Via" readOnly />
                            <Input value={addressData.housenumber} placeholder="Numero" readOnly />
                            <Input value={addressData.city} placeholder="Città" readOnly />
                            <Input value={addressData.state} placeholder="Provincia" readOnly />
                            <Input value={addressData.postcode} placeholder="CAP" readOnly />
                            <Input value={addressData.country} placeholder="Paese" readOnly />
                        </div>

                        {/* Hidden per coordinate */}
                        <input type="hidden" value={addressData.lat || ""} />
                        <input type="hidden" value={addressData.lon || ""} />
                    </div>
                </div>

                <Separator orientation="horizontal" className="shrink-0" />

                {/* Price */}
                <div className="flex flex-col w-fit gap-2">
                    <Label className="text-2xl">Prezzo</Label>
                    <div className="flex items-center gap-3">
                        <Input
                            type="number"
                            placeholder="Prezzo dell'immobile"
                            value={priceInput}
                            onChange={(event) => setPriceInput(event.target.value)}
                        />
                        {formattedPrice && (
                            <span className="text-2xl font-medium text-foreground whitespace-nowrap">
                                {formattedPrice}
                            </span>
                        )}
                    </div>
                </div>

                {/* Buttons */}

            </div>
            <div className="flex w-full *:flex-1 sm:*:flex-0 gap-2 items-center justify-start border-t p-2">
                <Button type="button" variant={"destructive"} size="lg" className="text-lg!" onClick={handleGoBack}>
                    Annulla
                </Button>
                <Button type="submit" size="lg" className="text-lg!">
                    Crea annuncio
                </Button>
            </div>
        </form>
    );
}