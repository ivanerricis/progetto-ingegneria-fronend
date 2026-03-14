import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Footer } from "@/components/footer";
import { useAgent } from "@/providers/agent-provider";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatCreatedAt } from "@/utils/formatCreatedAt";

export default function Profile() {
    const { agent } = useAgent()
    const navigate = useNavigate()

    if (!agent) return null

    return (
        <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="flex flex-col w-full h-full items-center justify-center p-10 sm:px-40">
                <div className="flex flex-col items-start justify-center gap-6">
                    <Label className="text-2xl font-bold">Le tue informazioni</Label>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex flex-col gap-1 w-full">
                            <Label className="text-xl text-nowrap">Nome</Label>
                            <Input disabled className="w-full" value={agent.firstName} />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label className="text-xl text-nowrap">Cognome</Label>
                            <Input disabled className="w-full" value={agent.lastName} />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex flex-col gap-1 w-full">
                            <Label className="text-xl text-nowrap">Username</Label>
                            <Input disabled className="w-full" value={agent.username} />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label className="text-xl text-nowrap">Numero di telefono</Label>
                            <Input disabled className="w-full" value={agent.phoneNumber} />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex flex-col gap-1 w-full">
                            <Label className="text-xl text-nowrap">Agenzia</Label>
                            <Input disabled className="w-full" value={agent.agency.name} />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label className="text-xl text-nowrap">Email Agenzia</Label>
                            <Input disabled className="w-full" value={agent.agency.email} />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-6 w-full">
                        <div className="flex flex-col gap-1">
                            <Label className="text-xl text-nowrap">Creato il</Label>
                            <Input disabled className="w-full" value={formatCreatedAt(agent.createdAt)} />
                        </div>
                        <div className="hidden sm:flex sm:flex-1 p-3"></div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-6 w-full">
                        <Button
                            type="button"
                            onClick={() => navigate("/agent/dashboard/password")}
                            className="flex items-center justify-center flex-1"
                        >
                            <Pencil />
                            <span>Modifica password</span>
                        </Button>
                        <div className="hidden sm:flex sm:flex-1 p-3"></div>
                    </div>
                </div>
            </div>
            <Footer isHomepage />
        </div>
    );
}