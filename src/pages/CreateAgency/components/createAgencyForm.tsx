import { useState, type FormEvent } from "react"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Stepper } from "@/components/stepper"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { apiClient } from "@/lib/api/config"
import { Label } from "@/components/ui/label"

const steps = ["Agenzia", "Amministratore", "Conferma"]

export const CreateAgencyForm = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState(0)

    const [agencyName, setAgencyName] = useState("")
    const [agencyPhone, setAgencyPhone] = useState("")
    const [email, setEmail] = useState("")
    const [logoFile, setLogoFile] = useState<File | null>(null)

    const [adminName, setAdminName] = useState("")
    const [adminLastName, setAdminLastName] = useState("")
    const [adminPhone, setAdminPhone] = useState("")

    const [loading, setLoading] = useState(false)

    const next = () => setStep((s) => Math.min(s + 1, steps.length - 1))
    const back = () => setStep((s) => Math.max(s - 1, 0))

    const handleSubmit = async (e?: FormEvent) => {
        e?.preventDefault()
        setLoading(true)

        const formData = new FormData()
        formData.append("name", agencyName)
        formData.append("agencyPhoneNumber", "+39" + agencyPhone)
        formData.append("email", email)
        if (logoFile) formData.append("logo", logoFile)
        formData.append("firstName", adminName)
        formData.append("lastName", adminLastName)
        formData.append("agentPhoneNumber", "+39" + adminPhone)

        try {
            await apiClient.post("/auth/agency/create", formData)
            toast.success("Agenzia creata con successo!")
            navigate("/homepage")
        } catch (err: any) {
            toast.error(err?.response?.data?.message ?? "Errore")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="w-full flex justify-between px-6 border-none shadow-none sm:shadow-sm sm:px-0 sm:max-w-sm absolute h-109 rounded-none sm:rounded-xl">
            <CardTitle>Crea la tua agenzia</CardTitle>

            <form onSubmit={handleSubmit} className="gap-4 flex flex-col h-full">
                <CardContent className="flex flex-col">
                    <Stepper steps={steps} current={step} />

                    {/* STEP 1 */}
                    {step === 0 && (
                        <div className="flex flex-col gap-4">
                            <Input
                                placeholder="Nome agenzia"
                                value={agencyName}
                                onChange={e => setAgencyName(e.target.value)}
                                required
                            />
                            <Input
                                placeholder="Telefono agenzia"
                                value={agencyPhone}
                                onChange={e => setAgencyPhone(e.target.value)}
                                required
                            />
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={e => setLogoFile(e.target.files?.[0] ?? null)}
                                required
                            />
                        </div>
                    )}

                    {/* STEP 2 */}
                    {step === 1 && (
                        <div className="flex flex-col gap-4">
                            <Input
                                placeholder="Nome amministratore"
                                value={adminName}
                                onChange={e => setAdminName(e.target.value)}
                                required
                            />
                            <Input
                                placeholder="Cognome amministratore"
                                value={adminLastName}
                                onChange={e => setAdminLastName(e.target.value)}
                                required
                            />
                            <Input
                                placeholder="Telefono amministratore"
                                value={adminPhone}
                                onChange={e => setAdminPhone(e.target.value)}
                                required
                            />
                        </div>
                    )}

                    {/* STEP 3 */}
                    {step === 2 && (
                        <div className="flex flex-col gap-4 text-sm *:flex *:gap-2 *:*:text-lg">
                            <div>
                                <Label className="font-bold">Nome agenzia: </Label>
                                <Label>{agencyName}</Label>
                            </div>
                            <div>
                                <Label className="font-bold">Email: </Label>
                                <Label>{email}</Label>
                            </div>
                            <div>
                                <Label className="font-bold">Telefono agenzia: </Label>
                                <Label>{agencyPhone}</Label>
                            </div>
                            <div>
                                <Label className="font-bold">Nome amministratore: </Label>
                                <Label>{adminName}</Label>
                            </div>
                            <div>
                                <Label className="font-bold">Cognome amministratore: </Label>
                                <Label>{adminLastName}</Label>
                            </div>
                            <div>
                                <Label className="font-bold">Telefono amministratore: </Label>
                                <Label>{adminPhone}</Label>
                            </div>
                        </div>
                    )}
                </CardContent>
            </form>

            <CardFooter className="flex justify-between">
                {step === 0 && (
                    <div>

                    </div>
                )}
                {step > 0 && (
                    <Button variant="outline" onClick={back}>
                        Indietro
                    </Button>
                )}

                {step < steps.length - 1 ? (
                    <Button onClick={next}>Avanti</Button>
                ) : (
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Creazione..." : "Crea agenzia"}
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}

export default CreateAgencyForm