import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export const Homepage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="flex flex-row items-center justify-between p-2 border-b-2">
                <div className="flex justify-start flex-1">
                    DietiEstates
                </div>
                <div className="flex justify-center flex-1">
                    <Field orientation="horizontal">
                        <Input type="search" placeholder="Cerca..." />
                        <Button variant={"outline"} size={"icon"}>
                            <Search />
                        </Button>
                    </Field>
                </div>
                <div className="flex justify-end flex-1">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </header>
            <main className="grow">
            </main>
            <footer className="h-4 border-t-2">
            </footer>
        </div>
    )
}

export default Homepage