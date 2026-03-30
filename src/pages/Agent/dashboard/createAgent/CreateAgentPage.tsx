import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { CreateAgent } from "@/lib/api/agent";
import { Phone, User } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateAgentPage = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        isAdmin: false,
    })

    const handleCreateAgent = async (e: FormEvent) => {
        e.preventDefault()
        try {
            if (!form.firstName || !form.lastName || !form.phoneNumber) {
                throw new Error("Compila tutti i campi")
            }
            
            let phoneNumber = form.phoneNumber.trim();
            if (!phoneNumber.startsWith("+39")) {
                phoneNumber = "+39" + phoneNumber.replace(/^0+/, "");
            }
            await CreateAgent({ ...form, phoneNumber })
            toast.success("Agente creato con successo")
            navigate("/agent/dashboard/agents")
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Errore durante la creazione dell'agente")
        }
    }

    const handleCancel = () => {
        navigate("/agent/dashboard/agents")
    }

    return (
        <div className="w-full h-full flex items-center justify-center">
            <form
                onSubmit={handleCreateAgent}
                className="flex flex-col items-center justify-center gap-4 px-4 mb-16
            *:flex *:flex-col sm:*:flex-row *:items-center *:justify-between *:w-full *:gap-4
            ">
                <Label className="text-2xl font-bold justify-center!">Crea agente</Label>
                <div>
                    <div>
                        <Label htmlFor="firstName" className="text-lg">Nome</Label>
                        <InputGroup>
                            <InputGroupAddon>
                                <User />
                            </InputGroupAddon>
                            <InputGroupInput
                                id="firstName"
                                type="text"
                                placeholder="Mario"
                                className="text-lg!"
                                value={form.firstName}
                                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                                required
                            />
                        </InputGroup>
                    </div>
                    <div>
                        <Label htmlFor="lastName" className="text-lg">Cognome</Label>
                        <InputGroup>
                            <InputGroupAddon>
                                <User />
                            </InputGroupAddon>
                            <InputGroupInput
                                id="lastName"
                                type="text"
                                placeholder="Rossi"
                                className="text-lg!"
                                value={form.lastName}
                                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                                required
                            />
                        </InputGroup>
                    </div>
                </div>
                <div>
                    <div className="w-full">
                        <Label htmlFor="phoneNumber" className="text-lg">Numero di telefono</Label>
                        <InputGroup>
                            <InputGroupAddon>
                                <Phone />
                            </InputGroupAddon>
                            <InputGroupInput
                                id="phoneNumber"
                                type="tel"
                                placeholder="+39 123 456 789"
                                className="text-lg!"
                                value={form.phoneNumber}
                                onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
                                required
                            />
                        </InputGroup>
                    </div>
                    <div className="flex items-center sm:mt-6 gap-2 w-full">
                        <Label htmlFor="isAdmin" className="text-lg text-nowrap">È admin:</Label>
                        <Checkbox
                            id="isAdmin"
                            className="size-5"
                            checked={form.isAdmin}
                            onCheckedChange={(checked) => setForm({ ...form, isAdmin: !!checked })}
                        />
                    </div>
                </div>
                <div className="flex-row! mt-4">
                    <Button type="button" variant={"outline"} onClick={handleCancel}>
                        Annulla
                    </Button>
                    <Button type="submit">Crea agente</Button>
                </div>
            </form>
        </div>
    );
}

export default CreateAgentPage;