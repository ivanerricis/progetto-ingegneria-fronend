import { Computer, Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/providers/theme-provider"

export function ModeToggle() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="z-400">
                <DropdownMenuItem className="group/sun flex items-center justify-start text-md" onClick={() => setTheme("light")}>
                    <Sun className="text-foreground group-hover/sun:text-background dark:group-hover/sun:text-foreground size-5"/>
                    Chiaro
                </DropdownMenuItem>
                <DropdownMenuItem className="group/moon flex items-center justify-start text-md" onClick={() => setTheme("dark")}>
                    <Moon className="text-foreground group-hover/moon:text-background dark:group-hover/moon:text-foreground size-5"/>
                    Scuro
                </DropdownMenuItem>
                <DropdownMenuItem className="group/computer flex items-center justify-start text-md" onClick={() => setTheme("system")}>
                    <Computer className="text-foreground group-hover/computer:text-background dark:group-hover/computer:text-foreground size-5"/>
                    Sistema
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}