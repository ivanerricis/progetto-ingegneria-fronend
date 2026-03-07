type HeaderProps = {
    left?: React.ReactNode
    right?: React.ReactNode
    center?: React.ReactNode
    isHomepage?: boolean
}

export const Header = ({ left, right, center, isHomepage = false }: HeaderProps) => {
    const horizontalPadding = isHomepage ? 'px-2' : 'px-26'

    return (
        <div className={`h-12 w-full border-b flex justify-between items-center ${horizontalPadding} gap-2 shadow-md`} >
            <div className="flex justify-start gap-1 items-center">
                {left}
            </div>
            <div className="flex gap-1 items-center justify-center">
                {center}
            </div>
            <div className="flex gap-1 items-center justify-end">
                {right}
            </div>
        </div>
    )
}

export default Header