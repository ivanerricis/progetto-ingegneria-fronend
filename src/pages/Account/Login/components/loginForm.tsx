import { type FormEvent, useState } from "react"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"
import { API_BASE_URL } from "@/lib/api/config"

export const LoginForm = () => {
    const { t } = useTranslation("login")
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError(null)
        setIsSubmitting(true)

        try {
            const response = await fetch(`${API_BASE_URL}/auth/account/login`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            })

            const responseBody = await response.json().catch(() => null)

            if (!response.ok) {
                const backendMessage =
                    responseBody && typeof responseBody.error === "string"
                        ? responseBody.error
                        : responseBody && typeof responseBody.message === "string"
                            ? responseBody.message
                            : "Credenziali non valide"

                throw new Error(backendMessage)
            }

            navigate("/homepage")
        } catch (submitError) {
            let message = "Errore durante il login"
            if (submitError instanceof Error) {
                console.log(submitError.message)
                message = "Non sei connesso ad Internet"
            }
            setError(message)
            toast.error("Login fallito: " + message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card className="w-full sm:max-w-sm absolute rounded-none sm:rounded-xl">
            <CardTitle className="px-6 text-lg sm:text-xl">{t("title")}</CardTitle>
            <Separator orientation="horizontal"></Separator>
            <form onSubmit={handleSubmit} className="gap-4 flex flex-col">
                <CardContent>
                    <div className="flex flex-col">
                        <div className="grid gap-2 mb-6">
                            <Label htmlFor="email">{t("fields.email.label")}</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="mariorossi@gmail.com"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2 mb-2">
                            <div className="flex justify-between gap-1 flex-row sm:items-center">
                                <Label htmlFor="password">{t("fields.password.label")}</Label>
                                <a
                                    href="#"
                                    className="inline-block text-xs underline-offset-4 hover:underline sm:ml-auto sm:text-sm"
                                >
                                    {t("links.forgotPassword")}
                                </a>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder={t("fields.password.placeholder")}
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 cursor-pointer"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
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
                        {isSubmitting ? t("submitting") : t("buttons.submit")}
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
                    <Button variant={"secondary"} onClick={() => navigate("/register")} className="w-full" disabled={isSubmitting}>
                        {t("links.register")}
                    </Button>
                </CardFooter>
            </form>
        </Card >
    )
}

export default LoginForm