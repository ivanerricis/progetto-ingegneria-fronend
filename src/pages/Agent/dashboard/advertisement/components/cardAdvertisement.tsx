import { Button } from "@/components/ui/button"
import { CalendarClock, Pencil, Trash } from "lucide-react"
import type { Advertisement } from "@/types/types"
import { formatPrice } from "@/utils/formatPrice"
import { useNavigate } from "react-router-dom"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState, type MouseEvent } from "react"
import { toast } from "sonner"
import { PreviewPhoto } from "../../appointment/components/previewPhoto"
import { Label } from "@/components/ui/label"

type CardRealEstateProps = {
    advertisement: Advertisement
    onDelete: (id: number) => Promise<void>
}

export const CardAdvertisement = ({ advertisement, onDelete }: CardRealEstateProps) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const navigate = useNavigate()

    const handleCardClick = () => {
        navigate(`/agent/dashboard/advertisement/${String(advertisement.id)}`)
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
            className="border-2 w-full h-fit flex flex-col rounded-sm shadow-sm hover:cursor-pointer bg-background hover:bg-secondary dark:text-foreground"
            onClick={handleCardClick}
        >

            {/* Carousel */}
            <div className="flex items-center justify-center">
                <PreviewPhoto photo={advertisement.previewPhoto} />
            </div>

            {/* Informazioni immobile */}
            <div
                className="flex flex-col flex-1 gap-2 p-2 justify-between border-t">

                {/* Informazioni generali */}
                <div className="flex flex-col justify-start w-full h-12 text-bold min-w-0">
                    <p className="line-clamp-2">{advertisement.realEstate.addressFormatted}</p>
                </div>

                {/* Prezzo + Buttons */}
                <div className="flex justify-between lg:flex-col lg:gap-2">
                    <div className="flex w-fit items-center justify-start border-2 border-primary text-primary text-2xl text-bold rounded-sm px-2">
                        {formatPrice(advertisement.price)}
                    </div>

                    {/* Buttons */}
                    {advertisement.status !== "sold" && <div className="flex w-full items-center justify-end lg:justify-between gap-1">
                        <Button
                            variant={"outline"}
                            className="size-10 lg:flex-1 lg:h-10 lg:px-4 lg:py-2"
                        >
                            <Pencil className="size-5"/>
                            <Label className="hidden lg:block text-md">Modifica</Label>
                        </Button>
                        {advertisement.type === "rent" && (
                            <Button
                                variant={"outline"}
                                className="size-10 lg:flex-1 lg:h-10 lg:px-4 lg:py-2"
                            >
                                <CalendarClock className="size-5"/>
                                <Label className="hidden lg:block text-md">Affittato</Label>
                            </Button>
                        )}
                        <Button
                            variant={"destructive"}
                            className="size-10 lg:flex-1 lg:h-10 lg:px-4 lg:py-2"
                            onClick={e => {
                                e.stopPropagation();
                                setShowDeleteDialog(true);
                            }}
                            disabled={isDeleting}
                        >
                            <Trash className="size-5"/>
                            <Label className="hidden lg:block text-md">Elimina</Label>
                        </Button>
                    </div>}
                </div>
            </div>

            {showDeleteDialog && (
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
                                onClick={e => {
                                    e.stopPropagation();
                                    setShowDeleteDialog(false);
                                }}
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
            )}
        </div>
    )
}

export default CardAdvertisement