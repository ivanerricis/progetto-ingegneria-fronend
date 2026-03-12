import { Check, Eye, EyeOff, X } from "lucide-react"
import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

type RegisterPasswordFieldProps = {
    value: string
    onChange: (value: string) => void
    disabled?: boolean
    label?: string
    placeholder?: string
}

type PasswordRule = {
    test: (password: string) => boolean
    label: string
}

const passwordRules: PasswordRule[] = [
    { test: (password) => /[0-9]/.test(password), label: "Include un numero" },
    { test: (password) => /[a-z]/.test(password), label: "Include una lettera minuscola" },
    { test: (password) => /[A-Z]/.test(password), label: "Include una lettera maiuscola" },
    { test: (password) => /[$&+,:;=?@#|'<>.^*()%!-]/.test(password), label: "Include un simbolo speciale" },
]

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
    return (
        <div className={cn("mt-1.5 text-sm", meets ? "text-confirm" : "text-destructive")}>
            <div className="inline-flex items-center gap-1.5">
                {meets ? <Check size={14} strokeWidth={1.5} /> : <X size={14} strokeWidth={1.5} />}
                <span>{label}</span>
            </div>
        </div>
    )
}

function getStrength(password: string) {
    let multiplier = password.length > 7 ? 0 : 1

    passwordRules.forEach((rule) => {
        if (!rule.test(password)) {
            multiplier += 1
        }
    })

    return Math.max(100 - (100 / (passwordRules.length + 1)) * multiplier, 0)
}

export function RegisterPasswordField({
    value,
    onChange,
    disabled = false,
    label = "Password",
    placeholder = "La tua password",
}: RegisterPasswordFieldProps) {
    const [showPassword, setShowPassword] = useState(false)
    const strength = getStrength(value)

    const barColorClass = useMemo(
        () => (strength > 80 ? "bg-confirm" : strength > 50 ? "bg-yellow-500" : "bg-red-500"),
        [strength]
    )

    return (
        <div className="space-y-2 w-full">
            <div className="grid gap-2">
                <div className="flex flex-row">
                    <Label htmlFor="register-password" className="mr-2">
                        {label}
                    </Label>
                    <Label className="text-destructive!">*</Label>
                </div>
                <div className="relative">
                    <Input
                        id="register-password"
                        value={value}
                        onChange={(event) => onChange(event.currentTarget.value)}
                        type={showPassword ? "text" : "password"}
                        placeholder={placeholder}
                        className="pr-10 w-full"
                        required
                        disabled={disabled}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((current) => !current)}
                        className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        aria-label={showPassword ? "Nascondi password" : "Mostra password"}
                    >
                        {showPassword ? <EyeOff size={16} strokeWidth={1.75} /> : <Eye size={16} strokeWidth={1.75} />}
                    </button>
                </div>
            </div>

            <div className="mb-4 mt-2 flex w-full gap-1.5">
                {Array(4)
                    .fill(0)
                    .map((_, index) => (
                        <div
                            key={index}
                            className={cn(
                                "h-1 w-full rounded-full bg-muted transition-colors",
                                value.length > 0 && index === 0
                                    ? barColorClass
                                    : strength >= ((index + 1) / 4) * 100
                                      ? barColorClass
                                      : "bg-muted"
                            )}
                            aria-label={`Password strength segment ${index + 1}`}
                        />
                    ))}
            </div>

            <PasswordRequirement label="Ha almeno 8 caratteri" meets={value.length > 7} />
            {passwordRules.map((rule, index) => (
                <PasswordRequirement key={index} label={rule.label} meets={rule.test(value)} />
            ))}
        </div>
    )
}

export function isRegisterPasswordValid(password: string) {
    return password.length > 7 && passwordRules.every((rule) => rule.test(password))
}
