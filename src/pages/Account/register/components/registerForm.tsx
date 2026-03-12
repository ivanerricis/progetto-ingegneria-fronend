import { type FormEvent, useState } from "react"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RegisterPasswordField, isRegisterPasswordValid } from "@/components/register-password-field"
import { Separator } from "@/components/ui/separator"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { registerAccount } from "@/lib/api/auth"
import { toast } from "sonner"

export const RegisterForm = () => {
    const navigate = useNavigate()
    const { t } = useTranslation("register")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

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
            await registerAccount({
                firstName,
                lastName,
                email,
                password,
            })

            toast.success("Registrazione completata")
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
        <Card className="w-full px-14 border-none shadow-none sm:shadow-sm sm:px-0 sm:max-w-md absolute rounded-none sm:rounded-xl" >
            <CardTitle>{t("title")}</CardTitle>
            <Separator orientation="horizontal" className="hidden sm:flex"></Separator>
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row gap-x-2">
                            <div className="grid gap-2">
                                <Label htmlFor="firstname">
                                    {t("fields.firstName.label")}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="firstname"
                                    type="text"
                                    placeholder={t("fields.firstName.placeholder")}
                                    value={firstName}
                                    onChange={(event) => setFirstName(event.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="lastname">
                                    {t("fields.lastname.label")}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="lastname"
                                    type="text"
                                    placeholder={t("fields.lastname.placeholder")}
                                    value={lastName}
                                    onChange={(event) => setLastName(event.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">
                                {t("fields.email.label")}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder={t("fields.email.placeholder")}
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
                                label={t("fields.password.label")}
                                placeholder={t("fields.password.placeholder")}
                            />
                        </div>
                        {error && (
                            <p className="text-sm text-destructive" role="alert">
                                {error}
                            </p>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? t("buttons.submitting") : t("buttons.submit")}
                    </Button>
                    <Button variant="outline" className="w-full" type="button" disabled={isSubmitting}>
                        {t("buttons.google")}
                    </Button>
                    <div className="flex gap-2 w-full items-center">
                        <Separator />
                        <div className="text-center text-sm text-muted-foreground">
                            {t("texts.or")}
                        </div>
                        <Separator />
                    </div>
                    <Button variant={"secondary"} onClick={() => navigate("/login")} className="w-full" type="button" disabled={isSubmitting}>
                        {t("buttons.login")}
                    </Button>
                </CardFooter>
            </form>
        </Card >
    )
}

export default RegisterForm