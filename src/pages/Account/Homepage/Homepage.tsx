import { useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Menu, Search, X } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import Header from "@/components/header"
import FilterCombobox from "@/pages/Account/Homepage/components/filterCombobox"
import Loading from "@/pages/Loading/Loading"
import SidebarFilter from "./components/sidebarFilter"
import { Footer } from "@/components/footer"
import AdvertisementsList from "./components/advertisementList"
import useAdvertisements from "@/hooks/useAdvertisement"
import { API_BASE_URL } from "@/lib/api/config"
import { Label } from "@/components/ui/label"

export const Homepage = () => {
    const { advertisements, isLoading, error } = useAdvertisements(API_BASE_URL)
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

    return (
        <div className="flex flex-col min-h-screen max-h-screen h-full">

            <Header
                isHomepage
                left={
                    <>
                        {/* Mobile: menu button */}
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="sm:hidden"
                            aria-label="Apri filtri"
                            onClick={() => setIsMobileSidebarOpen(true)}
                        >
                            <Menu />
                        </Button>

                        {/* Desktop: brand button */}
                        <Label className="hidden sm:flex text-xl">
                            DietiEstates
                        </Label>
                    </>
                }
                center={
                    <Field orientation="horizontal">
                        <Input type="search" placeholder="Cerca..." />
                        <Button variant={"outline"} size={"icon"} className="hidden sm:flex">
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

            {/* Mobile sidebar backdrop */}
            {isMobileSidebarOpen && (
                <button
                    type="button"
                    aria-label="Chiudi filtri"
                    className="fixed inset-0 z-40 bg-black/40 sm:hidden"
                    onClick={() => setIsMobileSidebarOpen(false)}
                />
            )}

            {/* Mobile sidebar drawer */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r bg-background p-2 transition-transform duration-200 sm:hidden ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="mb-2 flex items-center justify-end">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        aria-label="Chiudi filtri"
                        onClick={() => setIsMobileSidebarOpen(false)}
                    >
                        <X />
                    </Button>
                </div>
                <SidebarFilter />
            </aside>

            {/* Main */}
            <main className="flex min-h-0 h-full flex-1 gap-2 overflow-hidden">
                {/* Desktop sidebar */}
                <div className="hidden sm:block">
                    <SidebarFilter />
                </div>

                <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-hidden p-2">
                    {isLoading && (
                        <div className="text-sm text-muted-foreground" role="status" aria-live="polite">
                            <Loading />
                        </div>
                    )}

                    {error && (
                        <p className="text-sm text-destructive" role="alert">
                            {error}
                        </p>
                    )}

                    {!isLoading && !error && advertisements.length === 0 && (
                        <p className="text-sm text-muted-foreground">Nessun annuncio disponibile.</p>
                    )}

                    {!isLoading && !error && advertisements.length !== 0 && (
                        <div className="flex items-center justify-between">
                            <div className="flex w-full items-center text-start text-foreground">
                                Numero di annunci trovati: {advertisements.length}
                            </div>
                            <FilterCombobox />
                        </div>
                    )}

                    <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                        <AdvertisementsList advertisements={advertisements} />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}

export default Homepage