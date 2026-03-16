import Icon from "../Icon";

interface Props {
    type: "info" | "error" | "warn",
    text: string,
    title?: string,
    classNames?: {
        container: string
    }
}


export const InformationsBox = ({ type, text, classNames, title }: Props) => {

    const containerClasses =
        type == "error"
            ? "border-[#DC2626] bg-[#FEF2F2] "
            : "bg-[#F0F9FF] border-[#4A85F6] "

    const titleColor =
        type == "error"
            ? "text-[#DC2626]"
            : "#1E293B"

    const textColor =
        type == "error"
            ? "text-[#DC2626]"
            : "text-[#64748B]"

    const iconColor = type == "error"
        ? "#DC2626"
        : "#4A85F6"

    return (
        <div className={`flex items-center gap-2.5 px-3 py-4 rounded-[10px] border ${containerClasses} ${classNames?.container}`}>
            <Icon color={iconColor} name='info' width={25} />
            <div>
                {title && <div className={`font-bold mb-[4px] ${titleColor}`}>{title}</div>}
                <p className={`${textColor}`}>{text}</p>
            </div>
        </div>
    );



}