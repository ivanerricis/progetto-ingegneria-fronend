import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Map, SlidersHorizontal } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import Header from "@/components/header"
import SidebarFilter from "./components/sidebarFilter"
import { Footer } from "@/components/footer"
import AdvertisementsList from "./components/advertisementList"
import useAdvertisements from "@/hooks/account/useAdvertisements"
import AdvertisementListSkeleton from "./components/advertisementListSkeleton"
import { AccountBadge } from "@/pages/Account/homepage/components/accountBadge"
import MobileSidebar from "./components/mobileSidebar"
import MobileMapSidebar from "./components/mobileMapSidebar"
import { RealEstateMap } from "@/components/map/realEstateMap"
import { PaginationAdvertisements } from "./components/paginationAdvertisements"
import { CitySearchInput } from "./components/citySearchInput"
import { useHomepageSearch } from "@/hooks/account/useHomepageSearch"

export const Homepage = () => {
    const { advertisements, isLoading, error } = useAdvertisements()
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
    const [isMobileMapOpen, setIsMobileMapOpen] = useState(false)
    const { city, setCity } = useHomepageSearch()

    const hasError = Boolean(error)
    const isEmpty = !isLoading && !hasError && advertisements.length === 0
    const hasResults = !isLoading && !hasError && advertisements.length > 0

    return (
        <div className="flex min-h-screen flex-col xl:h-full xl:max-h-screen">

            <Header
                isHomepage
                left={
                    <>
                        <Button
                            type="button"
                            variant="outline"
                            size="icon-lg"
                            className="xl:hidden"
                            aria-label="Apri filtri"
                            onClick={() => {
                                setIsMobileMapOpen(false)
                                setIsMobileSidebarOpen(true)
                            }}
                        >
                            <SlidersHorizontal className="size-6" />
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            size="icon-lg"
                            className="xl:hidden"
                            aria-label="Apri mappa"
                            onClick={() => {
                                setIsMobileSidebarOpen(false)
                                setIsMobileMapOpen(true)
                            }}
                        >
                            <Map className="size-6" />
                        </Button>

                        <img
                            src="LogoIntero.ico"
                            alt="DietiEstates Logo"
                            className="hidden sm:block w-14 h-10 object-center"
                        />
                    </>
                }
                center={
                    <CitySearchInput
                        value={city}
                        onCitySelect={setCity}
                        placeholder="Cerca città..."
                    />
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
                advertisements={advertisements}
            />

            <main className="flex flex-1 xl:min-h-0 xl:h-full xl:overflow-hidden bg-sidebar">
                <div className="hidden xl:block">
                    <SidebarFilter />
                </div>

                <div className="flex flex-1 flex-col gap-2 sm:border-l xl:min-h-0 xl:overflow-hidden">
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
                            <div className="flex w-full items-center text-start text-foreground p-2 pb-0">
                                Risultati della ricerca: {advertisements.length}
                            </div>
                        </div>
                    )}

                    {hasResults && (
                        <>
                            <div className="overflow-x-hidden pr-1 xl:min-h-0 xl:flex-1 p-2 xl:overflow-y-auto">
                                <AdvertisementsList advertisements={advertisements} />
                            </div>
                            <PaginationAdvertisements />
                        </>
                    )}
                </div>

                <div className="hidden xl:block h-full flex-1 bg-background">
                    <RealEstateMap advertisements={advertisements} />
                </div>
            </main>
            <Footer isHomepage />
        </div>
    )
}

export default Homepage