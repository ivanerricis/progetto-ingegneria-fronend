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
                <div className="border-2 rounded-full h-9 w-9 bg-secondary text-foreground cursor-pointer flex items-center justify-center">
                    {(account?.firstName?.charAt(0) ?? '') + (account?.lastName?.charAt(0) ?? '')}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-400">
                <DropdownMenuItem onClick={() => navigate("/profile")} className="group/profile text-md">
                    <User className="text-foreground group-hover/profile:text-background dark:group-hover/profile:text-foreground size-5" />
                    Profilo
                </DropdownMenuItem>
                <DropdownMenuItem className="group/calendar text-md">
                    <Calendar className="text-foreground group-hover/calendar:text-background dark:group-hover/calendar:text-foreground size-5" />
                    Appuntamenti
                </DropdownMenuItem>
                <DropdownMenuItem className="group/tag text-md">
                    <Tag className="text-foreground group-hover/tag:text-background dark:group-hover/tag:text-foreground size-5" />
                    Offerte
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={handleLogout} className="group/logout text-md">
                    <LogOut className="text-foreground group-hover/logout:text-background dark:group-hover/logout:text-foreground size-5" />
                    Esci
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}