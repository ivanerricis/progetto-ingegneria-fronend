import { Button } from "@/components/ui/button"
import { RealEstateMap } from "@/components/map/realEstateMap"
import type { Advertisement } from "@/types/types"
import { X } from "lucide-react"

type Props = {
    open: boolean
    onClose: () => void
    advertisements: Advertisement[]
}

const MobileMapSidebar = ({ open, onClose, advertisements }: Props) => {
    return (
        <>
            {open && (
                <button
                    type="button"
                    aria-label="Chiudi mappa"
                    className="fixed inset-0 z-40 bg-black/40 sm:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm transform border-l bg-background p-2 transition-transform duration-200 sm:hidden
                    ${open ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="mb-2 flex items-center justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        aria-label="Chiudi mappa"
                        className="rounded-sm"
                        onClick={onClose}
                    >
                        <X />
                    </Button>
                </div>

                <div className="h-[calc(100%-3rem)] w-full">
                    <RealEstateMap advertisements={advertisements} />
                </div>
            </aside>
        </>
    )
}

export default MobileMapSidebar