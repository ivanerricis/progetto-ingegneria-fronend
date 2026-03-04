import { Button } from "@/components/ui/button"

export const Footer = () => {
    return (
        <div className="w-full h-10 border-t justify-between items-center px-26 gap-1 flex" >
            <div>
                <span className="text-foreground">
                    © 2026 DietiEstates. All rights reserved.
                </span>
            </div>
            <div className="flex gap-2">
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