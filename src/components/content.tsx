type ContentProps = {
    children?: React.ReactNode;
}

const Content = ({ children }: ContentProps) => {
    return (
        <main className="relative flex-1 min-h-0 flex items-center justify-center overflow-y-auto sm:rounded-xl sm:mx-26">
            <div
                className="hidden sm:block absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(/sfondo.webp)` }}
            />
            {children}
        </main>
    );
}

export default Content;