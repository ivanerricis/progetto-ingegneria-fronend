import { Footer } from "@/components/footer"
import Header from "@/components/header"
import sfondo from "@/assets/sfondo.jpg"
import RegisterForm from "@/pages/Account/Register/components/registerForm"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Earth } from "lucide-react"
import { useNavigate } from "react-router-dom"

export const Register = () => {
    const navigate = useNavigate()

    return (
        <div className="h-screen flex flex-col overflow-hidden gap-2">
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

            <main className="relative flex-1 min-h-0 flex items-center justify-center rounded-xl overflow-hidden mx-26">
                <img
                    src={sfondo}
                    alt="description"
                    className="w-full h-full object-cover"
                />
                <RegisterForm />
            </main>

            <Footer />
        </div>
    )
}

export default Register