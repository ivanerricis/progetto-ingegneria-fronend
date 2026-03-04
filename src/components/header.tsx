import { Earth } from "lucide-react"
import { Button } from "./ui/button"

export const Header = () => {
    return (
        <div className="h-12 w-full border-b flex justify-between items-center px-26 gap-2" >
            <div>
                <Button variant={"outline"} size={"sm"} >
                    Console per agenti
                </Button>
            </div>
            <div className="flex gap-1 items-center justify-between">
                <Button variant={"link"} size={"sm"}>
                    <Earth className="size-5" />
                    Italiano
                </Button>
            </div>
        </div>
    )
}

export default Header