interface Props {
    text: string,
    className?: string
}

export const ErrorText = ({ text, className }: Props) => {
    return (
        <p className={`${className} text-red-500`}>{text}</p>
    );
}