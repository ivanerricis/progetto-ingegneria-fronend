import { type FormEvent, useState } from "react"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import AgencyCombobox from "./agencyCombobox"
import { useTranslation } from "react-i18next"
import { useAgencies } from "@/hooks/agent/useAgency"
import { loginAgent } from "@/lib/api/auth"
import { useAgent } from "@/providers/agent-provider"

export const LoginForm = () => {
    const navigate = useNavigate()
    const { t } = useTranslation("loginAgent")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [selectedAgencyId, setSelectedAgencyId] = useState("")
    const [loginError, setLoginError] = useState<string | null>(null)
    const { agencies, loading, error } = useAgencies()
    const { setAgent } = useAgent()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoginError(null)
        setIsSubmitting(true)

        try {
            if (!selectedAgencyId) {
                throw new Error("Seleziona un'agenzia")
            }

            const loginResponse = await loginAgent({
                username,
                password,
                agencyId: Number(selectedAgencyId),
            })

            const responseAgent =
                (loginResponse && typeof loginResponse === "object" && "agent" in loginResponse
                    ? loginResponse.agent
                    : null) ??
                (loginResponse && typeof loginResponse === "object" && "user" in loginResponse
                    ? loginResponse.user
                    : null)

            const selectedAgency = agencies.find((agency) => String(agency.id) === selectedAgencyId)

            if (responseAgent && typeof responseAgent === "object") {
                setAgent({
                    id: "id" in responseAgent ? (responseAgent.id as string | number) : undefined,
                    username: "username" in responseAgent ? String(responseAgent.username ?? "") : username,
                    firstName: "firstName" in responseAgent ? String(responseAgent.firstName ?? "") : undefined,
                    lastName: "lastName" in responseAgent ? String(responseAgent.lastName ?? "") : undefined,
                    email: "email" in responseAgent ? String(responseAgent.email ?? "") : undefined,
                    agencyId: Number(selectedAgencyId),
                    agencyName: selectedAgency?.name,
                })
            } else {
                setAgent({
                    username,
                    agencyId: Number(selectedAgencyId),
                    agencyName: selectedAgency?.name,
                })
            }

            navigate("/agent/dashboard")
        } catch (submitError) {
            const message =
                submitError instanceof Error
                    ? submitError.message
                    : "Errore durante il login"

            setLoginError(message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card className="w-full px-14 border-none shadow-none sm:shadow-sm sm:px-0 sm:max-w-md absolute rounded-none sm:rounded-xl" >
            <CardTitle>Accedi</CardTitle>
            <Separator orientation="horizontal" className="hidden sm:flex"/>
            <form onSubmit={handleSubmit} className="gap-4 flex flex-col">
                <CardContent>
                    <div className="flex flex-col">
                        <div className="grid gap-2 mb-6">
                            <Label htmlFor="agency">Seleziona un'agenzia</Label>
                            <AgencyCombobox
                                agencies={agencies}
                                value={selectedAgencyId}
                                onValueChange={setSelectedAgencyId}
                                loading={loading}
                                loadError={error}
                            />
                        </div>
                        <div className="grid gap-2 mb-6">
                            <Label htmlFor="username">{t("fields.username.label")}</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder={t("fields.username.placeholder")}
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2 mb-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">{t("fields.password.label")}</Label>
                                <a
                                    href="#"
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
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
                                    onClick={() => setShowPassword(v => !v)}
                                    aria-label={showPassword ? "Nascondi password" : "Mostra password"}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 cursor-pointer"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>
                        {loginError && (
                            <p className="text-sm text-destructive" role="alert">
                                {loginError}
                            </p>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? t("buttons.submitting") : t("buttons.submit")}
                    </Button>
                </CardFooter>
            </form>
        </Card >
    )
}

export default LoginForm