import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAccount } from "@/providers/account-provider";
import { Calendar, LogOut, Tag, User } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const AccountBadge = () => {
    const { account, logout, refreshAccount } = useAccount()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logout()
            toast.success("Logout effettuato")
        } catch (logoutError) {
            const message = logoutError instanceof Error ? logoutError.message : "Errore durante il logout"
            toast.error(message)
        } finally {
            refreshAccount()
            navigate("/login", { replace: true })
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="border rounded-full h-9 w-9 bg-secondary text-foreground cursor-pointer flex items-center justify-center">
                    {(account?.firstName?.charAt(0) ?? '') + (account?.lastName?.charAt(0) ?? '')}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-400">
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="text-foreground" />
                    Profilo
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Calendar className="text-foreground" />
                    Appuntamenti
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Tag className="text-foreground" />
                    Offerte
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleLogout}>
                    <LogOut className="text-foreground" />
                    Esci
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}