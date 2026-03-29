import { Label } from "@/components/ui/label";
import type { Advertisement } from "@/types/types";
import { formatPrice } from "@/utils/formatPrice";

type Props = Readonly<{
    advertisement: Advertisement
}>;

const AdvertisementInfo = ({ advertisement }: Props) => {
    return (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <Label className="text-2xl font-bold">{advertisement.title}</Label>
                <Label className="text-lg text-muted-foreground!">{advertisement.realEstate.addressFormatted}</Label>
            </div>
            <Label className="text-2xl font-bold">{formatPrice(advertisement.price)}</Label>
        </div>
    );
}

export default AdvertisementInfo;