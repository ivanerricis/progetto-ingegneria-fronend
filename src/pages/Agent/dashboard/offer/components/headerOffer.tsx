import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import type { Offer } from "@/types/types";
import { ArrowLeft } from "lucide-react";

type Props = {
    selectedOffer: Offer;
    onBack: () => void;
}
export const HeaderOffer = ({ selectedOffer, onBack }: Props) => {
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
                <Label className="text-lg">
                    {
                        selectedOffer.advertisement.realEstate
                            .addressFormatted
                    }
                </Label>
                <Label>
                    {selectedOffer.account.firstName}{" "}
                    {selectedOffer.account.lastName}
                </Label>
            </div>
        </div>
    );
}