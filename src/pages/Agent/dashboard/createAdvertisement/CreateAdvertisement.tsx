import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { AddressData } from "@/pages/Agent/dashboard/components/geoapifyAddressCombobox";
import { formatPrice } from "@/utils/formatPrice";
import { Stepper } from "@/components/stepper";
import { toast } from "sonner";
import StepPhoto from "./components/stepPhoto";
import StepFeatures from "./components/stepFeatures";
import StepAddress from "./components/stepAddress";
import StepPrice from "./components/stepPrice";
import StepSummary from "./components/stepSummary";
import { CreateAdvertisement } from "@/lib/api/agent";

const steps = [
    "Foto",
    "Caratteristiche",
    "Indirizzo",
    "Prezzo",
    "Riepilogo",
];

export default function CreateAdvertisementPage() {
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

    const [step, setStep] = useState(0);

    const [files, setFiles] = useState<File[]>([]);
    const [rooms, setRooms] = useState("");
    const [floor, setFloor] = useState("");
    const [surface, setSurface] = useState("");
    const [bathrooms, setBathrooms] = useState("");
    const [services, setServices] = useState({
        ariaCondizionata: false,
        balcone: false,
        portineria: false,
        ascensore: false,
        arredata: false,
        garage: false,
        giardino: false,
        riscaldamenti: false,
        postoAuto: false,
        pannelliSolari: false,
        terrazzo: false,
    });
    const [description, setDescription] = useState("");
    const [energyClass, setEnergyClass] = useState<"A" | "B" | "C" | "D" | "E" | "F" | "G">("A");
    const [addressQuery, setAddressQuery] = useState("");
    const [addressData, setAddressData] = useState<AddressData>(emptyAddressData);
    const [address, setAddress] = useState("");
    const [priceInput, setPriceInput] = useState("");
    const [formattedPrice, setFormattedPrice] = useState("");
    const [loading, setLoading] = useState(false);
    const [typeValue, setTypeValue] = useState<"sale" | "rent">("sale");
    const [housingType, setHousingType] = useState<"apartment" | "villa">("apartment");

    const navigate = useNavigate();

    const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
    const back = () => setStep((s) => Math.max(s - 1, 0));

    const handleAddressSelect = (data: AddressData) => {
        setAddressData(data);
        setAddress(
            `${data.street} ${data.housenumber}, ${data.city} (${data.state}), ${data.postcode}, ${data.country}`
        );
    };

    const handleAddressQueryChange = (newValue: string) => {
        setAddressQuery(newValue);
        if (!newValue.trim()) {
            setAddressData(emptyAddressData);
            setAddress("");
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

    const handleServiceChange = (service: keyof typeof services) => {
        setServices((prev) => ({ ...prev, [service]: !prev[service] }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData();

        // Campi base
        formData.append("description", description);
        formData.append("price", String(Number.parseFloat(priceInput)));
        formData.append("type", typeValue);
        formData.append("status", "active");

        // Servizi mappati ai nomi del backend
        const realEstate = {
            airConditioning: services.ariaCondizionata,
            balcony: services.balcone,
            elevator: services.ascensore,
            furnished: services.arredata,
            garage: services.garage,
            garden: services.giardino,
            parking: services.postoAuto,
            solarPanels: services.pannelliSolari,
            concierge: services.portineria,
            heating: services.riscaldamenti,
            terrace: services.terrazzo,

            size: Number.parseInt(surface),
            rooms: Number.parseInt(rooms),
            bathrooms: Number.parseInt(bathrooms),
            floor: Number.parseInt(floor),
            energyClass: energyClass,
            housingType: housingType,
            addressInput: address,
        }

        formData.append("realEstate", JSON.stringify(realEstate));

        // File
        files.forEach((file) => formData.append("photos", file));

        try {
            await CreateAdvertisement(formData);
            toast.success("Annuncio creato con successo!");
            navigate("/agent/dashboard/advertisements");
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Errore durante la creazione dell'annuncio";
            toast.error("Creazione annuncio fallita: " + message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex flex-col gap-2 items-center justify-between h-full">
            <Label className="text-3xl font-bold my-2">Crea annuncio</Label>
            <form id="create-ad-form" onSubmit={handleSubmit} className="gap-4 flex flex-col h-full w-full overflow-auto p-2 sm:px-12 ">
                <div className="flex flex-col px-2 gap-6">
                    <Stepper
                        big
                        steps={steps}
                        current={step}
                        barWidthClass="w-4"
                        barPaddingClass="px-0 sm:px-18 lg:px-24 2xl:px-31"
                    />

                    {/* STEP 0: Foto */}
                    {step === 0 && (<StepPhoto files={files} onFilesChange={setFiles} />)}

                    {/* STEP 1: Caratteristiche e servizi */}
                    {step === 1 && (
                        <StepFeatures
                            rooms={rooms}
                            setRooms={setRooms}
                            floor={floor}
                            setFloor={setFloor}
                            surface={surface}
                            setSurface={setSurface}
                            bathrooms={bathrooms}
                            setBathrooms={setBathrooms}
                            services={services}
                            onServiceChange={handleServiceChange}
                            description={description}
                            setDescription={setDescription}
                            typeValue={typeValue}
                            setTypeValue={setTypeValue}
                            energyClass={energyClass}
                            setEnergyClass={setEnergyClass}
                            housingType={housingType}
                            setHousingType={setHousingType}
                        />
                    )}

                    {/* STEP 2: Indirizzo */}
                    {step === 2 && (
                        <StepAddress
                            addressQuery={addressQuery}
                            onAddressQueryChange={handleAddressQueryChange}
                            addressData={addressData}
                            setAddressData={handleAddressSelect}
                        />
                    )}

                    {/* STEP 3: Prezzo */}
                    {step === 3 && (
                        <StepPrice
                            priceInput={priceInput}
                            setPriceInput={setPriceInput}
                            formattedPrice={formattedPrice}
                        />
                    )}

                    {/* STEP 4: Riepilogo */}
                    {step === 4 && (
                        <StepSummary
                            files={files}
                            rooms={rooms}
                            floor={floor}
                            surface={surface}
                            bathrooms={bathrooms}
                            typeValue={typeValue}
                            energyClass={energyClass}
                            housingType={housingType}
                            services={services}
                            description={description}
                            address={address}
                            formattedPrice={formattedPrice}
                            priceInput={priceInput}
                            formatPrice={formatPrice}
                        />
                    )}
                </div>
            </form>
            <div className="flex items-center w-full justify-between border-t p-2 bg-background">
                {step > 0 && (
                    <Button variant="outline" onClick={back} type="button" size={"lg"}>
                        Indietro
                    </Button>
                )}
                {step < steps.length - 1 ? (
                    <>
                        <div />
                        <Button onClick={next} type="button" size={"lg"}>
                            Avanti
                        </Button>
                    </>
                ) : (
                    <Button
                        type="submit"
                        form="create-ad-form"
                        size={"lg"}
                        disabled={loading}>
                        {loading ? "Creazione..." : "Crea annuncio"}
                    </Button>
                )}
            </div>
        </div>
    );
}