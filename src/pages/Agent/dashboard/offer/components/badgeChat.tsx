import { Label } from "@/components/ui/label";

type BadgeChatProps = {
    onClick: () => void;
    addressFormatted: string
    accountName: string;
    accountEmail: string;
};

export const BadgeChat = ({ onClick, addressFormatted, accountName, accountEmail }: BadgeChatProps) => {
    return (
        <button
            className="w-full flex flex-col items-start justify-center cursor-pointer *:cursor-pointer bg-background hover:bg-foreground/20 p-2"
            onClick={onClick}
        >
            <Label className="text-md text-left">{addressFormatted}</Label>
            <Label className="text-md text-left">{accountName}</Label>
            <Label className="text-sm text-left text-muted-foreground!">{accountEmail}</Label>
        </button>
    );
}