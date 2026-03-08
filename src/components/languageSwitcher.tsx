import { Earth } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import "flag-icons/css/flag-icons.min.css";

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const currentLanguage = i18n.resolvedLanguage?.startsWith("it") ? "it" : "en";
    const currentLabel = currentLanguage === "it" ? "Italiano" : "English";

    const changeLanguage = (lang: "it" | "en") => {
        void i18n.changeLanguage(lang);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Earth className="h-4 w-4" />
                    {currentLabel}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex items-center" onClick={() => changeLanguage("it")}>
                    <span className="fi fi-it"></span>
                    Italiano
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center" onClick={() => changeLanguage("en")}>
                    <span className="fi fi-gb"></span>
                    English
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LanguageSwitcher;