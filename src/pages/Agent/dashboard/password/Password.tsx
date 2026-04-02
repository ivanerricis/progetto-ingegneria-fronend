import { type FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Footer } from "@/components/footer"
import { RegisterPasswordField, isRegisterPasswordValid } from "@/components/register-password-field"
import { updateAgentFirstLoginPassword, updateAgentPassword } from "@/lib/api/agent"
import { useAgent } from "@/providers/agent-provider"

export default function Password() {
    const navigate = useNavigate()
    const { agent, updateAgent } = useAgent()

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError(null)

        if (!agent) {
            const message = "Agente non valido"
            setError(message)
            toast.error(message)
            return
        }

        if (!currentPassword.trim()) {
            const message = "Inserisci la password attuale"
            setError(message)
            toast.error(message)
            return
        }

        if (!isRegisterPasswordValid(newPassword)) {
            const message = "La nuova password non rispetta i requisiti minimi"
            setError(message)
            toast.error(message)
            return
        }

        if (newPassword !== confirmPassword) {
            const message = "Le password non coincidono"
            setError(message)
            toast.error(message)
            return
        }

        if (newPassword === currentPassword) {
            const message = "La nuova password deve essere diversa dalla precedente"
            setError(message)
            toast.error(message)
            return
        }

        setIsSubmitting(true)

        try {
            if (agent.isPasswordChange) {
                await updateAgentPassword(String(agent.id), {
                    currentPassword,
                    newPassword,
                })
            } else {
                await updateAgentFirstLoginPassword({
                    currentPassword,
                    newPassword,
                })
                updateAgent({ ...agent, isPasswordChange: true })
            }

            toast.success("Password aggiornata con successo")
            navigate("/agent/dashboard/profile")
        } catch (submitError) {
            const message = submitError instanceof Error ? submitError.message : "Errore durante l'aggiornamento password"
            setError(message)
            toast.error(message)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!agent) {
        return null
    }

    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex-1 flex flex-col items-center justify-center w-full gap-4">
                <Label className="text-xl font-bold">Aggiorna password</Label>
                <form onSubmit={handleSubmit} className="w-full px-4 sm:max-w-md">
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="current-password">Password attuale</Label>
                            <div className="relative">
                                <Input
                                    id="current-password"
                                    value={currentPassword}
                                    onChange={(event) => setCurrentPassword(event.currentTarget.value)}
                                    type={showCurrentPassword ? "text" : "password"}
                                    placeholder="Inserisci la password attuale"
                                    className="pr-10"
                                    required
                                    disabled={isSubmitting}
                                    autoFocus
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword((current) => !current)}
                                    className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    aria-label={showCurrentPassword ? "Nascondi password" : "Mostra password"}
                                >
                                    {showCurrentPassword ? <EyeOff size={16} strokeWidth={1.75} /> : <Eye size={16} strokeWidth={1.75} />}
                                </button>
                            </div>
                        </div>

                        <RegisterPasswordField
                            value={newPassword}
                            onChange={setNewPassword}
                            disabled={isSubmitting}
                            label="Nuova password"
                            placeholder="Inserisci la nuova password"
                        />

                        <div className="grid gap-2">
                            <Label htmlFor="confirm-password">Conferma nuova password</Label>
                            <div className="relative">
                                <Input
                                    id="confirm-password"
                                    value={confirmPassword}
                                    onChange={(event) => setConfirmPassword(event.currentTarget.value)}
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Ripeti la nuova password"
                                    className="pr-10"
                                    required
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((current) => !current)}
                                    className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    aria-label={showConfirmPassword ? "Nascondi password" : "Mostra password"}
                                >
                                    {showConfirmPassword ? <EyeOff size={16} strokeWidth={1.75} /> : <Eye size={16} strokeWidth={1.75} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <p className="text-sm text-destructive" role="alert">
                                {error}
                            </p>
                        )}
                    </div>
                    <div className="flex sm:flex-col gap-2 mt-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full flex-1"
                            onClick={() => navigate("/agent/dashboard/profile")} disabled={isSubmitting}>
                            Annulla
                        </Button>
                        <Button
                            type="submit"
                            className="w-full flex-1"
                            disabled={isSubmitting}>
                            {isSubmitting ? "Salvataggio..." : "Salva"}
                        </Button>
                    </div>
                </form>
            </div>
            <Footer isHomepage />
        </div>
    )
}
