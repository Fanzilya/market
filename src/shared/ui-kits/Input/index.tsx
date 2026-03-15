import { HTMLInputTypeAttribute, useState } from "react";
import { phoneMask } from "./src/setting";
import { IMaskInput } from "react-imask";

interface Props {
    value: string | number;
    onChange: (value: string | number) => void;
    label?: string;
    placeholder: string;
    type?: HTMLInputTypeAttribute;
    disabled?: boolean,
    required?: boolean,
    classNames?: {
        input?: string;
        label?: string;
        container?: string;
    }
}

export const Input = ({ value, onChange, label, placeholder, classNames, type = "text", disabled = false, required = false }: Props) => {

    const [isFocused, setIsFocused] = useState(false);
    const InputComponent = type === "phone" ? IMaskInput : "input"

    const baseClasses = 'px-4 py-3 border-2 rounded-[10px] text-sm transition-all duration-200 bg-white text-slate-700 w-full';

    const focusClasses = isFocused ? 'border-[#4A85F6] !shadow-[0_0_0_3px_rgba(74,133,246,0.1)]' : 'border-slate-200';

    // const disabledClasses = disabled ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : '';

    // const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.1)]' : '';



    return (
        <div className={`flex flex-col gap-[8px] ${classNames?.container}`}>
            {label && <span className={`text-[14px] font-medium text-[#1e293b] ${classNames?.label}`}>{label} {required && <span className="text-red-500">*</span>}</span>}
            <InputComponent
                type={type}
                placeholder={placeholder}
                value={value}
                required={required}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                mask={type === "phone" ? "+7 (000) 000-00-00" : ""}
                onFocus={(e) => {
                    setIsFocused(true);
                }}
                onBlur={(e) => {
                    setIsFocused(false);
                }}
                className={`${baseClasses} ${focusClasses} ${classNames?.input}`}
            />
        </div>
    );
}