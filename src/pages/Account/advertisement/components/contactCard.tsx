import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { Advertisement } from "@/types/types";
import { Calendar, HandCoins } from "lucide-react";
import { DialogCreateOffer } from "@/pages/Account/homepage/components/dialogCreateOffer";
import { useState } from "react";

type Props = {
    advertisement: Advertisement
}

type AgencyInfoRowProps = {
    label: string
    value: string
}

const AgencyInfoRow = ({ label, value }: AgencyInfoRowProps) => (
    <div className="flex gap-2">
        <Label className="text-md font-extrabold">{label}:</Label>
        <Label className="text-md">{value}</Label>
    </div>
)

export const ContactCard = ({ advertisement }: Props) => {
    const [showOfferDialog, setShowOfferDialog] = useState(false);

    return (
        <div className="flex md:w-80 h-fit shrink-0 flex-col gap-2 rounded-md border p-6 sm:sticky sm:self-start">
            <Label className="text-2xl text-bold">Contatta l'agenzia</Label>
            <div className="flex flex-col gap-2">
                <Button>
                    <Calendar />
                    Prenota un appuntamento
                </Button>
                <Button onClick={() => setShowOfferDialog(true)}>
                    <HandCoins />
                    Fai un'offerta
                </Button>
            </div>
            <Separator className="mt-2" />
            <div>
                <AgencyInfoRow label="Agente" value={`${advertisement.agent.firstName} ${advertisement.agent.lastName}`} />
                <AgencyInfoRow label="Telefono" value={advertisement.agent.phoneNumber} />
            </div>
            <Separator />
            <div className="flex flex-col gap-1">
                <AgencyInfoRow label="Agenzia" value={advertisement.agent.agency.name} />
                <AgencyInfoRow label="Email" value={advertisement.agent.agency.email} />
                <AgencyInfoRow label="Telefono" value={advertisement.agent.agency.phoneNumber} />
                {!advertisement.agent.agency.logo?.url ? (
                    <div className="hidden sm:flex sm:items-center sm:rounded-sm sm:h-full sm:p-2 sm:text-nowrap sm:text-primary bg-primary/25">
                        {advertisement.agent.agency.name}
                    </div>
                ) : (
                    <div className="hidden sm:flex sm:items-center sm:rounded-sm sm:h-full">
                        <img
                            src={advertisement.agent.agency.logo.url}
                            alt="Immagine immobile"
                            className="block object-cover h-10 w-auto rounded-sm aspect-video"
                            loading="lazy"
                        />
                    </div>
                )}
            </div>

            <DialogCreateOffer
                advertisement={advertisement}
                showOfferDialog={showOfferDialog}
                setShowOfferDialog={setShowOfferDialog}
            />
        </div>
    );
}