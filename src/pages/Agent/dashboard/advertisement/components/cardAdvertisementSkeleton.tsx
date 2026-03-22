import { Skeleton } from "@/components/ui/skeleton"

export const CardAdvertisementSkeleton = () => (
  <div className="border-2 w-full h-fit flex flex-col rounded-sm shadow-md">
    {/* Carousel skeleton */}
    <div className="flex items-center justify-center">
      <Skeleton className="w-full h-60 rounded-t-xs rounded-b-none" />
    </div>
    {/* Informazioni immobile skeleton */}
    <div className="flex flex-col flex-1 gap-2 p-2 justify-between border-t">
      {/* Indirizzo */}
      <div className="flex flex-col justify-start w-full h-12">
        <Skeleton className="w-2/3 h-6" />
      </div>
      {/* Prezzo + Buttons */}
      <div className="flex items-center justify-between gap-2">
        <Skeleton className="h-8 w-30 rounded-sm" />
        <div className="flex w-full justify-end gap-1">
          <Skeleton className="h-10 w-10 rounded-sm" />
          <Skeleton className="h-10 w-10 rounded-sm" />
        </div>
      </div>
    </div>
  </div>
)

export default CardAdvertisementSkeleton;
