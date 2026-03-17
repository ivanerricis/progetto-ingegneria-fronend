import { type FormEvent, useState } from "react"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import axios from "axios"
import { apiClient } from "@/lib/api/config"

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
    const [logoFile, setLogoFile] = useState<File | null>(null)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError(null)
        setIsSubmitting(true)

        const formData = new FormData()
        formData.append("name", agencyName)
        formData.append("agencyPhoneNumber", "+39"+agencyPhone)
        formData.append("email", email)
        if (logoFile) {
            formData.append("logo", logoFile)
        }
        formData.append("firstName", adminName)
        formData.append("lastName", adminLastName)
        formData.append("agentPhoneNumber", "+39"+adminPhone)

        try {
            await apiClient.post("/auth/agency/create", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            toast.success("Agenzia creata con successo!")
            navigate("/homepage")
        } catch (submitError) {
            let message = "Errore durante la creazione dell'agenzia"
            if (axios.isAxiosError(submitError)) {
                message =
                    submitError.response?.data?.error ??
                    submitError.response?.data?.message ??
                    "Errore generico"
            } else if (submitError instanceof Error) {
                message = submitError.message
            }
            setError(message)
            toast.error("Creazione agenzia fallita: " + message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Card className="w-full px-10 border-none shadow-none sm:shadow-sm sm:px-0 sm:max-w-sm absolute rounded-none sm:rounded-xl" >
            <CardTitle>Crea la tua agenzia</CardTitle>
            <Separator orientation="horizontal" className="hidden sm:flex" />
            <form onSubmit={handleSubmit} className="gap-4 flex flex-col">
                <CardContent>
                    <div className="flex flex-col">
                        <Label className="text-xl mb-2">Agenzia</Label>
                        <div className="flex flex-col gap-2 mb-4">
                            <Label htmlFor="name">
                                Nome
                                <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Nome agenzia"
                                value={agencyName}
                                onChange={(event) => setAgencyName(event.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-2 mb-4">
                            <Label htmlFor="agencyPhoneNumber">
                                Numero di telefono
                                <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="agencyPhoneNumber"
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
                                Logo
                                <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="picture"
                                type="file"
                                accept="image/*"
                                required
                                onChange={e => {
                                    if (e.target.files && e.target.files[0]) {
                                        setLogoFile(e.target.files[0])
                                    } else {
                                        setLogoFile(null)
                                    }
                                }}
                            />
                        </div>

                        <Separator orientation="horizontal" className="mb-4" />

                        <div className="flex flex-col">
                            <Label className="text-xl mb-2">Amministratore</Label>
                            <div className="flex gap-4">
                                <div className="flex flex-col gap-2 mb-4">
                                    <Label htmlFor="firstName">
                                        Nome
                                        <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="firstName"
                                        type="text"
                                        placeholder="Mario"
                                        value={adminName}
                                        onChange={(event) => setAdminName(event.target.value)}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col gap-2 mb-4">
                                    <Label htmlFor="lastName">
                                        Cognome
                                        <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="lastName"
                                        type="text"
                                        placeholder="Rossi"
                                        value={adminLastName}
                                        onChange={(event) => setAdminLastName(event.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 mb-4">
                                <Label htmlFor="agentPhoneNumber">
                                    Numero di telefono
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="agentPhoneNumber"
                                    type="number"
                                    placeholder="Numero di telefono"
                                    value={adminPhone}
                                    onChange={(event) => setAdminPhone(event.target.value)}
                                    required
                                />
                            </div>
                        </div>
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