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

const steps = [
    "Foto",
    "Caratteristiche",
    "Indirizzo",
    "Prezzo",
    "Riepilogo",
];

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

    const [step, setStep] = useState(0);

    const [files, setFiles] = useState<File[]>([]);
    const [rooms, setRooms] = useState(1);
    const [floor, setFloor] = useState(1);
    const [surface, setSurface] = useState(1);
    const [bathrooms, setBathrooms] = useState(1);
    const [services, setServices] = useState({
        ariaCondizionata: false,
        balcone: false,
        portineria: false,
        ascensore: false,
        piano: false,
        arredata: false,
        garage: false,
        giardino: false,
        riscaldamenti: false,
        postoAuto: false,
        pannelliSolari: false,
        terrazzo: false,
    });
    const [description, setDescription] = useState("");
    const [addressQuery, setAddressQuery] = useState("");
    const [addressData, setAddressData] = useState<AddressData>(emptyAddressData);
    const [priceInput, setPriceInput] = useState("");
    const [formattedPrice, setFormattedPrice] = useState("");
    const [loading, setLoading] = useState(false);
    const [typeValue, setTypeValue] = useState<"sale" | "rent">("sale");

    const navigate = useNavigate();

    const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
    const back = () => setStep((s) => Math.max(s - 1, 0));

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

    const handleServiceChange = (service: keyof typeof services) => {
        setServices((prev) => ({ ...prev, [service]: !prev[service] }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const payload = {
            files,
            rooms,
            floor,
            surface,
            bathrooms,
            services,
            description,
            address: addressData,
            price: Number.parseFloat(priceInput),
            type: typeValue,
        };

        try {
            // Replace with actual API call
            // await apiClient.post("/advertisements/create", payload);
            console.log("Payload inviato:", payload);
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
            <form onSubmit={handleSubmit} className="gap-4 flex flex-col h-full w-full overflow-auto p-2 sm:px-12 ">
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
                        />
                    )}

                    {/* STEP 2: Indirizzo */}
                    {step === 2 && (
                        <StepAddress
                            addressQuery={addressQuery}
                            onAddressQueryChange={handleAddressQueryChange}
                            addressData={addressData}
                            setAddressData={setAddressData}
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
                            services={services}
                            description={description}
                            addressData={addressData}
                            formattedPrice={formattedPrice}
                            priceInput={priceInput}
                            formatPrice={formatPrice}
                        />
                    )}
                </div>
            </form>
            <div className="flex items-center w-full justify-between border-t p-2">
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
                    <Button type="submit" size={"lg"} disabled={loading}>
                        {loading ? "Creazione..." : "Crea annuncio"}
                    </Button>
                )}
            </div>
        </div>
    );
}