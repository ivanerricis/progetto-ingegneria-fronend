import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

const Dashboard = () => {
    return (
        <div className="flex flex-col w-full max-h-screen">
            <header className="flex h-12 justify-between items-center px-26 gap-2 shadow-md border-b">
                <div className="flex justify-start items-center">
                    <Button variant={"secondary"}>
                        <MenuIcon />
                    </Button>
                </div>
                <div className="flex flex-end items-center gap-1">
                    <ModeToggle />
                    <Button variant={"outline"}>
                        Profilo
                    </Button>
                </div>
            </header>
            <main className="w-full h-full">
                Dashboard Agente
            </main>
        </div>
    );
}

export default Dashboard;