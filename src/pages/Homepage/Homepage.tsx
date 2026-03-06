import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import CardRealEstate from "@/pages/Homepage/components/cardRealEstate"
import { ModeToggle } from "@/components/mode-toggle"
import type { Advertisement } from "types/types"

const extractAdvertisementsFromResponse = (responseBody: unknown): Advertisement[] => {
    console.log("Raw API response:", responseBody)
    if (Array.isArray(responseBody)) {
        return responseBody as Advertisement[]
    }

    if (!responseBody || typeof responseBody !== "object") {
        return []
    }

    const payload = responseBody as Record<string, unknown>
    const candidateKeys = ["advertisements", "items", "results", "data"]

    for (const key of candidateKeys) {
        if (Array.isArray(payload[key])) {
            return payload[key] as Advertisement[]
        }
    }

    return []
}

export const Homepage = () => {
    const [advertisements, setAdvertisements] = useState<Advertisement[]>([])
    const [isLoadingAdvertisements, setIsLoadingAdvertisements] = useState(true)
    const [loadError, setLoadError] = useState<string | null>(null)

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? ""

    useEffect(() => {
        let isMounted = true

        const fetchAdvertisements = async () => {
            setLoadError(null)

            try {
                const response = await fetch(`${apiBaseUrl}/account/advertisements`, {
                    method: "GET",
                    credentials: "include",
                })

                if (!response.ok) {
                    throw new Error("Impossibile caricare gli annunci")
                }

                const responseBody = await response.json().catch(() => null)

                if (!isMounted) {
                    return
                }

                const rawAdvertisements = extractAdvertisementsFromResponse(responseBody)

                setAdvertisements(rawAdvertisements)
            } catch (error) {
                if (!isMounted) {
                    return
                }

                const message = error instanceof Error ? error.message : "Errore durante il caricamento degli annunci"
                setLoadError(message)
            } finally {
                if (isMounted) {
                    setIsLoadingAdvertisements(false)
                }
            }
        }

        void fetchAdvertisements()

        return () => {
            isMounted = false
        }
    }, [apiBaseUrl])

    return (
        <div className="flex flex-col min-h-screen max-h-screen">
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
                <div className="flex justify-end flex-1 items-center gap-2">
                    <ModeToggle />
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
            </header>
            <main className="flex flex-col grow gap-2 overflow-y-hidden">
                <div className="flex flex-col p-2 gap-2 overflow-y-scroll">
                    {isLoadingAdvertisements && (
                        <p className="text-sm text-muted-foreground">Caricamento annunci in corso...</p>
                    )}

                    {loadError && (
                        <p className="text-sm text-destructive" role="alert">
                            {loadError}
                        </p>
                    )}

                    {!isLoadingAdvertisements && !loadError && advertisements.length === 0 && (
                        <p className="text-sm text-muted-foreground">Nessun annuncio disponibile.</p>
                    )}

                    {advertisements.map((advertisement, index) => {
                        const name = advertisement.name ?? advertisement.title ?? advertisement.description ?? ""
                        const agencyName =
                            advertisement.agencyName
                            ?? advertisement.agency
                            ?? advertisement.agencyAccountName
                            ?? ""
                        const price =
                            advertisement.price
                            ?? advertisement.amount
                            ?? advertisement.listingPrice
                            ?? advertisement.priceEuro
                            ?? ""
                        const key = advertisement.id ?? advertisement.advertisementId ?? `${name}-${index}`

                        return (
                            <CardRealEstate
                                key={String(key)}
                                name={String(name)}
                                agencyName={String(agencyName)}
                                price={String(price)}
                            />
                        )
                    })}
                </div>
            </main>
            <footer className="h-10 border-t-2">
            </footer>
        </div>
    )
}

export default Homepage