import { Footer } from "@/components/footer";
import Header from "@/components/header";
import CreateAgencyForm from "@/pages/CreateAgency/components/createAgencyForm";
import sfondo from "@/assets/sfondo.jpg"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Earth } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

const CreateAgency = () => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col w-full h-screen items-center justify-center">
            <Header
                left={
                    <>
                        <Button variant={"outline"} onClick={() => navigate("/agent/login")}>
                            Console agenti
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
                <CreateAgencyForm />
            </main>
            <Footer />
        </div>
    );
}

export default CreateAgency;