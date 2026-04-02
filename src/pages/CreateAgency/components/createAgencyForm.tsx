import { useState } from "react"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { apiClient } from "@/lib/api/config"
import { Label } from "@/components/ui/label"
import { Stepper } from "@/components/stepper"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Image, Mail, Phone, User } from "lucide-react"

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

    const handleSubmit = async () => {
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
        } catch (submitError) {
            const message =
                submitError instanceof Error
                    ? submitError.message
                    : "Errore durante la creazione dell'agenzia"

            toast.error("Creazione agenzia fallita: " + message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="w-full flex justify-between px-6 border-none shadow-none sm:shadow-sm sm:px-0 sm:max-w-sm absolute h-115 rounded-none sm:rounded-xl">
            <CardTitle>Crea la tua agenzia</CardTitle>

                <CardContent className="flex flex-col gap-4 h-full">
                    <Stepper steps={steps} current={step} />

                    {/* STEP 1 */}
                    {step === 0 && (
                        <div className="flex flex-col gap-4">
                            <InputGroup>
                                <InputGroupInput
                                    placeholder="Nome agenzia"
                                    value={agencyName}
                                    onChange={e => setAgencyName(e.target.value)}
                                    className="text-lg!"
                                    required
                                    autoFocus
                                />
                                <InputGroupAddon>
                                    <User />
                                </InputGroupAddon>
                            </InputGroup>
                            <InputGroup>
                                <InputGroupInput
                                    placeholder="Telefono agenzia"
                                    value={agencyPhone}
                                    type="number"
                                    min={0}
                                    onChange={e => setAgencyPhone(e.target.value)}
                                    className="text-lg!"
                                    required
                                />
                                <InputGroupAddon>
                                    <Phone />
                                </InputGroupAddon>
                            </InputGroup>
                            <InputGroup>
                                <InputGroupInput
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="text-lg!"
                                    required
                                />
                                <InputGroupAddon>
                                    <Mail />
                                </InputGroupAddon>
                            </InputGroup>
                            <InputGroup>
                                <InputGroupInput
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setLogoFile(e.target.files?.[0] ?? null)}
                                    className="text-lg!"
                                    required
                                />
                                <InputGroupAddon>
                                    <Image />
                                </InputGroupAddon>
                            </InputGroup>
                        </div>
                    )}

                    {/* STEP 2 */}
                    {step === 1 && (
                        <div className="flex flex-col gap-4">
                            <InputGroup>
                                <InputGroupInput
                                    placeholder="Nome amministratore"
                                    value={adminName}
                                    onChange={e => setAdminName(e.target.value)}
                                    className="text-lg!"
                                    required
                                />
                                <InputGroupAddon>
                                    <User />
                                </InputGroupAddon>
                            </InputGroup>
                            <InputGroup>
                                <InputGroupInput
                                    placeholder="Cognome amministratore"
                                    value={adminLastName}
                                    onChange={e => setAdminLastName(e.target.value)}
                                    className="text-lg!"
                                    required
                                />
                                <InputGroupAddon>
                                    <User />
                                </InputGroupAddon>
                            </InputGroup>
                            <InputGroup>
                                <InputGroupInput
                                    placeholder="Telefono amministratore"
                                    value={adminPhone}
                                    onChange={e => setAdminPhone(e.target.value)}
                                    className="text-lg!"
                                    required
                                />
                                <InputGroupAddon>
                                    <Phone />
                                </InputGroupAddon>
                            </InputGroup>
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

                <CardFooter className="flex justify-between">
                    {step === 0 && (
                        <div>

                        </div>
                    )}
                    {step > 0 && (
                        <Button type="button" variant="outline" onClick={back}>
                            Indietro
                        </Button>
                    )}

                    {step < steps.length - 1 ? (
                        <Button type="button" onClick={next}>Avanti</Button>
                    ) : (
                        <Button
                            type="submit"
                            disabled={loading}
                            onClick={handleSubmit}
                        >
                            {loading ? "Creazione..." : "Crea agenzia"}
                        </Button>
                    )}
                </CardFooter>
        </Card>
    )
}

export default CreateAgencyForm