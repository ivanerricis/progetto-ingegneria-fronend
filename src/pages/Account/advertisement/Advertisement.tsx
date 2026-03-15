import Header from "@/components/header";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import useAdvertisement from "@/hooks/account/useAdvertisement";
import { formatPrice } from "@/utils/formatPrice";
import { AirVent, ArrowLeft, Bath, Contact, Fence, Heater, Lightbulb, ShelvingUnit, SolarPanel, SquareParking } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { AccountBadge } from "@/pages/Account/homepage/components/accountBadge";
import { Label } from "@/components/ui/label";
import { Footer } from "@/components/footer";
import RealEstateCarousel from "@/pages/Account/advertisement/components/realEstateCarousel";
import type { ReactNode } from "react"
import { ContactCard } from "@/pages/Account/advertisement/components/contactCard";
import { RealEstateMap } from "@/components/map/realEstateMap";
import { Separator } from "@/components/ui/separator";
import { AdvertisementSkeleton } from "@/pages/Account/advertisement/components/advertisementSkeleton";

import ExpandIcon from "@/assets/icons/expand-2.svg?react"
import StairsIcon from "@/assets/icons/stairs.svg?react"
import ElevatorIcon from "@/assets/icons/elevator.svg?react"
import GarageIcon from "@/assets/icons/garage.svg?react"
import FloorPlanIcon from "@/assets/icons/floorplan.svg?react"
import BalconyIcon from "@/assets/icons/balcony.svg?react"
import TerraceIcon from "@/assets/icons/terrace.svg?react"

const hasValue = <T,>(value: T | null | undefined): value is T => value !== null && value !== undefined

type FeatureItemProps = {
    children: ReactNode
    icon?: ReactNode
    iconSizeClassName?: string
}

const FeatureItem = ({ children, icon, iconSizeClassName = "size-8" }: FeatureItemProps) => (
    <div className="flex items-center gap-1 rounded-sm border dark:*:text-primary *:text-primary bg-primary/20 p-1">
        {icon && <div className={`${iconSizeClassName} flex items-center justify-center *:size-7`}>{icon}</div>}
        <Label className="text-md font-semibold">{children}</Label>
    </div>
)

const hasCoordinates = (latitude?: number, longitude?: number) => (
    Number.isFinite(latitude) && Number.isFinite(longitude)
)

const Advertisement = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { advertisement, isLoading, error } = useAdvertisement(id)

    const handleBackClick = () => {
        if (window.history.length > 1) {
            navigate(-1)
            return
        }

        navigate("/account/login")
    }

    const renderPage = (content: ReactNode) => (
        <div className="flex h-screen flex-col overflow-hidden">
            <Header
                isHomepage
                left={
                    <Button
                        variant={"outline"}
                        onClick={handleBackClick}>
                        <ArrowLeft />
                        <Label className="hidden sm:flex text-md">Indietro</Label>
                    </Button>
                }
                right={
                    <>
                        <ModeToggle />
                        <AccountBadge />
                    </>
                }
            />

            <div className="flex-1 p-2 overflow-y-auto sm:overflow-hidden">
                {content}
            </div>

            <Footer isHomepage />
        </div>
    )

    if (isLoading) {
        return renderPage(
            <AdvertisementSkeleton />
        )
    }

    if (error) {
        return renderPage(
            <p className="text-destructive">{error}</p>
        )
    }

    if (!advertisement) {
        return renderPage(
            <p className="text-muted-foreground">Annuncio non trovato.</p>
        )
    }

    const latitude = advertisement.realEstate.coordinates?.latitude
    const longitude = advertisement.realEstate.coordinates?.longitude
    const locationCoordinates = advertisement.realEstate.location?.coordinates
    const hasMapCoordinates = hasCoordinates(latitude, longitude)
        || (Array.isArray(locationCoordinates)
            && hasCoordinates(locationCoordinates[1], locationCoordinates[0]))

    return (
        renderPage(
            <div className="flex w-full flex-col gap-2 sm:h-full sm:min-h-0 sm:flex-row 2xl:px-50">
                <div className="flex flex-1 flex-col gap-4 sm:min-h-0 sm:overflow-y-auto sm:pr-2">
                    <div className="flex w-full border rounded-md aspect-video sm:min-h-100 max-h-120">
                        <RealEstateCarousel photos={advertisement.photos} />
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <Label className="text-2xl font-bold">{advertisement.title}</Label>
                            <Label className="text-lg text-muted-foreground!">{advertisement.realEstate.addressFormatted}</Label>
                        </div>
                        <Label className="text-2xl font-bold">{formatPrice(advertisement.price)}</Label>
                    </div>

                    <Separator orientation="horizontal" className="shrink-0" />

                    <div className="flex flex-col gap-1">
                        <Label className="font-bold text-2xl">Descrizione</Label>
                        <Label className="text-muted-foreground! text-lg">{advertisement.description}</Label>
                    </div>

                    <Separator orientation="horizontal" className="shrink-0" />

                    <div className="flex flex-col gap-1">
                        <Label className="font-bold text-2xl">Caratteristiche</Label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 *:text-foreground">
                            {hasValue(advertisement.realEstate.rooms) && (
                                <FeatureItem icon={<FloorPlanIcon />}>
                                    {advertisement.realEstate.rooms} locali
                                </FeatureItem>
                            )}
                            {hasValue(advertisement.realEstate.size) && (
                                <FeatureItem icon={<ExpandIcon />}>
                                    {advertisement.realEstate.size} m²
                                </FeatureItem>
                            )}
                            {hasValue(advertisement.realEstate.bathrooms) && (
                                <FeatureItem icon={<Bath />}>
                                    {advertisement.realEstate.bathrooms === 1
                                        ? "1 bagno"
                                        : advertisement.realEstate.bathrooms + " bagni"}
                                </FeatureItem>
                            )}
                            {hasValue(advertisement.realEstate.floor) && (
                                <FeatureItem icon={<StairsIcon />}>
                                    {advertisement.realEstate.floor === 0
                                        ? "Piano terra"
                                        : advertisement.realEstate.floor + " piano"}
                                </FeatureItem>
                            )}
                            {hasValue(advertisement.realEstate.airConditioning) && (
                                <FeatureItem icon={<AirVent />}>
                                    Con condizionatore
                                </FeatureItem>
                            )}
                            {hasValue(advertisement.realEstate.balcony) && (
                                <FeatureItem icon={<BalconyIcon />}>Con balcone</FeatureItem>
                            )}
                            {hasValue(advertisement.realEstate.concierge) && (
                                <FeatureItem icon={<Contact />}>Con concierge</FeatureItem>
                            )}
                            {hasValue(advertisement.realEstate.elevator) && (
                                <FeatureItem icon={<ElevatorIcon />}>Con ascensore</FeatureItem>
                            )}
                            {hasValue(advertisement.realEstate.energyClass) && (
                                <FeatureItem icon={<Lightbulb />}>
                                    Classe energetica: {advertisement.realEstate.energyClass}
                                </FeatureItem>
                            )}
                            {hasValue(advertisement.realEstate.furnished) && (
                                <FeatureItem icon={<ShelvingUnit />}>Arredato</FeatureItem>
                            )}
                            {hasValue(advertisement.realEstate.garage) && (
                                <FeatureItem icon={<GarageIcon />}>Con garage</FeatureItem>
                            )}
                            {hasValue(advertisement.realEstate.garden) && (
                                <FeatureItem icon={<Fence />}>Con giardino</FeatureItem>
                            )}
                            {hasValue(advertisement.realEstate.heating) && (
                                <FeatureItem icon={<Heater />}>Con riscaldamento</FeatureItem>
                            )}
                            {hasValue(advertisement.realEstate.parking) && (
                                <FeatureItem icon={<SquareParking />}>Con parcheggio</FeatureItem>
                            )}
                            {hasValue(advertisement.realEstate.solarPanels) && (
                                <FeatureItem icon={<SolarPanel />}>Con pannelli solari</FeatureItem>
                            )}
                            {hasValue(advertisement.realEstate.terrace) && (
                                <FeatureItem icon={<TerraceIcon />}>Con terrazzo</FeatureItem>
                            )}
                        </div>
                    </div>

                    <Separator orientation="horizontal" className="shrink-0" />

                    <div className="flex flex-col gap-2">
                        <Label className="font-bold text-2xl">Posizione</Label>
                        {hasMapCoordinates ? (
                            <div className="h-100 overflow-hidden rounded-md border">
                                <RealEstateMap advertisements={[advertisement]} />
                            </div>
                        ) : (
                            <Label className="text-muted-foreground!">Posizione non disponibile per questo immobile.</Label>
                        )}
                    </div>
                </div>
                <ContactCard agent={advertisement.agent} />
            </div>
        )
    );
}

export default Advertisement;