import { PasswordStrength } from "@/components/passwordStrength";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export const SendResetPasswordForm = () => {
    return (
        <Card className="w-full px-6 border-none shadow-none sm:shadow-sm sm:px-0 sm:border sm:max-w-sm absolute rounded-none sm:rounded-xl">
            <CardHeader>
                <CardTitle>Imposta una nuova password</CardTitle>
                <CardDescription className="text-md">
                    Inserisci la tua nuova password per completare il reset della password.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <PasswordStrength />
            </CardContent>
            <CardFooter>
                <Button className="w-full" type="submit" size={"lg"}>
                    Conferma reset password
                    <ArrowRight className="ml-2 size-5" />
                </Button>
            </CardFooter>
        </Card>
    );
}