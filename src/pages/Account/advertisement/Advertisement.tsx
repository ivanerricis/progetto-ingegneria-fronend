import Header from "@/components/header";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import useAdvertisement from "@/hooks/account/useAdvertisement";
import { formatPrice } from "@/utils/formatPrice";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { AccountBadge } from "@/pages/Account/homepage/components/accountBadge";
import { Label } from "@/components/ui/label";
import { Footer } from "@/components/footer";

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
                isHomepage
                left={
                    <Button
                        variant={"outline"}
                        onClick={handleBackClick}>
                        <ArrowLeft />
                        <Label className="hidden sm:flex text-md">Indietro</Label>
                    </Button>
                }
                right={
                    <>
                        <ModeToggle />
                        <AccountBadge />
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
                    <div className="flex flex-col gap-2">
                        <Label className="text-2xl font-bold">{advertisement.title}</Label>
                        <Label className="text-muted-foreground">{advertisement.realEstate.addressFormatted}</Label>
                        <Label>{advertisement.description}</Label>
                        <Label className="text-lg font-semibold">{formatPrice(advertisement.price)}</Label>
                    </div>
                )}
            </div>
            <Footer isHomepage />
        </div>
    );
}

export default Advertisement;