import Header from "@/components/header";
import { ModeToggle } from "@/components/mode-toggle";
import useAdvertisement from "@/hooks/useAdvertisement";
import { useParams } from "react-router-dom";
import { AccountBadge } from "@/pages/Account/homepage/components/accountBadge";
import { Footer } from "@/components/footer";
import RealEstateCarousel from "@/pages/components/realEstateCarousel";
import type { ReactNode } from "react"
import { ContactCard } from "@/pages/Account/advertisement/components/contactCard";
import { Separator } from "@/components/ui/separator";
import { AdvertisementSkeleton } from "@/pages/Account/advertisement/components/advertisementSkeleton";
import ButtonBack from "@/components/buttonBack";

import AdvertisementDescription from "@/pages/components/advertisementDescription";
import AdvertisementFeatures from "@/pages/components/advertisementFeatures";
import AdvertisementPois from "@/pages/components/advertisementPois";
import AdvertisementLocation from "@/pages/components/advertisementLocation";
import AdvertisementInfo from "@/pages/components/advertisementInfo";

const Advertisement = () => {
    const { id } = useParams()
    const { advertisement, isLoading, error } = useAdvertisement("account", id)

    const renderPage = (content: ReactNode) => (
        <div className="flex h-screen flex-col overflow-hidden">
            <Header
                isHomepage
                left={
                    <ButtonBack />
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

    return (
        renderPage(
            <div className="flex w-full flex-col gap-2 sm:h-full sm:min-h-0 sm:flex-row 2xl:px-60 sm:overflow-y-auto">
                <div className="flex flex-1 flex-col gap-4 sm:min-h-0 sm:pr-2">
                    <div className="flex w-full border rounded-md aspect-video sm:min-h-120 max-h-140">
                        <RealEstateCarousel photos={advertisement.photos} variant="standalone" />
                    </div>

                    <AdvertisementInfo advertisement={advertisement} />
                    <Separator orientation="horizontal" className="shrink-0" />

                    <AdvertisementDescription description={advertisement.description} />
                    <Separator orientation="horizontal" className="shrink-0" />

                    <AdvertisementFeatures realEstate={advertisement.realEstate} />
                    <Separator orientation="horizontal" className="shrink-0" />

                    <AdvertisementPois pois={advertisement.pois} />
                    <Separator orientation="horizontal" className="shrink-0" />

                    <AdvertisementLocation advertisement={advertisement} pois={advertisement.pois} />
                </div>
                <ContactCard advertisement={advertisement} />
            </div>
        )
    );
}

export default Advertisement;