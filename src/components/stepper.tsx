type StepperProps = {
    steps: string[]
    current: number
}

export const Stepper = ({ steps, current }: StepperProps) => {
    return (
        <div className="flex flex-col gap-2 w-full mb-6 items-center">
            <div className="flex w-full px-3.5 items-center justify-between">
                {steps.map((_, i) => (
                    <>
                        <div key={i} className={`transition h-10 w-10 text-lg flex items-center justify-center rounded-full border 
                            ${i <= current ? "bg-primary border-foreground" : "bg-secondary"}
                            `}>
                            {i + 1}
                        </div>
                        {(i < steps.length - 1) &&
                            <div className={`h-1 w-13 sm:w-17 transition rounded-sm ${i < current ? "bg-primary" : "bg-secondary"}`}></div>
                        }
                    </>
                ))}
            </div>
            <div className="flex w-full items-center justify-between">
                {steps.map((step, i) => (
                    <label
                        key={i}
                        className={`flex-1
                ${i === 0 && "text-start"}
                ${i === steps.length - 1 && "text-end"}
                ${i !== 0 && i !== steps.length - 1 && "text-center"}
            `}
                    >
                        {step}
                    </label>
                ))}
            </div>
        </div>
    )
}