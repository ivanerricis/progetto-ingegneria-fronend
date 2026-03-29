import { Label } from "@/components/ui/label";
import FeatureItem from "../Account/advertisement/components/featureItem";
import type { RealEstate } from "@/types/types";

import ExpandIcon from "@/assets/icons/expand-2.svg?react"
import StairsIcon from "@/assets/icons/stairs.svg?react"
import ElevatorIcon from "@/assets/icons/elevator.svg?react"
import GarageIcon from "@/assets/icons/garage.svg?react"
import FloorPlanIcon from "@/assets/icons/floorplan.svg?react"
import BalconyIcon from "@/assets/icons/balcony.svg?react"
import TerraceIcon from "@/assets/icons/terrace.svg?react"
import { AirVent, Bath, Contact, Fence, Heater, Lightbulb, ShelvingUnit, SolarPanel, SquareParking } from "lucide-react";

const hasValue = <T,>(value: T | null | undefined): value is T => value !== null && value !== undefined

type Props = Readonly<{
    realEstate: RealEstate
}>;

const AdvertisementFeatures = ({ realEstate }: Props) => {
    return (
        <div className="flex flex-col gap-1">
            <Label className="font-bold text-2xl">Caratteristiche</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 *:text-foreground">
                {hasValue(realEstate.rooms) && (
                    <FeatureItem icon={<FloorPlanIcon />}>
                        {realEstate.rooms} locali
                    </FeatureItem>
                )}
                {hasValue(realEstate.size) && (
                    <FeatureItem icon={<ExpandIcon />}>
                        {realEstate.size} m²
                    </FeatureItem>
                )}
                {hasValue(realEstate.bathrooms) && (
                    <FeatureItem icon={<Bath />}>
                        {realEstate.bathrooms === 1
                            ? "1 bagno"
                            : realEstate.bathrooms + " bagni"}
                    </FeatureItem>
                )}
                {hasValue(realEstate.floor) && (
                    <FeatureItem icon={<StairsIcon />}>
                        {realEstate.floor === 0
                            ? "Piano terra"
                            : realEstate.floor + " piano"}
                    </FeatureItem>
                )}
                {hasValue(realEstate.airConditioning) && (
                    <FeatureItem icon={<AirVent />}>
                        Con condizionatore
                    </FeatureItem>
                )}
                {hasValue(realEstate.balcony) && (
                    <FeatureItem icon={<BalconyIcon />}>Con balcone</FeatureItem>
                )}
                {hasValue(realEstate.concierge) && (
                    <FeatureItem icon={<Contact />}>Con concierge</FeatureItem>
                )}
                {hasValue(realEstate.elevator) && (
                    <FeatureItem icon={<ElevatorIcon />}>Con ascensore</FeatureItem>
                )}
                {hasValue(realEstate.energyClass) && (
                    <FeatureItem icon={<Lightbulb />}>
                        Classe energetica: {realEstate.energyClass}
                    </FeatureItem>
                )}
                {hasValue(realEstate.furnished) && (
                    <FeatureItem icon={<ShelvingUnit />}>Arredato</FeatureItem>
                )}
                {hasValue(realEstate.garage) && (
                    <FeatureItem icon={<GarageIcon />}>Con garage</FeatureItem>
                )}
                {hasValue(realEstate.garden) && (
                    <FeatureItem icon={<Fence />}>Con giardino</FeatureItem>
                )}
                {hasValue(realEstate.heating) && (
                    <FeatureItem icon={<Heater />}>Con riscaldamento</FeatureItem>
                )}
                {hasValue(realEstate.parking) && (
                    <FeatureItem icon={<SquareParking />}>Con parcheggio</FeatureItem>
                )}
                {hasValue(realEstate.solarPanels) && (
                    <FeatureItem icon={<SolarPanel />}>Con pannelli solari</FeatureItem>
                )}
                {hasValue(realEstate.terrace) && (
                    <FeatureItem icon={<TerraceIcon />}>Con terrazzo</FeatureItem>
                )}
            </div>
        </div>
    );
}

export default AdvertisementFeatures;