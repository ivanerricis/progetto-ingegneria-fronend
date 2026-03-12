import Header from "@/components/header";
import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useAdvertisement from "@/hooks/account/useAdvertisement";
import { formatPrice } from "@/utils/formatPrice";
import { Search } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const Advertisement = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { advertisement, isLoading, error } = useAdvertisement(id)

    const handleBackClick = () => {
        if (window.history.length > 1) {
            navigate(-1)
            return
        }

        navigate("/account/login")
    }

    return (
        <div className="flex flex-col min-h-screen max-h-screen h-full">
            <Header
                left={
                    <Button onClick={handleBackClick}>
                        Back
                    </Button>
                }
                center={
                    <Field orientation="horizontal">
                        <Input type="search" placeholder="Cerca..." />
                        <Button variant={"outline"} size={"icon"}>
                            <Search />
                        </Button>
                    </Field>
                }
                right={
                    <>
                        <ModeToggle />
                        <Avatar>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </>
                }
            />

            {/* Main content */}
            <div className="flex-1 p-4">
                {isLoading && <p className="text-muted-foreground">Caricamento annuncio...</p>}

                {!isLoading && error && (
                    <p className="text-destructive">{error}</p>
                )}

                {!isLoading && !error && advertisement && (
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold">{advertisement.title}</h1>
                        <p className="text-muted-foreground">{advertisement.realEstate.addressFormatted}</p>
                        <p>{advertisement.description}</p>
                        <p className="text-lg font-semibold">{formatPrice(advertisement.price)}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Advertisement;