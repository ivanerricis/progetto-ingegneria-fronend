import { Footer } from "@/components/footer";
import Header from "@/components/header";
import LanguageSwitcher from "@/components/languageSwitcher";
import { ModeToggle } from "@/components/mode-toggle";
import { SendResetPasswordForm } from "./components/sendResetPasswordForm";
import ButtonBack from "@/components/buttonBack";
import Content from "@/components/content";
import { useParams } from "react-router-dom";

const SendResetPassword = () => {
    const { token } = useParams();

    console.log("Token per reset password:", token);

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
                <SendResetPasswordForm token={token} />
            </Content>

            <Footer />
        </div>
    );
}

export default SendResetPassword;