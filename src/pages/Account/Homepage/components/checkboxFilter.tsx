import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

type CheckboxFilterProps = {
    label: string
}

const CheckboxFilter = ({ label }: CheckboxFilterProps) => {
    const id = label.toLowerCase().replace(/\s+/g, "-");

    return (
        <FieldGroup className="inline-flex w-fit self-start items-center justify-start">
            <Field orientation="horizontal" className="flex justify-start items-center gap-1">
                <Checkbox id={id} name={id} className="size-5"/>
                <FieldLabel htmlFor={id} className="text-nowrap text-md">
                    {label}
                </FieldLabel>
            </Field>
        </FieldGroup>
    );
}

export default CheckboxFilter;