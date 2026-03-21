import Header from "@/components/header";
import { ModeToggle } from "@/components/mode-toggle";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SidebarAgent from "@/pages/Agent/dashboard/components/sidebarAgent";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAgent } from "@/providers/agent-provider";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const DashboardLayout = () => {
    const { agent, logout } = useAgent();
    const location = useLocation();
    const navigate = useNavigate();
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        if (agent && agent.isPasswordChange === false) {
            const allowed = ["/agent/dashboard/profile", "/agent/dashboard/password"];
            if (!allowed.includes(location.pathname)) {
                setShowDialog(true);
            } else {
                setShowDialog(false);
            }
        } else {
            setShowDialog(false);
        }
    }, [agent, location.pathname]);

    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Logout effettuato con successo!");
        } catch (error) {
            console.error("Error during logout:", error);
            toast.error("Errore durante il logout");
        } finally {
            navigate("/agent/login", { replace: true });
        }
    };

    const handleChangePassword = () => {
        setShowDialog(false);
        navigate("/agent/dashboard/password");
    };

    const handleProfile = () => {
        setShowDialog(false);
        navigate("/agent/dashboard/profile");
    };

    return (
        <>
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

            <Dialog open={showDialog}>
                <DialogContent showCloseButton={false}>
                    <DialogHeader>
                        <DialogDescription />
                        <DialogTitle>Devi cambiare la password</DialogTitle>
                    </DialogHeader>
                    <p
                        className="text-foreground">Per motivi di sicurezza, puoi accedere solo al profilo o cambiare la password. Vuoi cambiare la password ora o effettuare il logout?
                    </p>
                    <DialogFooter className="flex items-center! justify-between!">
                        <Button variant="outline" onClick={handleLogout}>Logout</Button>
                        <Button onClick={handleProfile}>Visualizza profilo</Button>
                        <Button onClick={handleChangePassword}>Cambia password</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default DashboardLayout;