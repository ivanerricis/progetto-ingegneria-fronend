import { type FormEvent, useState } from "react"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"
import AgencyCombobox from "./agencyCombobox"

export const LoginForm = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? ""

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError(null)
        setIsSubmitting(true)

        try {
            const response = await fetch(`${apiBaseUrl}/auth/agent/login`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
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

            navigate("/agent/dashboard")
        } catch (submitError) {
            const message = submitError instanceof Error ? submitError.message : "Errore durante il login"
            setError(message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card className="w-full max-w-sm absolute" >
            <CardTitle>Accedi</CardTitle>
            <Separator orientation="horizontal" />
            <form onSubmit={handleSubmit} className="gap-4 flex flex-col">
                <CardContent>
                    <div className="flex flex-col">
                        <div className="grid gap-2 mb-6">
                            <Label htmlFor="agency">Seleziona un'agenzia</Label>
                            <AgencyCombobox />
                        </div>
                        <div className="grid gap-2 mb-6">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="mariorossi123"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2 mb-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <a
                                    href="#"
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
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Nascondi password" : "Mostra password"}
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
                        {isSubmitting ? "Accesso in corso..." : "Accedi"}
                    </Button>
                </CardFooter>
            </form>
        </Card >
    )
}

export default LoginForm