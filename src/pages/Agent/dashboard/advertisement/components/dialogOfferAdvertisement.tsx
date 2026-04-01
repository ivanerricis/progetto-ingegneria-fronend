import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { toast } from "sonner"

type Props = {
    showOfferDialog: boolean
    setShowOfferDialog: (show: boolean) => void
    isOffering: boolean
    handleOffer: (advertisementId: number, firstName: string, lastName: string, email: string, price: number) => Promise<void>
    advertisementId: number
}

export const DialogOfferAdvertisement = ({
    showOfferDialog,
    setShowOfferDialog,
    isOffering,
    handleOffer,
    advertisementId,
}: Props) => {
    const [offerPrice, setOfferPrice] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")

    const handleSubmitOffer = async () => {
        const parsedPrice = Number(offerPrice)
        if (!offerPrice || Number.isNaN(parsedPrice) || parsedPrice <= 0) {
            toast.error("Inserisci un prezzo valido")
            return
        }

        if (!firstName || !lastName || !email) {
            toast.error("Compila i campi obbligatori dell'account")
            return
        }

        await handleOffer(advertisementId, firstName.trim(), lastName.trim(), email.trim(), parsedPrice)
    }

    return (
        <Dialog open={showOfferDialog} onOpenChange={setShowOfferDialog}>
            <DialogContent showCloseButton={false} className="border border-primary" onClick={(e) => e.stopPropagation()}>
                <DialogHeader>
                    <DialogTitle>Fai un'offerta esterna</DialogTitle>
                    <DialogDescription />
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-1.5">
                        <Label htmlFor="offer-price">Prezzo offerta</Label>
                        <Input
                            id="offer-price"
                            type="number"
                            min={1}
                            step={1}
                            value={offerPrice}
                            placeholder="Inserisci un prezzo"
                            onChange={event => setOfferPrice(event.currentTarget.value)}
                            onKeyDown={(e) => e.stopPropagation()}
                            onClick={(e) => e.stopPropagation()}
                            disabled={isOffering}
                            required
                        />
                    </div>

                    <div className="grid gap-1.5">
                        <Label htmlFor="offer-account-first-name">Nome</Label>
                        <Input
                            id="offer-account-first-name"
                            value={firstName}
                            placeholder="Mario"
                            onChange={event => setFirstName(event.currentTarget.value)}
                            onKeyDown={(e) => e.stopPropagation()}
                            onClick={(e) => e.stopPropagation()}
                            disabled={isOffering}
                            required
                        />
                    </div>

                    <div className="grid gap-1.5">
                        <Label htmlFor="offer-account-last-name">Cognome</Label>
                        <Input
                            id="offer-account-last-name"
                            value={lastName}
                            placeholder="Rossi"
                            onChange={event => setLastName(event.currentTarget.value)}
                            onKeyDown={(e) => e.stopPropagation()}
                            onClick={(e) => e.stopPropagation()}
                            disabled={isOffering}
                            required
                        />
                    </div>

                    <div className="grid gap-1.5">
                        <Label htmlFor="offer-account-email">Email</Label>
                        <Input
                            id="offer-account-email"
                            type="email"
                            value={email}
                            placeholder="mariorossi@example.it"
                            onChange={event => setEmail(event.currentTarget.value)}
                            onKeyDown={(e) => e.stopPropagation()}
                            onClick={(e) => e.stopPropagation()}
                            disabled={isOffering}
                            required
                        />
                    </div>
                </div>
                <DialogFooter className="gap-2">
                    <Button
                        variant="outline"
                        onClick={e => {
                            e.stopPropagation();
                            setShowOfferDialog(false);
                        }}
                        disabled={isOffering}
                    >
                        Annulla
                    </Button>
                    <Button
                        onClick={handleSubmitOffer}
                        disabled={isOffering}
                    >
                        {isOffering ? "Inserimento..." : "Inserisci"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}