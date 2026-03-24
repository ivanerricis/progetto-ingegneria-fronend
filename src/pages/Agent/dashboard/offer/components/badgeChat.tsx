type BadgeChatProps = {
    onClick: () => void;
    addressFormatted: string
    accountName: string;
    accountEmail: string;
};

export const BadgeChat = ({ onClick, addressFormatted, accountName, accountEmail }: BadgeChatProps) => {
    return (
        <button
            className="w-full min-w-0 flex flex-col items-start justify-center cursor-pointer *:cursor-pointer bg-background hover:bg-foreground/20 p-2"
            onClick={onClick}
        >
            <div className="w-full min-w-0">
                <p className="text-md text-left text-foreground truncate">{addressFormatted}</p>
            </div>
            <div className="w-full min-w-0">
                <p className="text-sm text-left text-muted-foreground truncate">{accountName} - {accountEmail}</p>
            </div>
        </button>
    );
}