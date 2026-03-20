import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

type DialogProps = {
    showRejectDialog: boolean;
    setShowRejectDialog: (value: boolean) => void;
    appointmentId: number;
    onReject: (id: number) => Promise<void>;
};

export const DialogRejectAppointment = ({ showRejectDialog, setShowRejectDialog, appointmentId, onReject }: DialogProps) => {
    const [isLoading, setIsLoading] = useState(false)

    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowRejectDialog(false);
    };

    const handleReject = async () => {
        setIsLoading(true)
        try {
            await onReject(appointmentId)
            setShowRejectDialog(false);
            toast.success("Appuntamento rifiutato con successo!");
        } catch (submitError) {
            const message =
                submitError instanceof Error
                    ? submitError.message
                    : "Errore durante il rifiuto dell'appuntamento"
            toast.error("Rifiuto fallito: " + message)
        }
        finally {
            setIsLoading(false)
        }
    };

    return (
        <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle>Rifiuta appuntamento</DialogTitle>
                    <DialogDescription>
                        Sei sicuro di voler rifiutare l'appuntamento?
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
                        onClick={handleReject}
                        disabled={isLoading}
                    >
                        {isLoading ? "Invio rifiuto..." : "Rifiuta"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}