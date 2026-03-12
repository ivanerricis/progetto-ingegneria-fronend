import AdvertisementListSkeleton from "@/pages/Account/homepage/components/advertisementListSkeleton"
import type { Advertisement } from "@/types/types"
import AdvertisementsList from "./advertisementList"

type AdvertisementTabPanelProps = {
    advertisements: Advertisement[]
    isLoading: boolean
    error: string | null
}

export default function AdvertisementsPanel({ advertisements, isLoading, error }: AdvertisementTabPanelProps) {
    return (
        <div className="flex flex-col gap-2">
            {isLoading && (
                <AdvertisementListSkeleton />
            )}

            {error && (
                <p className="text-sm text-destructive" role="alert">
                    {error}
                </p>
            )}

            {!isLoading && !error && advertisements.length === 0 && (
                <p className="text-sm text-muted-foreground">Nessun annuncio disponibile.</p>
            )}

            {!isLoading && !error && advertisements.length > 0 && (
                <div className="pr-1">
                    <AdvertisementsList advertisements={advertisements} />
                </div>
            )}
        </div>
    )
}