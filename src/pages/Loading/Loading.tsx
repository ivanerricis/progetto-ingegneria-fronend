import { Spinner } from "@/components/ui/spinner"

const Loading = () => {
    return (
        <div className="flex w-full h-full items-center justify-center">
            <Spinner className="text-foreground size-14"/>
        </div>
    )
}

export default Loading