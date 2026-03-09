import { Button } from "@/components/ui/button"

type FooterProps = {
    isHomepage?: boolean
}

export const Footer = ({ isHomepage }: FooterProps) => {
    const horizontalPadding = isHomepage ? "" : "sm:px-26"

    return (
        <div className={`flex w-full flex-col items-center gap-2 border-t ${horizontalPadding} py-2 lg:h-10 lg:flex-row lg:items-center lg:justify-between`}>
            <div className="flex flex-wrap gap-1 sm:gap-2">
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