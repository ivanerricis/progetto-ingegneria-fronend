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
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
            <Input value={addressData.street} placeholder="Via" readOnly />
            <Input value={addressData.housenumber} placeholder="Numero" readOnly />
            <Input value={addressData.city} placeholder="Città" readOnly />
            <Input value={addressData.state} placeholder="Provincia" readOnly />
            <Input value={addressData.postcode} placeholder="CAP" readOnly />
            <Input value={addressData.country} placeholder="Paese" readOnly />
        </div>
        <input type="hidden" value={addressData.lat || ""} />
        <input type="hidden" value={addressData.lon || ""} />
    </div>
);

export default StepAddress;