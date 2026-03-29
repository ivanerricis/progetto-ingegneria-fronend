type StepperProps = {
    steps: string[]
    current: number
    barWidthClass?: string
    barPaddingClass?: string
    big?: boolean
}

export const Stepper = ({
    steps,
    current,
    barWidthClass = "w-13",
    barPaddingClass = "px-3.5",
    big = false
}: StepperProps) => {
    return (
        <div className="flex flex-col gap-2 w-full mb-6 items-center">
            <div className={`flex w-full ${barPaddingClass} items-center justify-between`}>
                {steps.map((_, i) => (
                    <>
                        <div key={i} className={`transition h-10 w-10 text-lg flex items-center justify-center rounded-full border 
                            ${i <= current ? "bg-primary border-muted text-background dark:text-foreground" : "bg-background dark:bg-secondary text-foreground"}
                            `}>
                            {i + 1}
                        </div>
                        {(i < steps.length - 1) &&
                            <div className={`h-1 ${barWidthClass} sm:w-17 transition rounded-sm ${i < current ? "bg-primary" : "bg-muted dark:bg-secondary"}`}></div>
                        }
                    </>
                ))}
            </div>
            <div className="flex w-full items-center justify-center gap-3">
                {steps.map((step, i) => (
                    <div key={i} className="w-full flex items-center justify-between *:text-foreground">
                        <label
                            className={`flex-1 ${big
                                ? "text-center"
                                : i === 0
                                    ? "text-start"
                                    : i === steps.length - 1
                                        ? "text-end"
                                        : "text-center"
                                }`}
                        >
                            {step}
                        </label>
                    </div>
                ))}
            </div>
        </div >
    )
}