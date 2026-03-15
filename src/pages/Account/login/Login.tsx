import { Footer } from "@/components/footer"
import Header from "@/components/header"
import LoginForm from "@/pages/Account/login/components/loginForm"
import sfondo from "@/assets/sfondo.webp"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { ModeToggle } from "@/components/mode-toggle"
import LanguageSwitcher from "@/components/languageSwitcher"
import { useEffect } from "react"
import { apiClient } from "@/lib/api/config"

export const Login = () => {
    const navigate = useNavigate()

    useEffect(() => {
        let isMounted = true

        const redirectIfAuthenticated = async () => {
            try {
                await apiClient.get("/auth/account")
                if (isMounted) {
                    navigate("/homepage", { replace: true })
                }
                return
            } catch {
                // Ignore and try agent session.
            }

            try {
                await apiClient.get("/auth/agent")
                if (isMounted) {
                    navigate("/agent/dashboard", { replace: true })
                }
            } catch {
                // Ignore: stay on account login.
            }
        }

        void redirectIfAuthenticated()

        return () => {
            isMounted = false
        }
    }, [navigate])

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
                        <LanguageSwitcher />
                    </>
                }
            />

            <main className="relative flex-1 min-h-0 flex items-center justify-center sm:rounded-xl overflow-hidden sm:mx-26">
                <div
                    className="hidden sm:block absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${sfondo})` }}
                />
                <LoginForm />
            </main>

            <Footer />
        </div>
    )
}

export default Login