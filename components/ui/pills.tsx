export const Pills: React.FC<{ items: string[] | undefined }> = ({ items }) => {
    return (
        <div className="flex flex-wrap items-center gap-4 text-xs">
        {items && items.map(item => (
            <span key={item}
                className="relative z-10 rounded-full bg-accent px-3 py-1.5 font-medium text-muted-foreground"
            >
                {item}
            </span>
        ))}
    </div>
    );
};