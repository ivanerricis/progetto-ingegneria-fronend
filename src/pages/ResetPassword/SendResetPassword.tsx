import { Footer } from "@/components/footer";
import Header from "@/components/header";
import LanguageSwitcher from "@/components/languageSwitcher";
import { ModeToggle } from "@/components/mode-toggle";
import { SendResetPasswordForm } from "./components/sendResetPasswordForm";
import ButtonBack from "@/components/buttonBack";
import Content from "@/components/content";

const SendResetPassword = () => {

    return (
        <div className="h-screen flex flex-col overflow-hidden sm:gap-2">
            <Header
                left={
                    <ButtonBack />
                }
                right={
                    <>
                        <ModeToggle />
                        <LanguageSwitcher />
                    </>
                }
            />

            <Content>
                <SendResetPasswordForm />
            </Content>

            <Footer />
        </div>
    );
}

export default SendResetPassword;