import { type FormEvent, useState } from "react"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { API_BASE_URL } from "@/lib/api/config"

export const CreateAgencyForm = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [agencyName, setAgencyName] = useState("")
    const [agencyPhone, setAgencyPhone] = useState("")
    const [adminName, setAdminName] = useState("")
    const [adminLastName, setAdminLastName] = useState("")
    const [adminPhone, setAdminPhone] = useState("")
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
                body: JSON.stringify({ email }),
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
            const message = submitError instanceof Error ? submitError.message : "Errore durante il login"
            setError(message)
            toast.error("Creazione agenzia fallita: " + message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card className="w-full px-20 border-none sm:px-0 sm:max-w-sm absolute rounded-none sm:rounded-xl" >
            <CardTitle>Crea la tua agenzia</CardTitle>
            <Separator orientation="horizontal" className="hidden sm:flex"/>
            <form onSubmit={handleSubmit} className="gap-4 flex flex-col">
                <CardContent>
                    <div className="flex flex-col">
                        <Label className="text-xl mb-2">Agenzia</Label>
                        <div className="flex flex-col gap-2 mb-4">
                            <Label htmlFor="agencyName">
                                Nome
                                <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="agencyName"
                                type="text"
                                placeholder="Nome agenzia"
                                value={agencyName}
                                onChange={(event) => setAgencyName(event.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2 mb-4">
                            <Label htmlFor="agency_phone">
                                Numero di telefono
                                <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="agency_phone"
                                type="number"
                                placeholder="Numero di telefono"
                                value={agencyPhone}
                                onChange={(event) => setAgencyPhone(event.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2 mb-4">
                            <Label htmlFor="email">
                                Email
                                <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="mariorossi@gmail.com"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2 mb-4">
                            <Label htmlFor="picture">
                                Foto
                                <span className="text-destructive">*</span>
                            </Label>
                            <Input id="picture" type="file" accept="image/*" />
                        </div>

                        <Separator orientation="horizontal" className="mb-4" />

                        <div className="flex flex-col">
                            <Label className="text-xl mb-2">Amministratore</Label>
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-2 mb-4">
                                    <Label htmlFor="adminName">
                                        Nome
                                        <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="adminName"
                                        type="text"
                                        placeholder="Mario"
                                        value={adminName}
                                        onChange={(event) => setAdminName(event.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2 mb-4">
                                    <Label htmlFor="adminLastName">
                                        Cognome
                                        <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="adminLastName"
                                        type="text"
                                        placeholder="Rossi"
                                        value={adminLastName}
                                        onChange={(event) => setAdminLastName(event.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 mb-4">
                                <Label htmlFor="admin_phone">
                                    Numero di telefono
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="admin_phone"
                                    type="number"
                                    placeholder="Numero di telefono"
                                    value={adminPhone}
                                    onChange={(event) => setAdminPhone(event.target.value)}
                                    required
                                />
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
                        {isSubmitting ? "Creazione in corso..." : "Crea agenzia"}
                    </Button>
                </CardFooter>
            </form>
        </Card >
    )
}

export default CreateAgencyForm