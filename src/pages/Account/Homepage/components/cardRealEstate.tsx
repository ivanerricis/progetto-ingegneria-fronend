import { Button } from "@/components/ui/button"
import { CalendarDays, HandCoins } from "lucide-react"
import type { Advertisement } from "@/types/types"
import RealEstateCarousel from "@/pages/Account/Homepage/components/realEstateCarousel"
import { formatPrice } from "@/utils/formatPrice"

type CardRealEstateProps = {
    advertisement: Advertisement
}

export const CardRealEstate = ({ advertisement }: CardRealEstateProps) => {
    const addressLabel = advertisement.realEstate?.addressInput?.trim()
        || advertisement.realEstate?.addressFormatted?.trim()
        || "not found"

    const agencyLabel = advertisement.agencyName?.trim() || "not found"

    return (
        <div className="border w-full h-full flex rounded-md hover:shadow hover:cursor-pointer hover:bg-secondary">

            {/* Parte sinistra */}
            <div className="flex w-72 h-60 min-w-60 min-h-60">
                <RealEstateCarousel photos={advertisement.photos} />
            </div>

            {/* Parte destra */}
            <div className="flex flex-col flex-1 p-2 justify-between border-l">

                {/* Parte superiore */}
                <div className="flex h-1/2">
                    <div className="flex flex-col justify-start w-full text-bold text-xl dark:text-foreground">
                        {addressLabel}
                    </div>
                    <div className="rounded-sm h-fit p-2 bg-accent text-nowrap dark:text-foreground">
                        {agencyLabel}
                    </div>
                </div>

                {/* Parte inferiore */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center justify-start dark:text-foreground text-bold text-2xl bg-accent rounded-md px-2 py-1">
                        {formatPrice(advertisement.price)}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-1">
                        <Button variant={"outline"}>
                            Offerta
                            <HandCoins />
                        </Button>
                        <Button variant={"outline"}>
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