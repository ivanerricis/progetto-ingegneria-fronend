import { Footer } from "@/components/footer"
import Header from "@/components/header"
import LoginForm from "@/pages/Account/Login/components/loginForm"
import sfondo from "@/assets/sfondo.jpg"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Earth } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export const Login = () => {
    const navigate = useNavigate()

    return (
        <div className="flex h-screen flex-col sm:gap-2 overflow-hidden">
            <Header
                left={
                    <>
                        <Button variant={"outline"} onClick={() => navigate("/agent/login")}>
                            Console agenti
                        </Button>
                        <Button variant={"outline"} onClick={() => navigate("/create-agency")}>
                            Crea agenzia
                        </Button>
                    </>
                }
                mobileLeftMenuItems={[
                    { label: "Console agenti", onSelect: () => navigate("/agent/login") },
                    { label: "Crea agenzia", onSelect: () => navigate("/create-agency") },
                ]}
                right={
                    <>
                        <ModeToggle />
                        <Button variant={"outline"}>
                            <Earth />
                            Italiano
                        </Button>
                    </>
                }
            />

            <main className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden sm:rounded-xl sm:mx-26">
                <img
                    src={sfondo}
                    alt="description"
                    className="h-full w-full object-cover"
                />
                <LoginForm />
            </main>

            <Footer />
        </div>
    )
}

export default Login