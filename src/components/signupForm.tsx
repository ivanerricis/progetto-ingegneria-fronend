import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordStrength } from "./mantine/passwordStrength"
import { Separator } from "./ui/separator"
import { Link } from "react-router-dom"

export const SignupForm = () => {
    return (
        <Card className="w-full max-w-md absolute" >
            <CardHeader>
                <CardTitle>Registrati</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="firstname">Nome</Label>
                            <Input
                                id="firstname"
                                type="text"
                                placeholder="Mario"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="lastname">Cognome</Label>
                            <Input
                                id="lastname"
                                type="text"
                                placeholder="Rossi"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="mariorossi@gmail.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <PasswordStrength />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                    Registrati
                </Button>
                <Button variant="outline" className="w-full">
                    Registrati con Google
                </Button>
                <div className="flex gap-2 w-full items-center">
                    <Separator />
                    <div className="text-center text-sm text-muted-foreground">
                        oppure
                    </div>
                    <Separator />
                </div>
                <Button className="w-full" variant="outline">
                    <Link to="/login">Accedi</Link>
                </Button>
            </CardFooter>
        </Card >
    )
}

export default SignupForm