import { Label } from "@/components/ui/label";
import FeatureItem from "../Account/advertisement/components/featureItem";
import type { Poi } from "@/types/types";

type Props = Readonly<{
    pois: Poi[]
}>;

const AdvertisementPois = ({ pois }: Props) => {
    const schools = pois
        .filter(p => p.type === "school")
        .map(p => ({ ...p, name: p.name === "POI" ? "Scuola" : p.name }))

    const parks = pois
        .filter(p => p.type === "park")
        .map(p => ({ ...p, name: p.name === "POI" ? "Parco" : p.name }))

    const transports = pois
        .filter(p => p.type === "public_transport")
        .map(p => ({ ...p, name: p.name === "POI" ? "Trasporto pubblico" : p.name }))

    return (
        <div className="flex flex-col gap-2">
            <Label className="font-bold text-2xl">Punti di interesse vicini</Label>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    {schools.length > 0 && (
                        <>
                            <Label className="text-xl">Scuole</Label>
                            <div className="flex gap-2 flex-wrap">
                                {schools.map(school => (
                                    <FeatureItem key={school.id}>{school.name}</FeatureItem>
                                ))}
                            </div>
                        </>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    {parks.length > 0 && (
                        <>
                            <Label className="text-xl">Parchi</Label>
                            <div className="flex gap-2 flex-wrap">
                                {parks.map(park => (
                                    <FeatureItem key={park.id}>{park.name}</FeatureItem>
                                ))}
                            </div>
                        </>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    {transports.length > 0 && (
                        <>
                            <Label className="text-xl">Trasporti pubblici</Label>
                            <div className="flex gap-2 flex-wrap">
                                {transports.map(transport => (
                                    <FeatureItem key={transport.id}>{transport.name}</FeatureItem>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdvertisementPois;