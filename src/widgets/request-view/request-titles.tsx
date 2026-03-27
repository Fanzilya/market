export const TitleBlock = ({ title, className }: { title: string, className?: string }) => {
    return (
        <h3 className={`text-sm font-semibold text-[#1e293b] mb-4 uppercase tracking-[0.5px] ${className}`}>{title}</h3>
    );
}