import { ArrowLeft } from "lucide-react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

type ButtonBackProps = Readonly<{
    to?: string
}>;

const ButtonBack = ({ to }: ButtonBackProps) => {
    const navigate = useNavigate()

    const handleGoBack = () => {
        if (to) navigate(to)
        if (window.history.length > 1) {
            navigate(-1)
            return
        }

        navigate("/account/login")
    }

    return (
        <Button
            className="size-10 sm:w-fit sm:h-10 sm:px-4 sm:py-2"
            variant={"outline"}
            onClick={handleGoBack}
        >
            <ArrowLeft className="size-5" />
            <Label className="hidden sm:flex text-lg">Torna indietro</Label>
        </Button>
    );
}

export default ButtonBack;