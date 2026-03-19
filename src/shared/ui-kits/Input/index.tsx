import { HTMLInputTypeAttribute, useState } from "react";
import { IMaskInput } from "react-imask";
import { baseClasses, containerClasses, isFocusClasses, labelClasses, notFocusClasses } from "./styles";
import { ErrorText } from "@/shared/components/error-text";

interface Props {
    value: string | number | Date | null;
    onChange: (value: string | number) => void;
    label?: string;
    placeholder: string;
    type?: HTMLInputTypeAttribute;
    disabled?: boolean,
    required?: boolean,
    error?: string,
    classNames?: {
        input?: string;
        label?: string;
        container?: string;
    }
}

export const Input = ({ value, onChange, label, placeholder, classNames, type = "text", disabled = false, required = false, error }: Props) => {

    const [isFocused, setIsFocused] = useState(false);
    const InputComponent = type === "phone" ? IMaskInput : "input"

    return (
        <div className={`${containerClasses} ${classNames?.container}`}>
            {label && <div className={`${labelClasses} ${classNames?.label}`}>{label} {required && <span className="text-red-500">*</span>}</div>}
            <InputComponent
                type={type}
                placeholder={placeholder}
                value={value?.toString()}
                required={required}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                mask={type === "phone" ? "+7 (000) 000-00-00" : ""}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`${baseClasses} ${isFocused ? isFocusClasses : notFocusClasses} ${classNames?.input}`}
            />

            {error && <ErrorText text={error} />}
        </div>
    );
}