import { CSSProperties, ReactNode } from "react";
import { StyleColor, styleColorEnum } from "./config";

type Props = {
    children?: ReactNode;
    className?: string;
    onClick?: (e: any) => void;
    disabled?: boolean
    type?: "button" | "submit" | "reset"
    style?: CSSProperties;
    styleColor?: StyleColor;
}


export const Button = ({ children, className, onClick, disabled, type, style, styleColor }: Props) => {

    return (
        <button
            name="button"
            type={type ?? "button"}
            disabled={disabled}
            className={`flex items-center justify-center cursor-pointer
                  font-medium rounded-xl disabled:cursor-default 
                  duration-300 ${styleColorEnum[styleColor || "blue"] ?? ""} 
                  ${className} ${disabled ? "bg-[#bcbcbc] hover:bg-[#bcbcbc] text-black" : ""}
                  `}
            onClick={(e) => {
                if (type !== "submit") {
                    e.preventDefault();
                    e.stopPropagation();
                }
                onClick != undefined && onClick(e)
            }}

            style={style}
        >
            {children}
        </button >
    )
}