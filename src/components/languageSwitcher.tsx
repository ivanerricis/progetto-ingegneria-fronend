import { ChevronDown, Earth } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { Label } from "./ui/label";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const currentLanguage = i18n.resolvedLanguage?.startsWith("it") ? "it" : "en";
    const currentLabel = currentLanguage === "it" ? "Italiano" : "English";

    const changeLanguage = (lang: "it" | "en") => {
        i18n.changeLanguage(lang).catch(console.error);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size={"lg"} className="gap-2">
                    <Earth className="size-5" />
                    <Label className="hidden sm:flex text-lg">{currentLabel}</Label>
                    <ChevronDown className="size-5"/>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex items-center text-lg" onClick={() => changeLanguage("it")}>
                    <span className="fi fi-it"></span>
                    <Label className="text-lg">Italiano</Label>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center text-lg" onClick={() => changeLanguage("en")}>
                    <span className="fi fi-gb"></span>
                    <Label className="text-lg">English</Label>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LanguageSwitcher;