import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import SidebarFilter from "./sidebarFilter";

type Props = {
    open: boolean
    onClose: () => void
}

const MobileSidebar = ({ open, onClose }: Props) => {
    return (
        <>
            {/* Backdrop */}
            {open && (
                <button
                    type="button"
                    aria-label="Chiudi filtri"
                    className="fixed inset-0 z-40 bg-black/40 xl:hidden"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-72 transform flex-col overflow-hidden border-r bg-background p-2 transition-transform duration-200 xl:hidden
                    ${open ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="mb-2 flex shrink-0 items-center justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        aria-label="Chiudi filtri"
                        className="rounded-sm"
                        onClick={onClose}
                    >
                        <X />
                    </Button>
                </div>
                <div className="min-h-0 flex-1">
                    <SidebarFilter />
                </div>
            </aside>
        </>
    )
}

export default MobileSidebar;
