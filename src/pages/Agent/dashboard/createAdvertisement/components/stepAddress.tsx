import type { FC } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import GeoapifyAddressCombobox from "@/pages/Agent/dashboard/components/geoapifyAddressCombobox";
import type { AddressData } from "@/types/types";

interface StepAddressProps {
    addressQuery: string;
    onAddressQueryChange: (value: string) => void;
    addressData: AddressData;
    setAddressData: (data: AddressData) => void;
}

const StepAddress: FC<StepAddressProps> = ({ addressQuery, onAddressQueryChange, addressData, setAddressData }) => (
    <div className="flex flex-col gap-2">
        <Label className="text-2xl">Indirizzo</Label>
        <Label className="text-md text-muted-foreground">(Via, Numero civico, CAP, Città, Paese)</Label>
        <GeoapifyAddressCombobox
            value={addressQuery}
            onValueChange={onAddressQueryChange}
            onAddressSelect={setAddressData}
            placeholder="Scrivi via, città..."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-2 gap-y-4 mt-4 *:flex *:flex-col *:gap-1 *:*:text-lg">
            <div>
                <Label>Via</Label>
                <Input value={addressData.street} placeholder="Via" readOnly disabled />
            </div>
            <div>
                <Label>Numero</Label>
                <Input value={addressData.housenumber} placeholder="Numero" readOnly disabled />
            </div>
            <div>
                <Label>Città</Label>
                <Input value={addressData.city} placeholder="Città" readOnly disabled />
            </div>
            <div>
                <Label>Provincia</Label>
                <Input value={addressData.state} placeholder="Provincia" readOnly disabled />
            </div>
            <div>
                <Label>CAP</Label>
                <Input value={addressData.postcode} placeholder="CAP" readOnly disabled />
            </div>
            <div>
                <Label>Paese</Label>
                <Input value={addressData.country} placeholder="Paese" readOnly disabled />
            </div>
        </div>
        <input type="hidden" value={addressData.lat || ""} />
        <input type="hidden" value={addressData.lon || ""} />
    </div>
);

export default StepAddress;