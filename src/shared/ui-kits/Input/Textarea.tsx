import React, { HTMLInputTypeAttribute, useState } from "react";
import { baseClasses, containerClasses, isFocusClasses, labelClasses, notFocusClasses } from "./styles";
import { ErrorText } from "@/shared/components/error-text";

interface Props {
    value: string | number | Date | null;
    onChange: (value: string | number) => void;
    label?: string | React.ReactNode;
    placeholder: string;
    disabled?: boolean,
    required?: boolean,
    error?: string,
    classNames?: {
        input?: string;
        label?: string;
        container?: string;
    }
}

export const Textarea = ({ value, onChange, label, placeholder, classNames, disabled = false, required = false, error }: Props) => {

    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className={`${containerClasses} ${classNames?.container}`}>
            {label && (typeof label == "string")
                ? <div className={`${labelClasses} ${classNames?.label}`}>{label}
                    {required && <span className="text-red-500">*</span>}
                </div>
                : label
            }

            <textarea
                placeholder={placeholder}
                value={value?.toString()}
                required={required}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className={`${baseClasses} ${isFocused ? isFocusClasses : notFocusClasses} ${classNames?.input}`}
            />

            {error && <ErrorText text={error} />}
        </div>
    );
}