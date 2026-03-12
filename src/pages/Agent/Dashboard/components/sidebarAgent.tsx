import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Building2, HandCoins, LogOut, Pencil, User, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SidebarAgent = () => {
    const navigate = useNavigate()

    return (
        <Sidebar>
            <SidebarHeader className="border-b">
                <SidebarMenuItem>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton variant={"outline"} onClick={() => navigate("/agent/dashboard/profile")} size={"lg"} className="[&>svg]:size-6 border h-10">
                                <User />
                                Mario Rossi
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem className="text-md" onClick={() => navigate("/agent/dashboard/profile")}>
                                <Pencil className="text-foreground"/>
                                Modifica
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-md" onClick={() => console.log("Logout")}>
                                <LogOut className="text-foreground"/>
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarHeader>
            <SidebarContent className="px-2">
                <SidebarGroup />
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
                <SidebarGroup />
            </SidebarContent>
        </Sidebar >
    );
}

export default SidebarAgent;