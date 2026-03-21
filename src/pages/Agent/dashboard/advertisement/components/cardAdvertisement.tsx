import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"
import type { Advertisement } from "@/types/types"
import RealEstateCarousel from "@/pages/Agent/dashboard/advertisement/components/realEstateCarousel"
import { formatPrice } from "@/utils/formatPrice"
import { useNavigate } from "react-router-dom"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState, type MouseEvent } from "react"
import { toast } from "sonner"

type CardRealEstateProps = {
    advertisement: Advertisement
    onDelete: (id: number) => Promise<void>
}

export const CardAdvertisement = ({ advertisement, onDelete }: CardRealEstateProps) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const navigate = useNavigate()
    const addressLabel = advertisement.realEstate?.addressFormatted?.trim()
        || "not found"

    const handleCardClick = () => {
        navigate(`/agent/dashboard/advertisement/${String(advertisement.id)}`)
        console.log(advertisement)
    }

    const handleDelete = async (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation()
        setIsDeleting(true)
        try {
            await onDelete(advertisement.id)
            toast.success("Annuncio eliminato con successo")
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Errore durante l'eliminazione dell'annuncio")
        } finally {
            setIsDeleting(false)
            setShowDeleteDialog(false)
        }
    }

    return (
        <div
            className="border-2 w-full h-fit flex flex-col rounded-sm shadow-md hover:cursor-pointer hover:bg-secondary dark:text-foreground"
        >

            {/* Carousel */}
            <div className="flex items-center justify-center">
                <RealEstateCarousel photos={advertisement.photos} />
            </div>

            {/* Informazioni immobile */}
            <div
                onClick={handleCardClick}
                className="flex flex-col flex-1 gap-2 p-2 justify-between border-t">

                {/* Informazioni generali */}
                <div className="flex flex-col justify-start w-full h-12 text-bold">
                    {addressLabel}
                </div>

                {/* Prezzo + Buttons */}
                <div className="flex items-center justify-between gap-2">
                    <div className="flex h-full items-center justify-start border-2 border-primary text-primary text-2xl text-bold rounded-sm px-2">
                        {formatPrice(advertisement.price)}
                    </div>

                    {/* Buttons */}
                    <div className="flex w-full justify-end gap-1">
                        <Button
                            variant={"outline"}
                            size={"icon"}
                            className="rounded-sm"
                        >
                            <Pencil />
                        </Button>
                        <Button
                            variant={"destructive"}
                            size={"icon"}
                            className="rounded-sm"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            <Trash />
                        </Button>
                    </div>
                </div>
            </div>

            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent showCloseButton={false} className="border border-destructive">
                    <DialogHeader>
                        <DialogTitle className="text-destructive!">Elimina annuncio</DialogTitle>
                        <DialogDescription>
                            Sei sicuro di voler eliminare questo annuncio? Questa azione è irreversibile e tutti i dati verranno persi.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setShowDeleteDialog(false)}
                            disabled={isDeleting}
                        >
                            Annulla
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? "Eliminazione..." : "Elimina"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CardAdvertisement