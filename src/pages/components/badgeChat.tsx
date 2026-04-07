type BadgeChatProps = {
    onClick: () => void;
    addressFormatted: string
    name: string;
    email?: string;
    selected?: boolean;
};

export const BadgeChat = ({ onClick, addressFormatted, name, email, selected = false }: BadgeChatProps) => {
    return (
        <button
            className={`w-full min-w-0 flex flex-col items-start justify-center cursor-pointer *:cursor-pointer p-2 transition-colors ${
                selected
                    ? "bg-primary text-primary-foreground"
                    : "bg-background hover:bg-foreground/20"
            }`}
            onClick={onClick}
        >
            <div className="w-full min-w-0">
                <p className={`text-md text-left truncate ${selected ? "text-primary-foreground" : "text-foreground"}`}>
                    {addressFormatted}
                </p>
            </div>
            <div className="w-full min-w-0">
                <p className={`text-sm text-left truncate ${selected ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                    {name} - {email}
                </p>
            </div>
        </button>
    );
}