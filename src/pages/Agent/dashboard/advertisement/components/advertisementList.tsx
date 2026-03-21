import type { Advertisement } from "@/types/types"
import CardAdvertisement from "./cardAdvertisement"

type Props = {
    advertisements: Advertisement[]
    onDelete: (id: number) => Promise<void>
}

export default function AdvertisementsList({ advertisements, onDelete }: Props) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2">
            {advertisements.map((advertisement) => {

                return (
                    <CardAdvertisement
                        key={advertisement.id}
                        advertisement={advertisement}
                        onDelete={onDelete}
                    />
                )
            })}
        </div>
    )
}