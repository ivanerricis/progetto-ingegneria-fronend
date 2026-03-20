import { Skeleton } from "@/components/ui/skeleton";

export const CardAppointmentSkeleton = () => {
    return (
        <div className="flex flex-col w-full border rounded-sm divide-y *:flex *:items-center *:justify-start [&>*:not(:first-child)]:p-2 animate-pulse">
            {/* Preview Photo Skeleton */}
            <div className="flex items-center justify-center">
                <Skeleton className="w-full h-60 rounded-b-none" />
            </div>

            {/* Address Skeleton */}
            <div className="flex flex-col items-start! gap-2 w-full">
                <Skeleton className="w-32 h-7" />
                <Skeleton className="w-48 h-14" />
            </div>

            {/* DateTime Skeleton */}
            <div className="flex items-center gap-2 w-full">
                <Skeleton className="w-20 h-7" />
                <Skeleton className="w-24 h-7" />
            </div>

            {/* Account Skeleton */}
            <div className="flex items-center gap-2 w-full">
                <Skeleton className="w-20 h-7" />
                <Skeleton className="w-32 h-7" />
            </div>

            {/* Buttons Skeleton */}
            <div className="flex flex-col w-full h-full gap-2">
                <div className="flex gap-2 w-full">
                    <Skeleton className="h-10 flex-1" />
                    <Skeleton className="h-10 flex-1" />
                </div>
            </div>
        </div>
    );
};
