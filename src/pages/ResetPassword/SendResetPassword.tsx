import { Footer } from "@/components/footer";
import Header from "@/components/header";
import LanguageSwitcher from "@/components/languageSwitcher";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import sfondo from "@/assets/sfondo.webp";
import { SendResetPasswordForm } from "./components/sendResetPasswordForm";

const SendResetPassword = () => {
    const navigate = useNavigate()

    const handleGoBack = () => {
        if (window.history.length > 1) {
            navigate(-1)
            return
        }

        navigate("/account/login")
    }

    return (
        <div className="h-screen flex flex-col overflow-hidden sm:gap-2">
            <Header
                left={
                    <>
                        <Button
                            className="size-10 sm:w-fit sm:h-10 sm:px-4 sm:py-2"
                            variant={"outline"}
                            onClick={handleGoBack}
                        >
                            <ArrowLeft className="size-5" />
                            <Label className="hidden sm:flex text-lg">Torna indietro</Label>
                        </Button>
                    </>
                }
                right={
                    <>
                        <ModeToggle />
                        <LanguageSwitcher />
                    </>
                }
            />
            <main className="relative flex-1 min-h-0 flex items-center justify-center sm:rounded-xl overflow-hidden overflow-y-auto sm:mx-26">
                <div
                    className="hidden sm:block absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${sfondo})` }}
                />
                <SendResetPasswordForm />
            </main>
            <Footer />
        </div>
    );
}

export default SendResetPassword;