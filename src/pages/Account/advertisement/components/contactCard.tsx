import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { Agent } from "@/types/types";
import { Calendar, HandCoins } from "lucide-react";

type Props = {
    agent: Agent
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

export const ContactCard = ({ agent }: Props) => {
    return (
        <div className="flex md:w-80 h-fit shrink-0 flex-col gap-2 rounded-md border p-6 sm:sticky sm:self-start">
            <Label className="text-2xl text-bold">Contatta l'agenzia</Label>
            <div className="flex flex-col gap-2">
                <Button>
                    <Calendar />
                    Prenota un appuntamento
                </Button>
                <Button>
                    <HandCoins />
                    Fai un'offerta
                </Button>
            </div>
            <Separator className="mt-2"/>
            <div>
                <AgencyInfoRow label="Agente" value={`${agent.firstName} ${agent.lastName}`} />
                <AgencyInfoRow label="Telefono" value={agent.phoneNumber} />
            </div>
            <Separator />
            <div className="flex flex-col gap-1">
                <AgencyInfoRow label="Agenzia" value={agent.agency.name} />
                <AgencyInfoRow label="Email" value={agent.agency.email} />
                <AgencyInfoRow label="Telefono" value={agent.agency.phoneNumber} />
                {!agent.agency.logo?.url ? (
                    <div className="hidden sm:flex sm:items-center sm:rounded-sm sm:h-full sm:p-2 sm:text-nowrap sm:text-primary bg-primary/25">
                        {agent.agency.name}
                    </div>
                ) : (
                    <div className="hidden sm:flex sm:items-center sm:rounded-sm sm:h-full">
                        <img
                            src={agent.agency.logo.url}
                            alt="Immagine immobile"
                            className="block object-cover h-10 w-auto rounded-sm aspect-video"
                            loading="lazy"
                        />
                    </div>
                )}
            </div>
        </div>
    );
}