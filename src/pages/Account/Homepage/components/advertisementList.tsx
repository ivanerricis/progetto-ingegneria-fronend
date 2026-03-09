import type { Advertisement } from "@/types/types"
import CardRealEstate from "./cardRealEstate"

type Props = {
    advertisements: Advertisement[]
}

export default function AdvertisementsList({ advertisements }: Props) {
    return (
        <div className="flex flex-col gap-2">
            {advertisements.map((advertisement, index) => {
                const hasValidId =
                    advertisement.id !== undefined &&
                    advertisement.id !== null

                const fallbackKey = `${advertisement.title}-${advertisement.realEstate.id}-${index}`
                const key = hasValidId ? String(advertisement.id) : fallbackKey

                return (
                    <CardRealEstate
                        key={key}
                        advertisement={advertisement}
                    />
                )
            })}
        </div>
    )
}