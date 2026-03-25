import type { Advertisement } from "@/types/types"
import AdvertisementsList from "./advertisementList"
import CardAdvertisementSkeleton from "./cardAdvertisementSkeleton"

type AdvertisementTabPanelProps = {
    advertisements: Advertisement[]
    isLoading: boolean
    error: string | null
    onDelete: (id: number) => Promise<void>
}

export default function AdvertisementsPanel({ advertisements, isLoading, error, onDelete }: AdvertisementTabPanelProps) {
    return (
        <div className="flex flex-col gap-2">
            {isLoading && (
                <>
                    <CardAdvertisementSkeleton />
                    <CardAdvertisementSkeleton />
                    <CardAdvertisementSkeleton />
                </>
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
                    <AdvertisementsList
                        advertisements={advertisements}
                        onDelete={onDelete}
                    />
                </div>
            )}
        </div>
    )
}