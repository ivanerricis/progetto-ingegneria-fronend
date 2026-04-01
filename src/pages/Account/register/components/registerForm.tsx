import { type FormEvent, useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RegisterPasswordField, isRegisterPasswordValid } from "@/components/register-password-field"
import { Separator } from "@/components/ui/separator"
import { useNavigate } from "react-router-dom"
import { registerAccount } from "@/lib/api/auth"
import { toast } from "sonner"
import { useAccount } from "@/providers/account-provider"
import ButtonGoogle from "@/components/buttonGoogle"

export const RegisterForm = () => {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { updateAccount } = useAccount()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError(null)

        if (!isRegisterPasswordValid(password)) {
            const message = "La password non rispetta i requisiti minimi"
            setError(message)
            toast.error(message)
            return
        }

        setIsSubmitting(true)

        try {
            const response = await registerAccount({
                firstName,
                lastName,
                email,
                password,
            })
            toast.success("Registrazione completata")
            updateAccount(response)
            navigate("/homepage")
        } catch (submitError) {
            const message = submitError instanceof Error ? submitError.message : "Errore durante la registrazione"
            setError(message)
            toast.error("Registrazione fallita: " + message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card className="w-full px-6 border-none shadow-none sm:shadow-sm sm:px-0 sm:max-w-md absolute rounded-none sm:rounded-xl" >
            <Separator orientation="horizontal" className="hidden sm:flex"></Separator>
            <form onSubmit={handleSubmit}>
                <CardContent >
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row gap-x-2">
                            <div className="grid gap-2">
                                <Label htmlFor="firstname">
                                    Nome
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="firstname"
                                    type="text"
                                    placeholder="Mario"
                                    value={firstName}
                                    onChange={(event) => setFirstName(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="lastname">
                                    Cognome
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="lastname"
                                    type="text"
                                    placeholder="Rossi"
                                    value={lastName}
                                    onChange={(event) => setLastName(event.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">
                                Email
                                <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="mario.rossi@example.com"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <RegisterPasswordField
                                value={password}
                                onChange={setPassword}
                                disabled={isSubmitting}
                                label="Password"
                                placeholder="La tua password"
                            />
                        </div>
                        {error && (
                            <p className="text-sm text-destructive" role="alert">
                                {error}
                            </p>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2 mt-2">
                    <Button
                        size={"lg"}
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Registrazione in corso..." : "Registrati"}
                    </Button>

                    <ButtonGoogle width={400} mobileWidth={295} />

                    <div className="flex gap-2 w-full items-center">
                        <Separator />
                        <div className="text-center text-sm text-muted-foreground">
                            oppure
                        </div>
                        <Separator />
                    </div>
                    <Button
                        variant={"secondary"}
                        size={"lg"}
                        onClick={() => navigate("/login")}
                        className="w-full"
                        type="button"
                        disabled={isSubmitting}
                    >
                        Accedi
                    </Button>
                </CardFooter>
            </form>
        </Card >
    )
}

export default RegisterForm