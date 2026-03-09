import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

export function ResizableAgent() {
    return (
        <ResizablePanelGroup
            orientation="horizontal"
            className="w-full h-full rounded-lg border"
        >
            <ResizablePanel defaultSize="25%" maxSize={"250px"}>
                <div className="flex h-50 items-center justify-center p-6">
                    <span className="font-semibold">Sidebar</span>
                </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize="75%">
                <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Main</span>
                </div>
            </ResizablePanel>
        </ResizablePanelGroup>
    )
}
