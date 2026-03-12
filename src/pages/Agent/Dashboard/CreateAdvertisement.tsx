import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CheckboxFilter from "@/pages/Account/Homepage/components/checkboxFilter";
import { useNavigate } from "react-router-dom";
import FileUpload from "@/pages/Agent/Dashboard/CreateAdvertisement";
import { Textarea } from "@/components/ui/textarea";

export default function CreateAdvertisement() {
    const navigate = useNavigate()

    const handleGoBack = () => {
        if (window.history.length > 1) {
            navigate(-1)
            return
        }

        navigate("/agent/login")
    }

    return (
        <div className="w-full h-full flex flex-col gap-4">
            <div className="flex flex-col w-full h-full gap-6">

                {/* Upload photos */}
                <div className="flex w-full">
                    <FileUpload />
                </div>

                {/* Description */}
                <div className="flex flex-col">
                    <Label className="text-xl">Descrizione</Label>
                    <Textarea placeholder="Descrizione dell'immobile" className="h-32" />
                </div>

                {/* Checkboxes */}
                <div className="flex flex-col w-full border p-4 gap-2 rounded-md">
                    <Label className="text-xl">Servizi</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 h-full w-full">
                        <div className="flex flex-col h-full w-full gap-1">
                            <CheckboxFilter label="Aria condizionata" />
                            <CheckboxFilter label="Balcone" />
                            <CheckboxFilter label="Portineria" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <CheckboxFilter label="Ascensore" />
                            <CheckboxFilter label="Piano" />
                            <CheckboxFilter label="Arredata" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <CheckboxFilter label="Garage" />
                            <CheckboxFilter label="Giardino" />
                            <CheckboxFilter label="Riscaldamenti" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <CheckboxFilter label="Posto auto" />
                            <CheckboxFilter label="Pannelli solari" />
                            <CheckboxFilter label="Terrazzo" />
                        </div>
                    </div>
                </div>

                {/* Price */}
                <div className="flex flex-col w-fit">
                    <Label className="text-xl">Prezzo</Label>
                    <Input type="number" placeholder="Prezzo dell'immobile" />
                </div>
            </div>
            <div className="flex gap-2 items-center justify-start">
                <Button>Crea annuncio</Button>
                <Button variant={"destructive"} onClick={handleGoBack}>Annulla</Button>
            </div>
        </div>
    )
}