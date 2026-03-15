import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ModeToggle } from "@/components/mode-toggle";
import { useAccount } from "@/providers/account-provider";
import { ArrowLeft, Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { deleteAccount } from "@/lib/api/auth";
import { toast } from "sonner";
import { formatCreatedAt } from "@/utils/formatCreatedAt";

export default function Profile() {
    const { account } = useAccount()
    const navigate = useNavigate()
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        if (!account) return
        setIsDeleting(true)
        try {
            await deleteAccount(account.id)
            toast.success("Account eliminato con successo")
            navigate("/login")
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Errore durante l'eliminazione dell'account")
        } finally {
            setIsDeleting(false)
            setShowDeleteDialog(false)
        }
    }

    if (!account) return null;

    return (
        <div className="w-full min-h-screen flex flex-col">
            <Header
                isHomepage
                left={
                    <Button variant="outline" type="button" onClick={() => navigate("/homepage")}>
                        <ArrowLeft />
                        <Label className="hidden sm:inline text-md">Indietro</Label>
                    </Button>
                }
                right={<ModeToggle />}
            />

            <div className="flex-1 flex items-center justify-center sm:px-40">
                <div className="flex flex-col justify-start items-center gap-8 w-full h-full">
                    <div className="flex flex-col gap-6">
                        <Label className="text-2xl font-bold w-full h-full">Le tue informazioni</Label>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex flex-col gap-1 w-full">
                                <Label className="text-lg text-nowrap">Nome</Label>
                                <Input disabled className="w-full" value={account.firstName} />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <Label className="text-lg text-nowrap">Cognome</Label>
                                <Input disabled className="w-full" value={account.lastName} />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex flex-col gap-1 w-full">
                                <Label className="text-lg text-nowrap">Email</Label>
                                <Input disabled className="w-full" value={account.email} />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <Label className="text-lg text-nowrap">Creato il</Label>
                                <Input disabled className="w-full" value={formatCreatedAt(account.createdAt)} />
                            </div>
                        </div>

                        <div className="flex flex-col flex-1 gap-4">
                            <Button
                                type="button"
                                onClick={() => navigate(`/account/${account.id}/password`)}
                                className="flex items-center justify-center flex-1"
                            >
                                <Pencil />
                                Modifica password
                            </Button>
                            <Button
                                variant="destructive"
                                className="flex items-center justify-center flex-1"
                                onClick={() => setShowDeleteDialog(true)}
                            >
                                <Trash />
                                Elimina account
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer isHomepage />

            <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogContent showCloseButton={false} className="border border-destructive">
                    <DialogHeader>
                        <DialogTitle className="text-destructive!">Elimina account</DialogTitle>
                        <DialogDescription>
                            Sei sicuro di voler eliminare il tuo account? Questa azione è irreversibile e tutti i tuoi dati verranno persi.
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
    );
}