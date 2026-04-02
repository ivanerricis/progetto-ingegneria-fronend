import { Footer } from "@/components/footer"
import Header from "@/components/header"
import RegisterForm from "@/pages/Account/register/components/registerForm"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useNavigate } from "react-router-dom"
import Content from "@/components/content"
import { Label } from "@/components/ui/label"
import { CircleUserRound, HousePlus } from "lucide-react"

export const Register = () => {
    const navigate = useNavigate()

    return (
        <div className="flex h-screen flex-col sm:gap-2 overflow-hidden">
            <Header
                left={
                    <>
                        <Button variant={"outline"} size={"lg"} onClick={() => navigate("/agent/login")}>
                            <CircleUserRound className="size-5" />
                            <Label className="text-lg!">Console agenti</Label>
                        </Button>
                        <Button variant={"outline"} size={"lg"} onClick={() => navigate("/create-agency")}>
                            <HousePlus className="size-5" />
                            <Label className="text-lg!">Crea agenzia</Label>
                        </Button>
                    </>
                }
                mobileLeftMenuItems={[
                    { label: "Console agenti", onSelect: () => navigate("/agent/login") },
                    { label: "Crea agenzia", onSelect: () => navigate("/create-agency") },
                ]}
                right={
                    <ModeToggle />
                }
            />

            <Content>
                <RegisterForm />
            </Content>

            <Footer />
        </div>
    )
}

export default Register