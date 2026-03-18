type StepperProps = {
    steps: string[]
    current: number
}

export const Stepper = ({ steps, current }: StepperProps) => {
    return (
        <div className="flex items-center w-full mb-6">
            {steps.map((step, i) => (
                <>
                    <div key={step} className="flex items-center justify-center w-full">
                        <div className="flex flex-col justify-center items-center">
                            <div className={`size-8 rounded-full flex items-center justify-center text-sm font-medium
                ${i <= current
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground"}
              `}
                            >
                                {i + 1}
                            </div>
                            <span className="text-sm mt-1">{step}</span>
                        </div>
                    </div>
                    {i < steps.length - 1 && (
                        <div className="w-full h-5">
                            <div className={`flex-1 h-0.5 mx-2 ${i < current ? "bg-primary" : "bg-muted"}`} />
                        </div>
                    )}
                </>
            ))}
        </div>
    )
}