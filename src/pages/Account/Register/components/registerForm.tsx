import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordStrength } from "@/components/passwordStrength"
import { Separator } from "@/components/ui/separator"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

export const RegisterForm = () => {
    const navigate = useNavigate()
    const {t} = useTranslation("register")

    return (
        <Card className="w-full sm:max-w-md absolute rounded-none sm:rounded-xl" >
            <CardTitle>{t("title")}</CardTitle>
            <Separator orientation="horizontal"></Separator>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row gap-x-2">
                            <div className="grid gap-2">
                                <Label htmlFor="firstname">
                                    {t("fields.firstName.label")}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="firstname"
                                    type="text"
                                    placeholder={t("fields.firstName.placeholder")}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="lastname">
                                    {t("fields.lastname.label")}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="lastname"
                                    type="text"
                                    placeholder={t("fields.lastname.placeholder")}
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">
                                {t("fields.email.label")}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder={t("fields.email.placeholder")}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <PasswordStrength />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                    {t("buttons.submit")}
                </Button>
                <Button variant="outline" className="w-full">
                    {t("buttons.google")}
                </Button>
                <div className="flex gap-2 w-full items-center">
                    <Separator />
                    <div className="text-center text-sm text-muted-foreground">
                        {t("texts.or")}
                    </div>
                    <Separator />
                </div>
                <Button variant={"secondary"} onClick={() => navigate("/login")} className="w-full">
                    {t("buttons.login")}
                </Button>
            </CardFooter>
        </Card >
    )
}

export default RegisterForm