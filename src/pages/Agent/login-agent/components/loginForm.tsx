import { type FormEvent, useState } from "react"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import AgencyCombobox from "./agencyCombobox"
import { useAgencies } from "@/hooks/agent/useAgency"
import { loginAgent } from "@/lib/api/auth"
import { useAgent } from "@/providers/agent-provider"
import type { Agent } from "@/types/types"
import { toast } from "sonner"

export const LoginForm = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [selectedAgencyId, setSelectedAgencyId] = useState("")
    const { agencies, loading, error } = useAgencies()
    const { updateAgent } = useAgent()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsSubmitting(true)

        try {
            if (!selectedAgencyId) {
                throw new Error("Seleziona un'agenzia")
            }

            const loginResponse: Agent = await loginAgent({
                username,
                password,
                agencyId: Number(selectedAgencyId),
            })

            if (loginResponse) {
                console.log("Login response:", loginResponse)
                updateAgent(loginResponse)
                window.location.replace("/agent/dashboard")
            } else {
                updateAgent({
                    id: -1,
                    username: "",
                    firstName: "",
                    lastName: "",
                    phoneNumber: "",
                    createdAt: new Date(),
                    isPasswordChange: false,
                    isAdmin: false,
                    agency: {
                        id: "",
                        name: "",
                        phoneNumber: "",
                        email: "",
                        logo: {
                            id: "",
                            format: "",
                            url: "",
                        },
                    },
                })
            }

            navigate("/agent/dashboard")
        } catch (submitError) {
            const message =
                submitError instanceof Error
                    ? submitError.message
                    : "Errore durante il login"

            toast.error("Login fallito: " + message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card className="w-full px-6 border-none shadow-none sm:shadow-sm sm:px-0 sm:max-w-md absolute rounded-none sm:rounded-xl" >
            <CardTitle>Accedi</CardTitle>
            <Separator orientation="horizontal" className="hidden sm:flex" />
            <form onSubmit={handleSubmit} className="gap-2 flex flex-col sm:p-2">
                <CardContent>
                    <div className="flex flex-col">
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
                        <div className="grid gap-1 mb-4">
                            <Label htmlFor="username" className="text-lg">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="mariorossi123"
                                className="text-lg!"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-1 mb-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-lg">Password</Label>
                                <a
                                    href="/agent/request-reset-password"
                                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                >
                                    Hai dimenticato la password?
                                </a>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="La tua password"
                                    className="text-lg! pr-9"
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
                    </div>
                </CardContent>
                <CardFooter className="flex-col gap-2 mt-2">
                    <Button
                        size={"lg"}
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Accesso in corso..." : "Accedi"}
                    </Button>
                </CardFooter>
            </form>
        </Card >
    )
}

export default LoginForm