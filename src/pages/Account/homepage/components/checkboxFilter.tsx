type CheckboxFilterProps = {
    label: string
}

const CheckboxFilter = ({ label }: CheckboxFilterProps) => {
    // const id = label.toLowerCase().replace(/\s+/g, "-");

    return (
        <label className="flex items-center gap-2 cursor-pointer rounded-full w-fit h-fit">
            <input type="checkbox" className="sr-only peer" />

            <span className="border font-bold rounded-full px-3 py-1 whitespace-wrap text-nowrap dark:text-foreground
                   transition-all duration-200 ease-out motion-reduce:transition-none
                   peer-checked:shadow-sm
                   peer-checked:border-primary
                   peer-checked:text-primary!">
                {label}
            </span>
        </label>
    );
}

export default CheckboxFilter;