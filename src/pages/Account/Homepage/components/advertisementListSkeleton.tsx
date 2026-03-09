import { Skeleton } from "@/components/ui/skeleton"

type AdvertisementListSkeletonProps = {
    items?: number
}

export default function AdvertisementListSkeleton({ items = 4 }: AdvertisementListSkeletonProps) {
    return (
        <div className="flex flex-col gap-2" role="status" aria-live="polite" aria-label="Caricamento annunci">
            {Array.from({ length: items }).map((_, index) => (
                <div key={index} className="w-full rounded-md border p-2">
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Skeleton className="h-60 w-full sm:w-72 sm:min-w-60" />
                        <div className="flex flex-1 flex-col gap-3">
                            <div className="flex items-start justify-between gap-2">
                                <Skeleton className="h-7 w-2/3" />
                                <Skeleton className="hidden h-8 w-24 sm:block" />
                            </div>
                            <Skeleton className="hidden h-16 w-full sm:block" />
                            <div className="flex gap-2">
                                <Skeleton className="h-6 w-28" />
                                <Skeleton className="h-6 w-24" />
                            </div>
                            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                                <Skeleton className="h-10 w-36" />
                                <div className="flex gap-1">
                                    <Skeleton className="h-10 w-28" />
                                    <Skeleton className="h-10 w-36" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
