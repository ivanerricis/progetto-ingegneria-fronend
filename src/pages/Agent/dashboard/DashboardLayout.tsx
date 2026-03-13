import Header from "@/components/header";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SidebarAgent from "@/pages/Agent/dashboard/components/sidebarAgent";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <SidebarProvider>
            <SidebarAgent />
            <SidebarInset className="h-screen overflow-hidden">
                <Header
                    isHomepage
                    left={
                        <>
                            <SidebarTrigger variant={"outline"} size={"icon-lg"} />
                        </>
                    }
                    right={
                        <ModeToggle />
                    }
                />
                <main className="min-h-0 flex-1">
                    <div className="h-full w-full overflow-y-auto bg-background">
                        <Outlet />
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default DashboardLayout;