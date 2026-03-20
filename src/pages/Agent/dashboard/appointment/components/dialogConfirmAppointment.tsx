import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

type DialogProps = {
    showConfirmDialog: boolean;
    setShowConfirmDialog: (value: boolean) => void;
    appointmentId: number;
    onConfirm: (id: number) => Promise<void>;
};

export const DialogConfirmAppointment = ({ showConfirmDialog, setShowConfirmDialog, appointmentId, onConfirm }: DialogProps) => {
    const [isLoading, setIsLoading] = useState(false)

    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowConfirmDialog(false);
    };

    const handleConfirm = async () => {
        setIsLoading(true)
        try {
            await onConfirm(appointmentId)
            setShowConfirmDialog(false);
            toast.success("Appuntamento confermato con successo!");
        } catch (submitError) {
            const message =
                submitError instanceof Error
                    ? submitError.message
                    : "Errore durante la conferma dell'appuntamento"
            toast.error("Conferma fallita: " + message)
        }
        finally {
            setIsLoading(false)
        }
    };

    return (
        <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Conferma appuntamento</DialogTitle>
                    <DialogDescription>
                        Sei sicuro di voler confermare l'appuntamento?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2">
                    <Button
                        variant="outline"
                        onClick={handleClose}
                        disabled={isLoading}
                    >
                        Annulla
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? "Invio conferma..." : "Conferma"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}