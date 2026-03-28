import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { ArrowRight, Mail } from "lucide-react";

export const RequestResetPasswordForm = () => {
    return (
        <Card className="w-full px-6 border-none shadow-none sm:shadow-sm sm:px-0 sm:border sm:max-w-sm absolute rounded-none sm:rounded-xl">
            <CardHeader>
                <CardTitle>Richiedi reset password</CardTitle>
                <CardDescription className="text-md">
                    Inserisci il tuo indirizzo email per richiedere il reset della password.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col">
                <InputGroup>
                    <InputGroupInput
                        className="text-lg!"
                        type="email"
                        placeholder="mario.rossi@example.com"
                        required
                    />
                    <InputGroupAddon>
                        <Mail />
                    </InputGroupAddon>
                </InputGroup>
            </CardContent>
            <CardFooter>
                <Button className="w-full" type="submit" size={"lg"}>
                    Reset password
                    <ArrowRight className="ml-2 size-5" />
                </Button>
            </CardFooter>
        </Card>
    );
}