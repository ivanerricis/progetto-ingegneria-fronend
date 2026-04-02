import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { requestResetPasswordAccount } from "@/lib/api/auth";
import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const RequestResetPasswordFormAccount = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await requestResetPasswordAccount(email);
            toast.success("Email di reset password inviata con successo. Controlla la tua casella di posta.")
            navigate("/login");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Si è verificato un errore durante la richiesta di reset password.")
        } finally {
            setLoading(false);
            setEmail("");
        }
    }

    return (
        <Card className="w-full px-6 border-none shadow-none sm:shadow-sm sm:px-0 sm:border sm:max-w-sm absolute rounded-none sm:rounded-xl">
            <CardHeader>
                <CardTitle>Richiedi reset password</CardTitle>
                <CardDescription className="text-md">
                    Inserisci il tuo indirizzo email per richiedere il reset della password.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <CardContent className="flex flex-col">
                    <InputGroup>
                        <InputGroupInput
                            className="text-lg!"
                            type="email"
                            placeholder="mario.rossi@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <InputGroupAddon>
                            <Mail />
                        </InputGroupAddon>
                    </InputGroup>
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full"
                        type="submit"
                        size={"lg"}
                        disabled={loading}
                    >
                        {loading ? "Invio in corso..." : "Reset password"}
                        <ArrowRight className="ml-2 size-5" />
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}