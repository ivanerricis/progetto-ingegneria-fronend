import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Building2, HandCoins, Users } from "lucide-react";

const SidebarAgent = () => {
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
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size={"lg"} className="[&>svg]:size-6">
                            <Building2 />
                            <span className="text-xl">Annunci</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton size={"lg"} className="[&>svg]:size-6">
                            <Users />
                            <span className="text-xl">Appuntamenti</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton size={"lg"} className="[&>svg]:size-6">
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