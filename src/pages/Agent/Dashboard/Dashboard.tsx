import Header from "@/components/header";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SidebarAgent from "@/pages/Agent/Dashboard/components/sidebarAgent";

const Dashboard = () => {
    return (
        <SidebarProvider>
            <SidebarAgent />
            <SidebarInset>
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
                <main className="flex-1" />
            </SidebarInset>
        </SidebarProvider>
    );
}

export default Dashboard;