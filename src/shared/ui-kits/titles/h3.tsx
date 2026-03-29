interface Props {
    text: string,
    className?: string
}

export const PageTitle = ({ text, className }: Props) => {
    return (
        <div className={`text-2xl font-semibold text-[#1E293B] ${className}`}>{text}</div>
    );
}

export const TitleBefore = ({ text, className }: Props) => {
    return (
        <div
            className={`text-[16px] font-semibold flex items-center gap-2 
                        before:w-[4px] before:h-[16px] before:bg-[#4A85F6] before:rounded-[2px]
                        ${className}`}>
            {text}
        </div>
    );
}