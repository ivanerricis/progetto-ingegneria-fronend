import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { BookUser, Building2, HandCoins, LogOut, Pencil, User, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAgent } from "@/providers/agent-provider";
import { toast } from "sonner";
import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type SideBarItemProps = {
    icon: ReactNode;
    label: string;
    onClick: () => void;
};

function SideBarItem({ icon, label, onClick }: SideBarItemProps) {
    return (
        <SidebarMenuItem>
            <SidebarMenuButton variant={"outline"} onClick={onClick} size={"lg"} className="[&>svg]:size-6 border flex items-center justify-start">
                {icon}
                <Label className="text-xl">{label}</Label>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}

const SidebarAgent = () => {
    const navigate = useNavigate()
    const { agent, logout, refreshAgent } = useAgent()
    const { setOpenMobile } = useSidebar()

    const navigateTo = (path: string) => {
        setOpenMobile(false)
        navigate(path)
    }

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
                            <Button variant={"outline"} size={"lg"} onClick={() => navigateTo("/agent/dashboard/profile")} className="w-full flex items-center justify-start">
                                <User className="size-6!" />
                                <Label className="text-xl">{displayName}</Label>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem className="text-md" onClick={() => navigateTo("/agent/dashboard/profile")}>
                                <Pencil className="text-foreground size-5" />
                                Modifica
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-md" onClick={handleLogout}>
                                <LogOut className="text-foreground size-5" />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarHeader>
            <SidebarContent className="px-2 pt-2">
                <SidebarMenu className="gap-2">
                    <SideBarItem
                        icon={<Building2 />}
                        label="Annunci"
                        onClick={() => navigateTo("/agent/dashboard/advertisements")}
                    />
                    <SideBarItem
                        icon={<Users />}
                        label="Appuntamenti"
                        onClick={() => navigateTo("/agent/dashboard/appointments")}
                    />
                    <SideBarItem
                        icon={<HandCoins />}
                        label="Offerte"
                        onClick={() => navigateTo("/agent/dashboard/offers")}
                    />
                    <SideBarItem
                        icon={<BookUser />}
                        label="Agenti"
                        onClick={() => navigateTo("/agent/dashboard/agents")}
                    />
                </SidebarMenu>
            </SidebarContent>
        </Sidebar >
    );
}

export default SidebarAgent;