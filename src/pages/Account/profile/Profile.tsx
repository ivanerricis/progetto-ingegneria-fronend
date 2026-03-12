import { PasswordStrength } from "@/components/passwordStrength";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAccount } from "@/providers/account-provider";
import { Check, Pencil } from "lucide-react";
import { useState } from "react";

export default function Profile() {
    const [disable, setDisable] = useState(true)
    const { account } = useAccount()

    if (!account) return null;

    return (
        <div className="w-full h-full flex items-center justify-center px-10 sm:px-40">
            <div className="flex flex-col justify-start items-center gap-8 w-full h-full pt-40">
                <div className="flex flex-col gap-6">
                    <Label className="text-2xl font-bold w-full h-full">Le tue informazioni</Label>

                    {/* First Name + Last Name */}
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-1 w-full">
                            <Label className="text-xl text-nowrap">Nome</Label>
                            <Input disabled className="w-full" value={account.firstName} />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <Label className="text-xl text-nowrap">Cognome</Label>
                            <Input disabled className="w-full" value={account.lastName} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 flex-1">
                        <Label className="text-xl text-nowrap">Email</Label>
                        <Input disabled className="w-full" value={account.email} />
                    </div>

                    {/* Email + Password */}
                    <div className="flex gap-4">
                        <div className="flex gap-6 flex-1">
                            <div className="flex flex-col gap-1 w-full">
                                <Label className="text-xl">Password</Label>
                                <div className="flex gap-4 w-full">
                                    <PasswordStrength big disable={disable} />
                                    <div className="flex gap-2">
                                        <Button
                                            disabled={!disable}
                                            onClick={() => setDisable(!disable)}
                                            className="flex items-center justify-center">
                                            <Pencil />
                                            Modifica
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex">
                        <Button
                            variant={"confirm"}
                            disabled={disable}
                            onClick={() => setDisable(!disable)}
                            className={`flex items-center justify-center ${disable ? "hidden" : "flex items-center justify-start"} `}>
                            <Check className="size-5" />
                            Salva
                        </Button>
                    </div>
                </div>
                <div className="flex">
                    <Button variant="destructive">Elimina account</Button>
                </div>
            </div>
        </div>
    );
}