import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { BookUser, Building2, ChevronDown, HandCoins, LayoutDashboard, LogOut, Pencil, User, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAgent } from "@/providers/agent-provider";
import { toast } from "sonner";
import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type SideBarItemProps = {
    icon: ReactNode;
    label: string;
    active: boolean;
    onClick: () => void;
};

function SideBarItem({ icon, label, active, onClick }: SideBarItemProps) {
    return (
        <SidebarMenuItem className="flex">
            <SidebarMenuButton
                variant={"outline"}
                onClick={onClick}
                size={"lg"}
                className="[&>svg]:size-6 border flex items-center justify-start relative rounded-sm! px-3!"
                isActive={active}
            >
                {icon}
                <Label className="text-xl cursor-pointer">{label}</Label>
                {active && (
                    <div className="absolute right-0 w-1.5 h-full bg-primary rounded-r-md transition-all" />
                )}
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}

const SidebarAgent = () => {
    const navigate = useNavigate()
    const { agent, logout, refreshAgent } = useAgent()
    const { setOpenMobile } = useSidebar()


    // Determina la route attuale
    const currentPath = window.location.pathname;

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
                            <Button
                                variant={"outline"}
                                size={"lg"}
                                onClick={() => navigateTo("/agent/dashboard/profile")}
                                className="w-full flex items-center justify-between pl-3! pr-2! rounded-sm"
                            >
                                <div className="flex items-center justify-start gap-2">
                                    <User className="size-6!" />
                                    <Label className="text-xl text-truncate cursor-pointer">{displayName}</Label>
                                </div>
                                <ChevronDown className="size-5" />
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
                        icon={<LayoutDashboard />}
                        label="Dashboard"
                        active={currentPath === "/agent/dashboard" || currentPath === "/agent/dashboard/"}
                        onClick={() => navigateTo("/agent/dashboard")}
                    />
                    <SideBarItem
                        icon={<Building2 />}
                        label="Annunci"
                        active={currentPath.startsWith("/agent/dashboard/advertisements")}
                        onClick={() => navigateTo("/agent/dashboard/advertisements")}
                    />
                    <SideBarItem
                        icon={<Users />}
                        label="Appuntamenti"
                        active={currentPath.startsWith("/agent/dashboard/appointments")}
                        onClick={() => navigateTo("/agent/dashboard/appointments")}
                    />
                    <SideBarItem
                        icon={<HandCoins />}
                        label="Offerte"
                        active={currentPath.startsWith("/agent/dashboard/offers")}
                        onClick={() => navigateTo("/agent/dashboard/offers")}
                    />
                    <SideBarItem
                        icon={<BookUser />}
                        label="Agenti"
                        active={currentPath.startsWith("/agent/dashboard/agents")}
                        onClick={() => navigateTo("/agent/dashboard/agents")}
                    />
                </SidebarMenu>
            </SidebarContent>
        </Sidebar >
    );
}

export default SidebarAgent;