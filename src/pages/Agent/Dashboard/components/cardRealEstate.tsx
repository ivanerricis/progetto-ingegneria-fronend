import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"
import type { Advertisement } from "@/types/types"
import RealEstateCarousel from "@/pages/Agent/Dashboard/components/realEstateCarousel"
import { formatPrice } from "@/utils/formatPrice"
import { useNavigate } from "react-router-dom"

type CardRealEstateProps = {
    advertisement: Advertisement
}

export const CardRealEstate = ({ advertisement }: CardRealEstateProps) => {
    const navigate = useNavigate()
    const addressLabel = advertisement.realEstate?.addressFormatted?.trim()
        || "not found"

    const handleCardClick = () => {
        const routeId = advertisement.id
        navigate(`/agent/advertisement/${String(routeId)}`)
        console.log(advertisement)
    }

    return (
        <div
            className="border w-full h-fit flex flex-col rounded-sm shadow-md hover:cursor-pointer hover:bg-secondary dark:text-foreground"
        >

            {/* Carousel */}
            <div className="flex w-full h-full sm:h-60 min-w-60 min-h-60">
                <RealEstateCarousel photos={advertisement.photos} />
            </div>

            {/* Informazioni immobile */}
            <div
                onClick={handleCardClick}
                className="flex flex-col flex-1 gap-2 p-2 justify-between border-t">

                {/* Informazioni generali */}
                <div className="flex flex-col justify-start w-full text-bold">
                    {addressLabel}
                </div>

                {/* Prezzo + Buttons */}
                <div className="flex items-center justify-between gap-2">
                    <div className="flex h-full items-center justify-start bg-primary/25 text-primary text-2xl rounded-sm px-2">
                        {formatPrice(advertisement.price)}
                    </div>

                    {/* Buttons */}
                    <div className="flex w-full justify-end gap-1">
                        <Button variant={"outline"} size={"icon"} className="rounded-sm">
                            <Pencil />
                        </Button>
                        <Button variant={"destructive"} size={"icon"} className="rounded-sm">
                            <Trash />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardRealEstate