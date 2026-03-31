import { RegisterPasswordField } from "@/components/register-password-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { resetPasswordAccount, resetPasswordAgent } from "@/lib/api/auth";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type Props = Readonly<{
    type: string | undefined;
    token: string | undefined;
}>;

export const SendResetPasswordForm = ({ type, token }: Props) => {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) {
            toast.error("Token mancante per il reset della password.");
            navigate(type === "agent" ? "/agent/login" : "/account/login");
            return;
        }
        try {
            if (type === "agent") {
                await resetPasswordAgent(token, password);
            } else {
                await resetPasswordAccount(token, password);
            }
            toast.success("Password reset con successo! Ora puoi accedere con la tua nuova password.");
            navigate(type === "agent" ? "/agent/login" : "/account/login");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Si è verificato un errore durante il reset della password.");
        }
    };

    return (
        <Card className="w-full px-6 border-none shadow-none sm:shadow-sm sm:px-0 sm:border sm:max-w-sm absolute rounded-none sm:rounded-xl">
            <CardHeader>
                <CardTitle>Imposta una nuova password</CardTitle>
                <CardDescription className="text-md">
                    Inserisci la tua nuova password per completare il reset della password.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <RegisterPasswordField
                    value={password}
                    onChange={setPassword}
                    label={"Nuova password"}
                    placeholder={"Password"}
                />
            </CardContent>
            <CardFooter>
                <Button
                    className="w-full"
                    type="submit"
                    size={"lg"}
                    onClick={handleSubmit}
                >
                    Conferma reset password
                    <ArrowRight className="ml-2 size-5" />
                </Button>
            </CardFooter>
        </Card>
    );
}