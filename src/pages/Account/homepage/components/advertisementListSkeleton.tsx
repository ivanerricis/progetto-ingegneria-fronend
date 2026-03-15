import { Skeleton } from "@/components/ui/skeleton"

type AdvertisementListSkeletonProps = {
    items?: number
}

export default function AdvertisementListSkeleton({ items = 4 }: AdvertisementListSkeletonProps) {
    return (
        <div className="flex flex-col gap-2" role="status" aria-live="polite" aria-label="Caricamento annunci">
            {Array.from({ length: items }).map((_, index) => (
                <div key={index} className="w-full rounded-md border">
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Skeleton className="h-60 w-full sm:w-72 sm:min-w-60 rounded-b-none sm:rounded-r-none" />
                        <div className="flex w-full flex-col justify-between gap-3 p-2">
                            <div className="flex items-start justify-between gap-2">
                                <Skeleton className="h-full w-full" />
                                <Skeleton className="hidden h-8 w-24 sm:block" />
                            </div>
                            <Skeleton className="hidden h-16 w-full sm:block" />
                            <div className="flex gap-2">
                                <Skeleton className="h-6 w-28" />
                                <Skeleton className="h-6 w-24" />
                            </div>
                            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                                <div className="flex gap-1 w-full">
                                    <Skeleton className="h-10 w-1/2" />
                                    <Skeleton className="h-10 w-1/2" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
