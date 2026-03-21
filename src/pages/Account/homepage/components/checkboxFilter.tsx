// CheckboxFilter.tsx
import React from "react";

type CheckboxFilterProps = {
    label: string;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    className?: string;
};

const CheckboxFilter = ({
    label,
    checked = false,
    onCheckedChange,
    className = "",
}: CheckboxFilterProps) => {
    const id = label.toLowerCase().replace(/\s+/g, "-");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onCheckedChange?.(e.target.checked);
    };

    return (
        <label htmlFor={id} className={`flex items-center gap-2 cursor-pointer rounded-full w-fit h-fit ${className}`}>
            <input
                type="checkbox"
                id={id}
                className="sr-only peer"
                checked={checked}
                onChange={handleChange}
            />
            <span className="border-3 font-bold rounded-full px-3 py-1 whitespace-wrap text-nowrap dark:text-foreground
                   transition-all duration-200 ease-out motion-reduce:transition-none
                   peer-checked:shadow-sm
                   peer-checked:border-primary
                   peer-checked:text-primary!">
                {label}
            </span>
        </label>
    );
};

export default CheckboxFilter;