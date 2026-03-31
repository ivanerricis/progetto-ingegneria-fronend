import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { useAgencies } from "@/hooks/agent/useAgency";
import { requestResetPasswordAgent } from "@/lib/api/auth";
import AgencyCombobox from "@/pages/Agent/login-agent/components/agencyCombobox";
import { ArrowRight, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const RequestResetPasswordFormAgent = () => {
    const [username, setUsername] = useState("");
    const [agentId, setAgentId] = useState<number | null>(null);
    const { agencies, loading, error } = useAgencies();
    const [selectedAgencyId, setSelectedAgencyId] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (agentId === null) {
            toast.error("ID agente non valido. Assicurati di inserire un numero valido.")
            return;
        }
        try {
            await requestResetPasswordAgent(username, agentId);
            toast.success("Email di reset password inviata con successo. Controlla la tua casella di posta.")
            navigate("/agent/login");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Si è verificato un errore durante la richiesta di reset password.")
        } finally {
            setUsername("");
            setAgentId(null);
        }
    }

    return (
        <Card className="w-full px-6 border-none shadow-none sm:shadow-sm sm:px-0 sm:border sm:max-w-sm absolute rounded-none sm:rounded-xl">
            <CardHeader>
                <CardTitle>Richiedi reset password</CardTitle>
                <CardDescription className="text-md">
                    Inserisci il tuo nome utente per richiedere il reset della password.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col">
                <div className="grid gap-1 mb-4">
                    <Label htmlFor="agency" className="text-lg">Seleziona un'agenzia</Label>
                    <AgencyCombobox
                        agencies={agencies}
                        value={selectedAgencyId}
                        onValueChange={setSelectedAgencyId}
                        loading={loading}
                        loadError={error}
                    />
                </div>
                <InputGroup>
                    <InputGroupInput
                        className="text-lg!"
                        type="text"
                        placeholder="mariorossi"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <InputGroupAddon>
                        <User />
                    </InputGroupAddon>
                </InputGroup>
            </CardContent>
            <CardFooter>
                <Button
                    className="w-full"
                    type="submit"
                    size={"lg"}
                    onClick={handleSubmit}
                >
                    Reset password
                    <ArrowRight className="ml-2 size-5" />
                </Button>
            </CardFooter>
        </Card>
    );
}