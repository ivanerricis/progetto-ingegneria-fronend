import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Map, Search, SlidersHorizontal } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import Header from "@/components/header"
import FilterCombobox, { type FilterOption } from "@/pages/Account/homepage/components/filterCombobox"
import SidebarFilter from "./components/sidebarFilter"
import { Footer } from "@/components/footer"
import AdvertisementsList from "./components/advertisementList"
import useAdvertisements from "@/hooks/account/useAdvertisements"
import { Label } from "@/components/ui/label"
import AdvertisementListSkeleton from "./components/advertisementListSkeleton"
import { AccountBadge } from "@/pages/Account/homepage/components/accountBadge"
import MobileSidebar from "./components/mobileSidebar"
import MobileMapSidebar from "./components/mobileMapSidebar"
import { RealEstateMap } from "@/components/map/realEstateMap"
import type { Advertisement } from "@/types/types"
import { ButtonGroup } from "@/components/ui/button-group"

const defaultFilter: FilterOption = "Più vicini"
const defaultReferencePoint: [number, number] = [40.8518, 14.2681]

const getCoordinates = (advertisement: Advertisement): [number, number] | null => {
    const locationCoordinates = advertisement.realEstate.location?.coordinates

    if (Array.isArray(locationCoordinates) && locationCoordinates.length >= 2) {
        const [longitude, latitude] = locationCoordinates

        if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
            return [latitude, longitude]
        }
    }

    const coordinates = advertisement.realEstate.coordinates

    if (
        coordinates
        && Number.isFinite(coordinates.latitude)
        && Number.isFinite(coordinates.longitude)
    ) {
        return [coordinates.latitude, coordinates.longitude]
    }

    return null
}

const getDistanceFromReference = (advertisement: Advertisement) => {
    const coordinates = getCoordinates(advertisement)

    if (!coordinates) return Number.POSITIVE_INFINITY

    const [latitude, longitude] = coordinates
    const [referenceLatitude, referenceLongitude] = defaultReferencePoint

    return Math.hypot(latitude - referenceLatitude, longitude - referenceLongitude)
}

const getAdvertisementOrderValue = (advertisement: Advertisement, fallbackIndex: number) => {
    const numericId = Number(advertisement.id)
    return Number.isFinite(numericId) ? numericId : fallbackIndex
}

const sortAdvertisements = (advertisements: Advertisement[], selectedFilter: FilterOption) => {
    return [...advertisements].sort((leftAdvertisement, rightAdvertisement) => {
        switch (selectedFilter) {
            case "Più costosi":
                return Number(rightAdvertisement.price) - Number(leftAdvertisement.price)
            case "Meno costosi":
                return Number(leftAdvertisement.price) - Number(rightAdvertisement.price)
            case "Più grandi":
                return rightAdvertisement.realEstate.size - leftAdvertisement.realEstate.size
            case "Meno grandi":
                return leftAdvertisement.realEstate.size - rightAdvertisement.realEstate.size
            case "Più lontani":
                return getDistanceFromReference(rightAdvertisement) - getDistanceFromReference(leftAdvertisement)
            case "Più recenti":
                return getAdvertisementOrderValue(rightAdvertisement, advertisements.indexOf(rightAdvertisement))
                    - getAdvertisementOrderValue(leftAdvertisement, advertisements.indexOf(leftAdvertisement))
            case "Meno recenti":
                return getAdvertisementOrderValue(leftAdvertisement, advertisements.indexOf(leftAdvertisement))
                    - getAdvertisementOrderValue(rightAdvertisement, advertisements.indexOf(rightAdvertisement))
            case "Più vicini":
            default:
                return getDistanceFromReference(leftAdvertisement) - getDistanceFromReference(rightAdvertisement)
        }
    })
}

export const Homepage = () => {
    const { advertisements, isLoading, error } = useAdvertisements()
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
    const [isMobileMapOpen, setIsMobileMapOpen] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState<FilterOption>(defaultFilter)

    const sortedAdvertisements = sortAdvertisements(advertisements, selectedFilter)

    const hasError = Boolean(error)
    const isEmpty = !isLoading && !hasError && sortedAdvertisements.length === 0
    const hasResults = !isLoading && !hasError && sortedAdvertisements.length > 0

    return (
        <div className="flex flex-col min-h-screen max-h-screen h-full">

            <Header
                isHomepage
                left={
                    <>
                        {/* Mobile: menu button */}
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="xl:hidden"
                            aria-label="Apri filtri"
                            onClick={() => {
                                setIsMobileMapOpen(false)
                                setIsMobileSidebarOpen(true)
                            }}
                        >
                            <SlidersHorizontal />
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="xl:hidden"
                            aria-label="Apri mappa"
                            onClick={() => {
                                setIsMobileSidebarOpen(false)
                                setIsMobileMapOpen(true)
                            }}
                        >
                            <Map />
                        </Button>

                        {/* Desktop: brand button */}
                        <Label className="hidden xl:flex text-xl">
                            DietiEstates
                        </Label>
                    </>
                }
                center={
                    <Field>
                        <ButtonGroup>
                            <Input id="input-button-group" placeholder="Cerca..." />
                            <Button variant="outline">
                                <Search />
                            </Button>
                        </ButtonGroup>
                    </Field>
                }
                right={
                    <>
                        <ModeToggle />
                        <AccountBadge />
                    </>
                }
            />

            <MobileSidebar open={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />
            <MobileMapSidebar
                open={isMobileMapOpen}
                onClose={() => setIsMobileMapOpen(false)}
                advertisements={sortedAdvertisements}
            />

            {/* Main */}
            <main className="flex min-h-0 h-full flex-1 overflow-hidden">
                {/* Desktop sidebar */}
                <div className="hidden xl:block">
                    <SidebarFilter />
                </div>

                <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden p-2 sm:border-l">
                    {isLoading && <AdvertisementListSkeleton />}

                    {hasError && (
                        <p className="text-sm text-destructive" role="alert">
                            {error}
                        </p>
                    )}

                    {isEmpty && (
                        <p className="text-sm text-muted-foreground">Nessun annuncio disponibile.</p>
                    )}

                    {hasResults && (
                        <div className="flex items-center justify-between">
                            <div className="flex w-full items-center text-start text-foreground">
                                Numero di annunci trovati: {sortedAdvertisements.length}
                            </div>
                            <FilterCombobox value={selectedFilter} onValueChange={setSelectedFilter} />
                        </div>
                    )}

                    {hasResults && (
                        <div className="min-h-0 flex-1 overflow-y-auto pr-1 overflow-x-hidden">
                            <AdvertisementsList advertisements={sortedAdvertisements} />
                        </div>
                    )}
                </div>

                {/* Desktop map sidebar */}
                <div className="hidden xl:block h-full flex-1 bg-background">
                    <RealEstateMap advertisements={sortedAdvertisements} />
                </div>
            </main>

            <Footer isHomepage />
        </div>
    )
}

export default Homepage