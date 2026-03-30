import { Footer } from "@/components/footer";
import Header from "@/components/header";
import LanguageSwitcher from "@/components/languageSwitcher";
import { ModeToggle } from "@/components/mode-toggle";
import { RequestResetPasswordForm } from "./components/requestResetPasswordForm";
import Content from "@/components/content";

const RequestResetPassword = () => {

    return (
        <div className="h-screen flex flex-col overflow-hidden sm:gap-2">
            <Header
                right={
                    <>
                        <ModeToggle />
                        <LanguageSwitcher />
                    </>
                }
            />

            <Content>
                <RequestResetPasswordForm />
            </Content>

            <Footer />
        </div>
    );
}

export default RequestResetPassword;