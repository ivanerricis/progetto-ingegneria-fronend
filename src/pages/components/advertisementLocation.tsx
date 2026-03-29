import { RealEstateMap } from "@/components/map/realEstateMap";
import { Label } from "@/components/ui/label";
import type { Advertisement, Poi } from "@/types/types";

type Props = Readonly<{
    advertisement: Advertisement
    pois: Poi[]
}>;

const hasCoordinates = (latitude?: number, longitude?: number) => (
    Number.isFinite(latitude) && Number.isFinite(longitude)
)

const AdvertisementLocation = ({ advertisement, pois }: Props) => {
    const latitude = advertisement.realEstate.coordinates?.latitude
    const longitude = advertisement.realEstate.coordinates?.longitude
    const locationCoordinates = advertisement.realEstate.location?.coordinates
    const hasMapCoordinates = hasCoordinates(latitude, longitude)
        || (Array.isArray(locationCoordinates)
            && hasCoordinates(locationCoordinates[1], locationCoordinates[0]))

    return (
        <div className="flex flex-col gap-2">
            <Label className="font-bold text-2xl">Posizione</Label>
            {hasMapCoordinates ? (
                <div className="h-100 overflow-hidden rounded-md border">
                    <RealEstateMap
                        advertisements={[advertisement]}
                        pois={pois}
                    />
                </div>
            ) : (
                <Label className="text-muted-foreground!">Posizione non disponibile per questo immobile.</Label>
            )}
        </div>
    );
}

export default AdvertisementLocation;