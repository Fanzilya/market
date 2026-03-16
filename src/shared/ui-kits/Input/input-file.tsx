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

            <div className={`${baseClasses} ${isFocused ? isFocusClasses : notFocusClasses} ${classNames?.input} flex`}>
                <span className="flex-1">{value || placeholder}</span>
                {value &&
                    <button
                        onClick={(e) => clearClick(e)}
                        className="bg-red-50 flex items-center justify-center cursor-pointer h-[20px] w-[20px] rounded-[20px] hover:opacity-50 duration-200">
                        <Icon name="close" color="#c10007" width={15} />
                    </button>
                }
            </div>
        </label>
    );
}