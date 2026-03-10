import { Footer } from "@/components/footer";
import Header from "@/components/header";
import CreateAgencyForm from "@/pages/CreateAgency/components/createAgencyForm";
import sfondo from "@/assets/sfondo.jpg"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Label } from "@/components/ui/label";
import LanguageSwitcher from "@/components/languageSwitcher";

const CreateAgency = () => {
    const navigate = useNavigate()

    const handleGoBack = () => {
        if (window.history.length > 1) {
            navigate(-1)
            return
        }

        navigate("/agent/login")
    }

    return (
        <div className="h-screen flex flex-col overflow-hidden sm:gap-2">
            <Header
                left={
                    <>
                        <Button className="flex items-center justify-center" variant={"outline"} onClick={handleGoBack}>
                            <ArrowLeft />
                            <Label className="hidden sm:flex">Torna indietro</Label>
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
            <main className="relative flex-1 min-h-0 flex items-center justify-center sm:rounded-xl overflow-hidden sm:mx-26">
                <div
                    className="hidden sm:block absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${sfondo})` }}
                />
                <CreateAgencyForm />
            </main>
            <Footer />
        </div>
    );
}

export default CreateAgency;