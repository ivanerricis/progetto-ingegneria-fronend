import { Button } from "@/components/ui/button"

export const Footer = () => {
    return (
        <div className="flex w-full flex-col items-center gap-2 border-t px-3 py-2 sm:h-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-26">
            <div>
                <span className="text-xs text-foreground sm:text-sm">
                    © 2026 DietiEstates. All rights reserved.
                </span>
            </div>
            <div className="flex flex-wrap gap-1 sm:gap-2">
                <Button variant={"link"} size={"sm"}>
                    Privacy Policy
                </Button>
                <Button variant={"link"} size={"sm"}>
                    Terms of Service
                </Button>
                <Button variant={"link"} size={"sm"}>
                    Contact Us
                </Button>
            </div>
        </div>
    )
}