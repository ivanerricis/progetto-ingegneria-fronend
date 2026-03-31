import { Footer } from "@/components/footer";
import Header from "@/components/header";
import { ModeToggle } from "@/components/mode-toggle";
import { RequestResetPasswordFormAccount } from "./components/requestResetPasswordFormAccount";
import Content from "@/components/content";
import { useParams } from "react-router-dom";
import { RequestResetPasswordFormAgent } from "./components/requestResetPasswordFormAgent";
import ButtonBack from "@/components/buttonBack";

const RequestResetPassword = () => {
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
                {type === "agent" ? (
                    <RequestResetPasswordFormAgent />
                ) : (
                    <RequestResetPasswordFormAccount />
                )}
            </Content>

            <Footer />
        </div>
    );
}

export default RequestResetPassword;