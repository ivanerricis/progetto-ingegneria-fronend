import { useEffect, useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import CardRealEstate from "@/pages/Account/Homepage/components/cardRealEstate"
import { ModeToggle } from "@/components/mode-toggle"
import type { Advertisement } from "@/types/types"
import Header from "@/components/header"
import FilterCombobox from "@/pages/Account/Homepage/components/filterCombobox"

type AdvertisementsResponse = {
    items: Advertisement[]
}

export const Homepage = () => {
    const [advertisements, setAdvertisements] = useState<Advertisement[]>([])
    const [isLoadingAdvertisements, setIsLoadingAdvertisements] = useState(true)
    const [loadError, setLoadError] = useState<string | null>(null)

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? ""

    useEffect(() => {
        const abortController = new AbortController()

        const fetchAdvertisements = async () => {
            setLoadError(null)
            setIsLoadingAdvertisements(true)

            try {
                const response = await fetch(`${apiBaseUrl}/account/advertisements`, {
                    method: "GET",
                    credentials: "include",
                    signal: abortController.signal,
                })

                if (!response.ok) {
                    throw new Error("Impossibile caricare gli annunci")
                }

                const responseBody = await response.json() as AdvertisementsResponse

                setAdvertisements(responseBody.items)
            } catch (error) {
                if (error instanceof DOMException && error.name === "AbortError") {
                    return
                }

                const message = error instanceof Error ? error.message : "Errore durante il caricamento degli annunci"
                setLoadError(message)
            } finally {
                setIsLoadingAdvertisements(false)
            }
        }

        void fetchAdvertisements()

        return () => {
            abortController.abort()
        }
    }, [apiBaseUrl])

    return (
        <div className="flex flex-col min-h-screen max-h-screen">

            <Header
                isHomepage
                left={
                    <>
                        <Button variant={"outline"}>
                            DietiEstates
                        </Button>
                    </>
                }
                center={
                    <Field orientation="horizontal">
                        <Input type="search" placeholder="Cerca..." />
                        <Button variant={"outline"} size={"icon"}>
                            <Search />
                        </Button>
                    </Field>
                }
                right={
                    <>
                        <ModeToggle />
                        <Avatar>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </>
                }
            />

            {/* Main */}
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

                    {advertisements.length !== 0 && (
                        <div className="flex items-center justify-between">
                            <div className="flex w-full text-foreground items-center text-start">
                                Numero di annunci trovati: {advertisements.length}
                            </div>
                            <FilterCombobox />
                        </div>
                    )}

                    {advertisements.map((advertisement, index) => {
                        const key = advertisement.advertisementId ?? `${index}`

                        return (
                            <CardRealEstate
                                key={String(key)}
                                advertisement={advertisement}
                            />
                        )
                    })}
                </div>
            </main>

            {/* Footer */}
            <footer className="h-10 border-t-2">
            </footer>
        </div>
    )
}

export default Homepage