import { CalendarClock, Tag } from "lucide-react"

export function RadioGroupCard() {
    return (
        <div className="flex gap-2">
            <div className="flex items-center justify-center h-fit py-1 px-3 border rounded-sm text-foreground has-checked:border-primary has-checked:bg-primary/10 has-checked:text-primary">
                <input
                    type="radio"
                    id="onsale"
                    name="group"
                    value="onsale"
                    defaultChecked
                    className="appearance-none"
                />
                <label
                    htmlFor="onsale"
                    className="text-nowrap flex items-center gap-2"
                >
                    In vendita
                    <Tag className="size-5" />
                </label>
            </div>

            <div className="flex items-center justify-center h-fit py-1 px-3 border rounded-sm text-foreground has-checked:border-primary has-checked:bg-primary/10 has-checked:text-primary">
                <input
                    type="radio"
                    id="rental"
                    name="group"
                    value="rental"
                    className="appearance-none"
                />
                <label
                    htmlFor="rental"
                    className="text-nowrap flex items-center gap-2"
                >
                    In affitto
                    <CalendarClock className="size-5" />
                </label>
            </div>
        </div>
    )
}
