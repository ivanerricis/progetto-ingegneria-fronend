import { Button } from "@/components/ui/button"
import { CalendarDays, EuroIcon, HandCoins } from "lucide-react"
import sfondo from "@/assets/sfondo.jpg"

type CardRealEstateProps = {
    name: string
    price: string
    agencyName: string
}

export const CardRealEstate = ({ name: name, price: price, agencyName: agencyName }: CardRealEstateProps) => {
    return (
        <div className="border w-full h-full flex rounded-md hover:shadow hover:cursor-pointer hover:bg-secondary">
            {/* Parte sinistra */}
            <div className="flex w-72 h-60 min-w-60 min-h-60">
                <img
                    src={sfondo}
                    alt="description"
                    className="object-cover rounded-l-md"
                />
            </div>

            {/* Parte destra */}
            <div className="flex flex-col flex-1 p-2 justify-between border-l">

                {/* Parte superiore */}
                <div className="flex h-1/2">
                    <div className="flex flex-col justify-start w-full text-bold text-xl dark:text-foreground">
                        {(name != "") ? name : "not found"}
                    </div>
                    <div className="rounded-sm h-fit p-2 bg-accent text-nowrap dark:text-foreground">
                        {(agencyName != "") ? agencyName : "not found"}
                    </div>
                </div>

                {/* Parte inferiore */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center justify-start dark:text-foreground text-bold text-2xl bg-accent rounded-md p-1">
                        {price}
                        <EuroIcon />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-1">
                        <Button variant={"outline"}>
                            Offerta
                            <HandCoins />
                        </Button>
                        <Button variant={"outline"}>
                            Appuntamento
                            <CalendarDays />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardRealEstate