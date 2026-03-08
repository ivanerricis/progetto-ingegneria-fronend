import { Footer } from "@/components/footer"
import Header from "@/components/header"
import LoginForm from "@/pages/Agent/LoginAgent/components/loginForm"
import sfondo from "@/assets/sfondo.jpg"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useNavigate } from "react-router-dom"
import LanguageSwitcher from "@/components/languageSwitcher"

export const LoginAgent = () => {
    const navigate = useNavigate()

    return (
        <div className="h-screen flex flex-col overflow-hidden sm:gap-2">
            <Header
                left={
                    <>
                        <Button variant={"outline"} onClick={() => navigate("/login")}>
                            Console utente
                        </Button>
                        <Button variant={"outline"} onClick={() => navigate("/create-agency")}>
                            Crea agenzia
                        </Button>
                    </>
                }
                mobileLeftMenuItems={[
                    { label: "Console utente", onSelect: () => navigate("/login") },
                    { label: "Crea agenzia", onSelect: () => navigate("/create-agency") },
                ]}
                right={
                    <>
                        <ModeToggle />
                        <LanguageSwitcher />
                    </>
                }
            />

            <main className="relative flex-1 min-h-0 flex items-center justify-center overflow-hidden sm:rounded-xl sm:mx-26">
                <img
                    src={sfondo}
                    alt="description"
                    className="w-full h-full object-cover"
                />
                <LoginForm />
            </main>

            <Footer />
        </div>
    )
}

export default LoginAgent