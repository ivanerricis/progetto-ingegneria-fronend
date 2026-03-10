import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Building2, HandCoins, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SidebarAgent = () => {
    const navigate = useNavigate()

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenuItem className="px-2 flex flex-col">
                    <span className="text-xl text-bold text-nowrap">Accesso eseguito come:</span>
                    <span className="text-xl text-bold">Mario Rossi</span>
                    <span className="text-xl text-bold">mariorossi123</span>
                </SidebarMenuItem>
            </SidebarHeader>
            <SidebarContent className="px-2">
                <SidebarGroup />
                <SidebarMenu className="gap-2">
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={() => navigate("/agent/dashboard/advertisements")} size={"lg"} className="[&>svg]:size-6 border">
                            <Building2 />
                            <span className="text-xl">Annunci</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={() => navigate("/agent/dashboard/appointments")} size={"lg"} className="[&>svg]:size-6 border">
                            <Users />
                            <span className="text-xl">Appuntamenti</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={() => navigate("/agent/dashboard/offers")} size={"lg"} className="[&>svg]:size-6 border">
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