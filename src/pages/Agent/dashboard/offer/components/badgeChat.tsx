import { Label } from "@/components/ui/label";

type BadgeChatProps = {
    onClick: () => void;
    accountName: string;
};

export const BadgeChat = ({ onClick, accountName }: BadgeChatProps) => {
    return (
        <button
            className="w-full cursor-pointer *:cursor-pointer bg-sidebar hover:bg-foreground/20 p-2"
            onClick={onClick}
        >
            <Label className="text-lg">Address Formatted</Label>
            <Label className="text-md">{accountName}</Label>
        </button>
    );
}