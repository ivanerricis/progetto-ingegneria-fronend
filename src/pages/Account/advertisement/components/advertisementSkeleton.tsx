import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export const AdvertisementSkeleton = () => {
    return (
        <div className="flex w-full flex-col gap-2 sm:h-full sm:min-h-0 sm:flex-row 2xl:px-50">
            <div className="flex flex-1 flex-col gap-4 sm:min-h-0 sm:overflow-y-auto sm:pr-2">
                <div className="flex w-full rounded-md border aspect-video sm:min-h-100 max-h-120 overflow-hidden">
                    <Skeleton className="h-full w-full rounded-none" />
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex w-full flex-col gap-2">
                        <Skeleton className="h-8 w-full max-w-lg" />
                        <Skeleton className="h-6 w-full max-w-md" />
                    </div>
                    <Skeleton className="h-8 w-32" />
                </div>

                <Separator orientation="horizontal" className="shrink-0" />

                <div className="flex flex-col gap-2">
                    <Skeleton className="h-7 w-40" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-11/12" />
                    <Skeleton className="h-5 w-10/12" />
                </div>

                <Separator orientation="horizontal" className="shrink-0" />

                <div className="flex flex-col gap-2">
                    <Skeleton className="h-7 w-44" />
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <Skeleton key={index} className="h-10 w-full" />
                        ))}
                    </div>
                </div>

                <Separator orientation="horizontal" className="shrink-0" />

                <div className="flex flex-col gap-2">
                    <Skeleton className="h-7 w-32" />
                    <Skeleton className="h-100 w-full rounded-md" />
                </div>
            </div>

            <div className="flex h-fit shrink-0 flex-col gap-3 rounded-md border p-6 sm:sticky sm:self-start sm:w-90">
                <Skeleton className="h-8 w-56" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />

                <Separator className="mt-2" />

                <div className="flex flex-col gap-2">
                    <Skeleton className="h-5 w-48" />
                    <Skeleton className="h-5 w-56" />
                </div>

                <Separator />

                <div className="flex flex-col gap-2">
                    <Skeleton className="h-5 w-44" />
                    <Skeleton className="h-5 w-64" />
                    <Skeleton className="h-5 w-52" />
                    <Skeleton className="h-10 w-40" />
                </div>
            </div>
        </div>
    )
}
