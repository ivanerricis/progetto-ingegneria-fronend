import { Button } from "@/components/ui/button"
import { CalendarDays, HandCoins } from "lucide-react"
import type { Advertisement } from "@/types/types"
import RealEstateCarousel from "@/pages/Account/Homepage/components/realEstateCarousel"
import { formatPrice } from "@/utils/formatPrice"
import FloorPlanIcon from "@/assets/icons/floorplan.svg"
import ExpandIcon from "@/assets/icons/expand.svg"
import { useNavigate } from "react-router-dom"

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
        console.log(advertisement)
    }

    return (
        <div
            className="border w-full h-fit flex flex-col sm:flex-row rounded-md shadow-md hover:cursor-pointer hover:bg-secondary dark:text-foreground"
        >

            {/* Carousel */}
            <div className="flex w-full sm:w-72 h-full sm:h-60 min-w-60 min-h-60">
                <RealEstateCarousel photos={advertisement.photos} />
            </div>

            {/* Informazioni immobile */}
            <div
                onClick={handleCardClick}
                className="flex flex-col flex-1 gap-2 p-2 justify-between border-t sm:border-t-0 sm:border-b-0 sm:border-l">

                {/* Informazioni generali */}
                <div className="flex items-center justify-between">
                    <div className="flex flex-col justify-start w-full text-bold text-xl">
                        {addressLabel}
                    </div>
                    <div className="hidden sm:flex rounded-sm h-fit p-2 text-nowrap text-primary bg-primary/25">
                        {agencyLabel}
                    </div>
                </div>

                <div className="hidden sm:flex h-full w-full overflow-hidden line-clamp-3 text-ellipsis">
                    {advertisement.description}
                </div>

                <div className="flex h-full w-full flex-start items-center gap-2">
                    <div className="flex items-center justify-center rounded-sm h-fit text-nowrap gap-2">
                        <img src={FloorPlanIcon} alt="floor plan icon" className="size-6" />
                        {advertisement.realEstate.rooms + " locali"}
                    </div>
                    <div className="flex items-center justify-center rounded-sm h-fit text-nowrap gap-2">
                        <img src={ExpandIcon} alt="expand icon" className="size-6" />
                        {advertisement.realEstate.size + " m²"}
                    </div>
                </div>

                {/* Prezzo + Buttons */}
                <div className="flex flex-col items-start justify-start gap-2 sm:flex-row sm:justify-between">
                    <div className="flex h-full items-center justify-start bg-primary/25 text-primary text-2xl rounded-md px-2">
                        {formatPrice(advertisement.price)}
                    </div>

                    {/* Buttons */}
                    <div className="flex w-full justify-between sm:justify-end gap-1">
                        <Button variant={"outline"} className="border-accent text-accent sm:w-fit">
                            Offerta
                            <HandCoins />
                        </Button>
                        <Button variant={"outline"} className="border-accent text-accent sm:w-fit">
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