import type { ReactNode } from "react"
import { Label } from "@/components/ui/label"

type FeatureItemProps = {
    children: ReactNode
    icon?: ReactNode
    iconSizeClassName?: string
}


const FeatureItem = ({ children, icon, iconSizeClassName = "size-8" }: FeatureItemProps) => (
    <div className="flex items-center gap-1 rounded-sm border dark:*:text-primary *:text-primary bg-primary/10 p-1">
        {icon && <div className={`${iconSizeClassName} flex items-center justify-center *:size-7`}>{icon}</div>}
        <Label className="text-md">{children}</Label>
    </div>
)

export default FeatureItem;