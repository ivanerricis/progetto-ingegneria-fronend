import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CheckboxFilter from "@/pages/Account/homepage/components/checkboxFilter";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "@/pages/Agent/dashboard/advertisement/components/fileUpload";
import { Textarea } from "@/components/ui/textarea";

export default function CreateAdvertisement() {
    const [description, setDescription] = useState("")
    const navigate = useNavigate()

    const handleGoBack = () => {
        if (window.history.length > 1) {
            navigate(-1)
            return
        }

        navigate("/agent/login")
    }

    return (
        <div className="w-full h-full flex flex-col gap-4 pr-2">
            <div className="flex flex-col w-full h-full gap-6">

                {/* Upload photos */}
                <div className="flex w-full">
                    <FileUpload />
                </div>

                {/* Description */}
                <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                        <Label className="text-xl">Descrizione</Label>
                        <span className="text-sm text-muted-foreground">{description.length}/2000</span>
                    </div>
                    <Textarea
                        placeholder="Descrizione dell'immobile"
                        className="h-32 max-h-32 min-h-32 text-foreground"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        maxLength={2000}
                    />
                </div>

                {/* Checkboxes */}
                <div className="flex flex-col w-full gap-2">
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