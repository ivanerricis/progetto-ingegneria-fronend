import { Footer } from "@/components/footer";
import Header from "@/components/header";
import CreateAgencyForm from "@/pages/CreateAgency/components/createAgencyForm";
import { ModeToggle } from "@/components/mode-toggle";
import ButtonBack from "@/components/buttonBack";
import Content from "@/components/content";

const CreateAgency = () => {

    return (
        <div className="h-screen flex flex-col overflow-hidden sm:gap-2">
            <Header
                left={
                    <ButtonBack />
                }
                right={
                    <ModeToggle />
                }
            />

            <Content>
                <CreateAgencyForm />
            </Content>

            <Footer />
        </div>
    );
}

export default CreateAgency;