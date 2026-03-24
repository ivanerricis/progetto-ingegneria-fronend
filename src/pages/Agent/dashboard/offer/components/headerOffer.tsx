import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { Negotiation } from "@/types/types";
import { ArrowLeft } from "lucide-react";

type Props = {
    selectedNegotiation: Negotiation | null;
    onBack: () => void;
}
export const HeaderOffer = ({ selectedNegotiation, onBack }: Props) => {
    return (
        <div className="flex gap-3 border-b p-2 items-center bg-background">
            <Button
                variant="outline"
                size="icon-lg"
                className="md:hidden"
                onClick={onBack}
            >
                <ArrowLeft />
            </Button>

            <div className="flex flex-col">
                <Label className="text-md">
                    {selectedNegotiation?.advertisement.realEstate.addressFormatted}
                </Label>
                <Label>
                    {selectedNegotiation?.account.firstName}{" "}
                    {selectedNegotiation?.account.lastName}
                </Label>
            </div>
        </div>
    );
}