import { Footer } from "@/components/footer";
import Header from "@/components/header";
import { ModeToggle } from "@/components/mode-toggle";
import { ResetPasswordForm } from "./components/resetPasswordForm";
import ButtonBack from "@/components/buttonBack";
import Content from "@/components/content";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
    const { token } = useParams();
    const { type } = useParams();

    return (
        <div className="h-screen flex flex-col overflow-hidden sm:gap-2">
            <Header
                left={
                    <ButtonBack to={type === "agent" ? "/agent/login" : "/account/login"} />
                }
                right={
                    <ModeToggle />
                }
            />

            <Content>
                <ResetPasswordForm type={type} token={token} />
            </Content>

            <Footer />
        </div>
    );
}

export default ResetPassword;