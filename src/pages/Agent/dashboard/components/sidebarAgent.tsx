import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Building2, HandCoins, LogOut, Pencil, User, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAgent } from "@/providers/agent-provider";
import { toast } from "sonner";

const SidebarAgent = () => {
    const navigate = useNavigate()
    const { agent, logout, refreshAgent } = useAgent()

    const displayName = agent?.username || "Agente"

    const handleLogout = async () => {
        try {
            await logout()
            toast.success("Logout effettuato")
        } catch (logoutError) {
            const message = logoutError instanceof Error ? logoutError.message : "Errore durante il logout"
            toast.error(message)
        } finally {
            refreshAgent()
            navigate("/agent/login", { replace: true })
        }
    }

    return (
        <Sidebar>
            <SidebarHeader className="border-b">
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton variant={"outline"} onClick={() => navigate("/agent/dashboard/profile")} size={"lg"} className="[&>svg]:size-6 border h-10">
                                <User />
                                {displayName}
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem className="text-md" onClick={() => navigate("/agent/dashboard/profile")}>
                                <Pencil className="text-foreground" />
                                Modifica
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-md" onClick={handleLogout}>
                                <LogOut className="text-foreground" />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarHeader>
            <SidebarContent className="px-2 pt-2">
                <SidebarMenu className="gap-2">
                    <SidebarMenuItem>
                        <SidebarMenuButton variant={"outline"} onClick={() => navigate("/agent/dashboard/advertisements")} size={"lg"} className="[&>svg]:size-6 border">
                            <Building2 />
                            <span className="text-xl">Annunci</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton variant={"outline"} onClick={() => navigate("/agent/dashboard/appointments")} size={"lg"} className="[&>svg]:size-6 border">
                            <Users />
                            <span className="text-xl">Appuntamenti</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton variant={"outline"} onClick={() => navigate("/agent/dashboard/offers")} size={"lg"} className="[&>svg]:size-6 border">
                            <HandCoins />
                            <span className="text-xl">Offerte</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
        </Sidebar >
    );
}

export default SidebarAgent;