import type { Advertisement } from "@/types/types"
import AdvertisementsList from "./advertisementList"
import CardAdvertisementSkeleton from "./cardAdvertisementSkeleton"

type AdvertisementTabPanelProps = Readonly<{
    advertisements: Advertisement[]
    isLoading: boolean
    error: string | null
    onDelete: (id: number) => Promise<void>
}>

export default function AdvertisementsPanel({ advertisements, isLoading, error, onDelete }: AdvertisementTabPanelProps) {
    return (
        <div className="flex flex-col gap-2">
            {isLoading && (
                <div className="flex flex-col sm:flex-row gap-2">
                    <CardAdvertisementSkeleton />
                    <CardAdvertisementSkeleton />
                    <CardAdvertisementSkeleton />
                    <CardAdvertisementSkeleton />
                </div>
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