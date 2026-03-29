import { Label } from "@/components/ui/label";

type Props = Readonly<{
    description: string
}>;

const AdvertisementDescription = ({ description }: Props) => {
    return (
        <div className="flex flex-col gap-1">
            <Label className="font-bold text-2xl">Descrizione</Label>
            <Label className="text-muted-foreground! text-lg">{description}</Label>
        </div>
    );
}

export default AdvertisementDescription;