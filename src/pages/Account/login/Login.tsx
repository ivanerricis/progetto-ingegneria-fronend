import { Footer } from "@/components/footer"
import Header from "@/components/header"
import LoginForm from "@/pages/Account/login/components/loginForm"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { ModeToggle } from "@/components/mode-toggle"
import { Label } from "@/components/ui/label"
import Content from "@/components/content"

export const Login = () => {
    const navigate = useNavigate()

    return (
        <div className="flex h-screen flex-col sm:gap-2 overflow-hidden">
            <Header
                left={
                    <>
                        <Button variant={"outline"} size={"lg"} onClick={() => navigate("/agent/login")}>
                            <Label className="text-lg">Console agenti</Label>
                        </Button>
                        <Button variant={"outline"} size={"lg"} onClick={() => navigate("/create-agency")}>
                            <Label className="text-lg">Crea agenzia</Label>
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
                <LoginForm />
            </Content>

            <Footer />
        </div>
    )
}

export default Login