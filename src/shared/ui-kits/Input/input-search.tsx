import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { PRIMARY_COLOR } from '../design-tokens';


interface Props {
    value: string,
    placeholder?: string,
    onChange: (value: string) => void
    classNames?: {
        input?: string,
        container?: string,
    }
}

export const Search = observer(({ value, onChange, placeholder, classNames }: Props) => {

    const [focus, setFocus] = useState<boolean>(false)



    return (
        <div className={`flex-1 flex items-center gap-3 px-4 py-2.5 
                        bg-white border rounded-xl 
                        transition-all duration-200 border-slate-200
                        ${focus && "focus-within:border-[#4A85F6] focus-within:shadow-[0_0_0_3px_rgba(74,133,246,0.1)]"}
                        ${classNames?.container}
                        `}
        >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-slate-500">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M16 16L21 21" stroke="currentColor" strokeWidth="2" />
            </svg>
            <input
                type="text"
                placeholder={placeholder || "Поиск..."}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                className={`flex-1 outline-none bg-transparent text-slate-700 placeholder-slate-400 ${classNames?.input}`}
            />
        </div>
    );
});