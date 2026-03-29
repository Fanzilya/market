import { HTMLInputTypeAttribute, useState } from "react";
import { IMaskInput } from "react-imask";
import { baseClasses, containerClasses, isFocusClasses, labelClasses, notFocusClasses } from "./styles";
import Icon from "../Icon";

interface Props {
    value: string;
    onChange: (value: File | null) => void;
    label?: string;
    placeholder: string;
    disabled?: boolean,
    required?: boolean,
    classNames?: {
        input?: string;
        label?: string;
        container?: string;
    }
}

export const InputFile = ({ value, onChange, label, placeholder, classNames, disabled = false, required = false }: Props) => {
    const [isFocused, setIsFocused] = useState(false);

    const clearClick = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        onChange(null)
    }

    return (
        <label className={`${containerClasses} ${classNames?.container}`}>
            {label && <span className={`${labelClasses} ${classNames?.label}`}>{label} {required && <span className="text-red-500">*</span>}</span>}

            <input
                type='file'
                required={required}
                onChange={(e) => onChange(e.target.files?.[0])}
                disabled={disabled}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="hidden"
            />
            <div className="flex items-center gap-[5px]">
                <div className={`border-2 rounded-[10px] h-full flex items-center justify-center w-[50px]  ${value ? "border-blue-400 !bg-blue-50" : "border-gray-200"}`}>
                    <Icon name="pdf" color={value ? "oklch(65% 0.2 240)" : "#94a3b8"} />
                </div>
                <div className={`${baseClasses}  ${classNames?.input} flex ${value ? "border-blue-400 !bg-blue-50" : notFocusClasses}`}>
                    <span className="flex-1">{value || placeholder}</span>
                    {value &&
                        <button
                            onClick={(e) => clearClick(e)}
                            className="bg-red-500 flex items-center justify-center cursor-pointer h-[20px] w-[20px] rounded-[20px] hover:opacity-50 duration-200">
                            <Icon name="close" color="white" width={15} />
                        </button>
                    }
                </div>
            </div>
        </label>
    );
}