interface Props {
    text: string,
    className?: string
}

export const PageTitle = ({ text, className }: Props) => {
    return (
        <div className={`m-0 text-2xl font-semibold text-[#1E293B] tracking-tighter ${className}`}>{text}</div>
    );
}