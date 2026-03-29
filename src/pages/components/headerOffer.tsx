import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { Negotiation } from "@/types/types";
import { ArrowLeft } from "lucide-react";

type Props = {
    selectedNegotiation: Negotiation | null;
    onBack: () => void;
    role?: "AGENT" | "ACCOUNT";
}

export const HeaderOffer = ({ selectedNegotiation, onBack, role }: Props) => {
    return (
        <div className="flex gap-3 border-b p-2 items-center bg-background min-w-0 overflow-hidden">
            <Button
                variant="outline"
                size="icon-lg"
                className="md:hidden"
                onClick={onBack}
            >
                <ArrowLeft />
            </Button>

            <div className="flex flex-col min-w-0">
                <div className="w-full min-w-0">
                    <p className="text-md text-left text-foreground truncate">{selectedNegotiation?.advertisement.realEstate.addressFormatted}</p>
                </div>
                <Label className="text-sm">
                    {role === "AGENT" ?
                        selectedNegotiation?.agent.firstName + " " + selectedNegotiation?.agent.lastName
                        :
                        selectedNegotiation?.account.firstName + " " + selectedNegotiation?.account.lastName
                    }
                </Label>
            </div>
        </div>
    );
}