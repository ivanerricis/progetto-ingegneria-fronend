import { Check, Eye, EyeOff, X } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type PasswordStrengthProps = Readonly<{
    big?: boolean
    disable?: boolean
}>;

type PasswordRequirementProps = Readonly<{
    meets: boolean
    label: string
}>;

function PasswordRequirement({ meets, label }: PasswordRequirementProps) {
    return (
        <div className={cn('mt-1.5 text-sm', meets ? 'text-confirm' : 'text-destructive')}>
            <div className="inline-flex items-center gap-1.5">
                {meets ? <Check size={14} strokeWidth={1.5} /> : <X size={14} strokeWidth={1.5} />}
                <span>{label}</span>
            </div>
        </div>
    );
}

const requirements = [
    { re: /\d/, label: 'Include un numero' },
    { re: /[a-z]/, label: 'Include una lettera minuscola' },
    { re: /[A-Z]/, label: 'Include una lettera maiuscola' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Include un simbolo speciale' },
];

function getStrength(password: string) {
    let multiplier = password.length > 7 ? 0 : 1;

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1;
        }
    });

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

export function PasswordStrength({ big = false, disable = false }: PasswordStrengthProps) {
    const [value, setValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const strength = getStrength(value);
    const checks = requirements.map((requirement) => (
        <PasswordRequirement key={requirement.label} label={requirement.label} meets={requirement.re.test(value)} />
    ));

    const getBarColorClass = () => {
        if (strength > 80) return 'bg-confirm';
        if (strength > 50) return 'bg-yellow-500';
        return 'bg-red-500';
    }

    const barColorClass = getBarColorClass();

    const getBarClass = (index: number) => {
        if (value.length === 0) return 'bg-muted'
        if (index === 0) return barColorClass
        return strength >= ((index + 1) / 4) * 100 ? barColorClass : 'bg-muted'
    }

    const bars = new Array(4)
        .fill(0)
        .map((_, index) => (
            <div
                key={index}
                className={cn(
                    'h-1 w-full rounded-full bg-muted transition-colors',
                    getBarClass(index)
                )}
                aria-label={`Password strength segment ${index + 1}`}
            />
        ));

    return (
        <div className="space-y-2 w-full">
            <div className="grid gap-2">
                {big ? <></> : <Label htmlFor="password-strength">Password</Label>}
                <div className="relative">
                    <Input
                        id="password-strength"
                        value={value}
                        onChange={(event) => setValue(event.currentTarget.value)}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="La tua password"
                        className="pr-10 w-full"
                        required
                        disabled={disable}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((current) => !current)}
                        className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        aria-label={showPassword ? 'Nascondi password' : 'Mostra password'}
                    >
                        {showPassword ? <EyeOff size={16} strokeWidth={1.75} /> : <Eye size={16} strokeWidth={1.75} />}
                    </button>
                </div>
            </div>

            {!disable && (
                <>
                    <div className="mb-4 mt-2 flex w-full gap-1.5">
                        {bars}
                    </div>
                    <PasswordRequirement label="Ha almeno 8 caratteri" meets={value.length > 7} />
                    {checks}
                </>
            )}
        </div>
    );
}