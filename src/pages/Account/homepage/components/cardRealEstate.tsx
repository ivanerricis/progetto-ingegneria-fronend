import { Button } from "@/components/ui/button"
import { Bath, CalendarDays, HandCoins } from "lucide-react"
import type { Advertisement } from "@/types/types"
import RealEstateCarousel from "@/pages/Account/homepage/components/realEstateCarousel"
import { formatPrice } from "@/utils/formatPrice"
import FloorPlanIcon from "@/assets/icons/floorplan.svg?react"
import ExpandIcon from "@/assets/icons/expand-2.svg?react"
import StairsIcon from "@/assets/icons/stairs.svg?react"
import { useNavigate } from "react-router-dom"
import type { MouseEvent } from "react"

type CardRealEstateProps = {
    advertisement: Advertisement
}

export const CardRealEstate = ({ advertisement }: CardRealEstateProps) => {
    const navigate = useNavigate()
    const addressLabel = advertisement.realEstate?.addressFormatted?.trim()
        || "not found"

    const agencyLabel = advertisement.agent.agency.name.trim() || "not found"

    const handleCardClick = () => {
        const routeId = advertisement.id
        navigate(`/account/advertisement/${String(routeId)}`)
    }

    const handleActionButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
    }

    return (
        <div
            onClick={handleCardClick}
            className="relative bg-background border w-full h-fit flex flex-col 2xl:flex-row rounded-md shadow-md hover:cursor-pointer hover:bg-secondary dark:text-foreground"
        >

            <div className="absolute z-20 top-2 left-2 bg-primary text-sm text-primary-foreground px-2 py-1 rounded-sm">
                {advertisement.type === "sale" ? "Vendita" : "Affitto"}
            </div>

            {/* Carousel */}
            <div className="flex w-full sm:w-80 h-full sm:h-60 min-w-60 min-h-60">
                <RealEstateCarousel photos={advertisement.photos} />
            </div>

            {/* Informazioni immobile */}
            <div
                className="flex flex-col flex-1 gap-2 p-2 justify-between border-t sm:border-t-0 sm:border-b-0 sm:border-l">

                {/* Informazioni generali */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-col justify-start w-full text-bold text-xl">
                        {addressLabel}
                    </div>
                    {advertisement.agent.agency.logo === null || advertisement.agent.agency.logo === undefined ?
                        (<div className="hidden sm:flex sm:items-center sm:rounded-sm sm:h-full sm:p-2 sm:text-nowrap sm:text-primary bg-primary/25">
                            {agencyLabel}
                        </div>)
                        :
                        (
                            <div className="hidden sm:flex sm:items-center sm:rounded-sm sm:h-full">
                                <img
                                    src={advertisement.agent.agency.logo.url}
                                    alt="Immagine immobile"
                                    className="block object-cover h-10 w-auto rounded-sm aspect-video"
                                    loading="lazy"
                                />
                            </div>
                        )
                    }

                </div>

                <div className="hidden text-muted-foreground sm:block w-full line-clamp-3">
                    {advertisement.description}
                </div>

                {/* Icons */}
                <div className="hidden sm:flex w-full flex-start items-center gap-2 text-primary">
                    <div className="flex items-center justify-center rounded-sm h-fit text-nowrap gap-2 bg-primary/20 text-primary p-2 border">
                        <FloorPlanIcon className="size-6" />
                        {advertisement.realEstate.rooms + " locali"}
                    </div>
                    <div className="flex items-center justify-center rounded-sm h-fit text-nowrap gap-2 bg-primary/20 text-primary p-2 border">
                        <ExpandIcon className="size-7" />
                        {advertisement.realEstate.size + " m²"}
                    </div>
                    <div className="flex items-center justify-center rounded-sm h-fit text-nowrap gap-2 bg-primary/20 text-primary p-2 border">
                        <Bath />
                        {advertisement.realEstate.bathrooms + " bagni"}
                    </div>
                    <div className="flex items-center justify-center rounded-sm h-fit text-nowrap gap-2 bg-primary/20 text-primary p-2 border">
                        <StairsIcon className="size-6" />
                        {advertisement.realEstate.floor === 0
                            ? "Piano terra"
                            : advertisement.realEstate.floor + " piano"}
                    </div>
                </div>

                {/* Prezzo + Buttons */}
                <div className="flex flex-col items-start justify-start gap-2 sm:flex-row sm:justify-between">
                    <div className="flex h-full items-center justify-start border-2 border-primary text-primary text-2xl text-bold rounded-sm px-2">
                        {formatPrice(advertisement.price)}
                    </div>

                    {/* Buttons */}
                    <div className="flex w-full justify-between sm:justify-end gap-1">
                        <Button
                            variant={"outline"}
                            className="flex-1 rounded-sm sm:w-fit sm:flex-none"
                            onClick={handleActionButtonClick}
                        >
                            Offerta
                            <HandCoins />
                        </Button>
                        <Button
                            variant={"outline"}
                            className="flex-1 rounded-sm sm:w-fit sm:flex-none"
                            onClick={handleActionButtonClick}
                        >
                            Appuntamento
                            <CalendarDays />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardRealEstate