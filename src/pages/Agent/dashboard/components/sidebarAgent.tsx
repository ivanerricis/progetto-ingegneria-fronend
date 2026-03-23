import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { BookUser, Building2, ChevronDown, HandCoins, LogOut, Pencil, User, Users } from "lucide-react";
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
                className={`
                    [&>svg]:size-6
                    border flex items-center justify-start relative
                    px-3!
                    ${active ? "border-primary border-2 bg-primary! text-background! dark:text-foreground!" : ""}
                `}
                isActive={active}
            >
                {icon}
                <Label className={`text-xl cursor-pointer`}>{label}</Label>
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
            <SidebarHeader className="border-b bg-background">
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant={"outline"}
                                size={"lg"}
                                onClick={() => navigateTo("/agent/dashboard/profile")}
                                className="w-full flex items-center justify-between pl-3! pr-2!"
                            >
                                <div className="flex items-center justify-start gap-2">
                                    <User className="size-6!" />
                                    <Label className="text-xl text-truncate cursor-pointer">{displayName}</Label>
                                </div>
                                <ChevronDown className="size-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem className="group/edit text-md" onClick={() => navigateTo("/agent/dashboard/profile")}>
                                <Pencil className="text-foreground size-5 group-hover/edit:text-background group-hover/edit:dark:text-foreground" />
                                Modifica
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="group/out text-md" onClick={handleLogout}>
                                <LogOut className="text-foreground size-5 group-hover/out:text-background group-hover/out:dark:text-foreground" />
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
                    {agent?.isAdmin && (
                        <SideBarItem
                            icon={<BookUser />}
                            label="Agenti"
                            active={currentPath.startsWith("/agent/dashboard/agents")}
                            onClick={() => navigateTo("/agent/dashboard/agents")}
                        />
                    )}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar >
    );
}

export default SidebarAgent;