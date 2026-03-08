import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

type CheckboxFilterProps = {
    label: string
}

const CheckboxFilter = ({ label }: CheckboxFilterProps) => {
    return (
        <FieldGroup className="inline-flex w-fit max-w-max self-start items-center justify-start">
            <Field orientation="horizontal" className="gap-1">
                <Checkbox id={label} name={label} />
                <FieldLabel htmlFor={label} className="text-nowrap cursor-pointer">
                    {label}
                </FieldLabel>
            </Field>
        </FieldGroup>
    );
}

export default CheckboxFilter;