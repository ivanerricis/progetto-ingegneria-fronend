import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type HeaderMenuItem = {
    label: string
    onSelect: () => void
}

type HeaderProps = {
    left?: React.ReactNode
    right?: React.ReactNode
    center?: React.ReactNode
    isHomepage?: boolean
    mobileLeftMenuItems?: HeaderMenuItem[]
}

export const Header = ({
    left,
    right,
    center,
    isHomepage = false,
    mobileLeftMenuItems
}: HeaderProps) => {
    const horizontalPadding = isHomepage ? "px-2 sm:px-4 md:px-6" : "px-2 sm:px-6 sm:px-26"
    const hasMobileLeftMenu = Boolean(mobileLeftMenuItems && mobileLeftMenuItems.length > 0)

    return (
        <div className={`w-full border-b ${horizontalPadding} py-2 shadow-md`}>
            <div className="flex justify-between gap-2 sm:flex-row sm:items-center">
                <div className="flex flex-wrap items-center justify-start gap-1 sm:flex-1">
                    {hasMobileLeftMenu && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant={"outline"} className="sm:hidden">
                                    <Menu />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="sm:hidden">
                                {mobileLeftMenuItems?.map((item, index) => (
                                    <DropdownMenuItem key={`${item.label}-${index}`} onSelect={item.onSelect}>
                                        {item.label}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}

                    <div className={hasMobileLeftMenu ? "hidden sm:flex sm:flex-wrap sm:items-center sm:gap-1" : "flex flex-wrap items-center gap-1"}>
                        {left}
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-1 sm:flex-1">
                    {center}
                </div>
                <div className="flex flex-wrap items-center justify-start gap-1 sm:flex-1 sm:justify-end">
                    {right}
                </div>
            </div>
        </div>
    )
}

export default Header