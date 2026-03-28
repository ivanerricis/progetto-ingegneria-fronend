import { Button } from "@/components/ui/button"
import { CalendarClock, Pencil, Trash } from "lucide-react"
import type { Advertisement } from "@/types/types"
import { formatPrice } from "@/utils/formatPrice"
import { useNavigate } from "react-router-dom"
import { useState, type MouseEvent } from "react"
import { toast } from "sonner"
import { PreviewPhoto } from "../../appointment/components/previewPhoto"
import { Label } from "@/components/ui/label"
import { DialogDeleteAdvertisement } from "./dialogDeleteAdvertisement"
import { DialogRentAdvertisement } from "./dialogRentAdvertisement"

type CardRealEstateProps = {
    advertisement: Advertisement
    onDelete: (id: number) => Promise<void>
    onRent: (id: number) => Promise<void>
}

export const CardAdvertisement = ({ advertisement, onDelete, onRent }: CardRealEstateProps) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [showRentDialog, setShowRentDialog] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isRenting, setIsRenting] = useState(false)
    const navigate = useNavigate()

    const handleCardClick = () => {
        navigate(`/agent/dashboard/advertisement/${String(advertisement.id)}`)
    }

    const handleDelete = async (ev: MouseEvent<HTMLButtonElement>) => {
        ev.stopPropagation();
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

    const handleRent = async (ev: MouseEvent<HTMLButtonElement>) => {
        ev.stopPropagation();
        setIsRenting(true)
        try {
            await onRent(advertisement.id)
            toast.success("Annuncio affittato con successo")
        }
        catch (err) {
            toast.error(err instanceof Error ? err.message : "Errore durante l'affitto dell'annuncio")
        } finally {
            setIsRenting(false)
            setShowRentDialog(false)
        }
    }

    return (
        <div
            className="border-2 w-full h-fit flex flex-col rounded-sm shadow-sm hover:cursor-pointer bg-background hover:bg-secondary dark:text-foreground"
            onClick={handleCardClick}
            onKeyDown={handleCardClick}
            role="button"
            tabIndex={0}
            aria-label={`Visualizza i dettagli dell'annuncio per ${advertisement.realEstate.addressFormatted}`}
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
                <div className="flex justify-between 2xl:flex-col 2xl:gap-2">
                    <div className="flex w-fit items-center justify-start border-2 border-primary text-primary text-2xl text-bold rounded-sm px-2">
                        {formatPrice(advertisement.price)}
                    </div>

                    {/* Buttons */}
                    {advertisement.status !== "sold" && <div className="flex w-full items-center justify-end 2xl:justify-between gap-1">
                        <Button
                            variant={"outline"}
                            className="size-10 2xl:flex-1 2xl:h-10 2xl:px-4 2xl:py-2"
                        >
                            <Pencil className="size-5" />
                            <Label className="hidden 2xl:block text-md">Modifica</Label>
                        </Button>
                        {advertisement.type === "rent" && (
                            <Button
                                variant={"outline"}
                                className="size-10 2xl:flex-1 2xl:h-10 2xl:px-4 2xl:py-2"
                                onClick={e => {
                                    e.stopPropagation();
                                    setShowRentDialog(true);
                                }}
                            >
                                <CalendarClock className="size-5" />
                                <Label className="hidden 2xl:block text-md">Affittato</Label>
                            </Button>
                        )}
                        <Button
                            variant={"destructive"}
                            className="size-10 2xl:flex-1 2xl:h-10 2xl:px-4 2xl:py-2"
                            onClick={e => {
                                e.stopPropagation();
                                setShowDeleteDialog(true);
                            }}
                            disabled={isDeleting}
                        >
                            <Trash className="size-5" />
                            <Label className="hidden 2xl:block text-md">Elimina</Label>
                        </Button>
                    </div>}
                </div>
            </div>

            {showDeleteDialog && (
                <DialogDeleteAdvertisement
                    showDeleteDialog={showDeleteDialog}
                    setShowDeleteDialog={setShowDeleteDialog}
                    isDeleting={isDeleting}
                    handleDelete={handleDelete}
                />
            )}

            {showRentDialog && (
                <DialogRentAdvertisement
                    showRentDialog={showRentDialog}
                    setShowRentDialog={setShowRentDialog}
                    isRenting={isRenting}
                    handleRent={handleRent}
                />
            )}
        </div>
    )
}

export default CardAdvertisement