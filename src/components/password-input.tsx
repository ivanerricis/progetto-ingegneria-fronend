import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useId, useState } from "react";

type PasswordInputProps = Readonly<{
    value: string;
    onChange: (value: string) => void;
    label?: string;
    id?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
}>;

export function PasswordInput({
    value,
    onChange,
    label = "Password",
    id,
    placeholder = "Inserisci la password",
    required = false,
    disabled = false,
}: PasswordInputProps) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="grid gap-2">
            <div className="flex flex-row">
                <Label htmlFor={inputId} className="mr-2">
                    {label}
                </Label>
                {required ? <Label className="text-destructive!">*</Label> : null}
            </div>

            <div className="relative">
                <Input
                    id={inputId}
                    value={value}
                    onChange={(event) => onChange(event.currentTarget.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    className="pr-9 w-full"
                    required={required}
                    disabled={disabled}
                />

                <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Nascondi password" : "Mostra password"}
                    disabled={disabled}
                >
                    {showPassword ? <EyeOff size={16} strokeWidth={1.75} /> : <Eye size={16} strokeWidth={1.75} />}
                </button>
            </div>
        </div>
    );
}