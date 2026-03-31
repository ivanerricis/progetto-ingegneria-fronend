import { Footer } from "@/components/footer"
import Header from "@/components/header"
import LoginForm from "@/pages/Agent/login-agent/components/loginForm"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useNavigate } from "react-router-dom"
import { Label } from "@/components/ui/label"
import Content from "@/components/content"

export const LoginAgent = () => {
    const navigate = useNavigate()

    return (
        <div className="h-screen flex flex-col overflow-hidden sm:gap-2">
            <Header
                left={
                    <>
                        <Button variant={"outline"} size={"lg"} onClick={() => navigate("/login")}>
                            <Label className="text-lg">Console utente</Label>
                        </Button>
                        <Button variant={"outline"} size={"lg"} onClick={() => navigate("/create-agency")}>
                            <Label className="text-lg">Crea agenzia</Label>
                        </Button>
                    </>
                }
                mobileLeftMenuItems={[
                    { label: "Console utente", onSelect: () => navigate("/login") },
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

export default LoginAgent