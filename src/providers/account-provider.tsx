import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { apiClient } from "@/lib/api/config";
import { setLogoutHandler } from "@/lib/api/interceptors";
import type { Account } from "@/types/types";

type AccountContextType = {
    account: Account | null;
    loading: boolean;
    setAccount: (account: Account | null) => void;
    logout: () => Promise<void>;
    refreshAccount: () => Promise<void>;
};

const AccountContext = createContext<AccountContextType | undefined>(
    undefined
);

const STORAGE_KEY = "account";

type Props = {
    children: ReactNode;
};

export const AccountProvider = ({ children }: Props) => {
    const [account, setAccountState] = useState<Account | null>(null);
    const [loading, setLoading] = useState(true);

    const setAccount = (acc: Account | null) => {
        setAccountState(acc);

        if (acc) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(acc));
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    };

    const refreshAccount = async () => {
        try {
            const res = await apiClient.get<Account>("/auth/account");
            setAccount(res.data);
        } catch {
            setAccount(null);
        }
    };

    const logout = async () => {
        try {
            await apiClient.post("/auth/account/logout");
        } catch { }

        setAccount(null);
    };

    useEffect(() => {
        setLogoutHandler(() => {
            setAccount(null);
        });
    }, []);

    useEffect(() => {
        const init = async () => {
            try {
                const stored = localStorage.getItem(STORAGE_KEY);

                if (stored) {
                    setAccountState(JSON.parse(stored));
                }

                await refreshAccount();
            } finally {
                setLoading(false);
            }
        };

        init();
    }, []);

    return (
        <AccountContext.Provider
            value={{
                account,
                loading,
                setAccount,
                logout,
                refreshAccount,
            }}
        >
            {children}
        </AccountContext.Provider>
    );
};

export const useAccount = () => {
    const context = useContext(AccountContext);

    if (!context) {
        throw new Error("useAccount must be used inside AccountProvider");
    }

    return context;
};