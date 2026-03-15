import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { SeletectItemInterface } from "./src/type";
import Icon from "../Icon";

type Props = {
    placeholder: string;
    items: SeletectItemInterface[];
    onSelect: (item: SeletectItemInterface) => void;
    defaultValue?: string;
    label?: string,
    required?: boolean,
    classNames?: {
        wripper?: string,
        items?: string,
        selector?: string,
    }
}

export const Selector = observer(({ placeholder, items, onSelect, classNames, defaultValue, label, required = false }: Props) => {

    let [isOpen, setOpen] = useState<boolean>(false)
    let [value, setValue] = useState<string | null>('')
    const containerRef = useRef<HTMLDivElement>(null);

    const onChange = (value: string) => {
        setValue(value)
    }

    const handleButtonClick = () => {
        setOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        if (isOpen) document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);


    return (
        <div ref={containerRef} className={`relative flex flex-col gap-[8px] ${classNames?.wripper}`} onClick={handleButtonClick}>
            {label && <span className={`text-[14px] font-medium text-[#1e293b] ${classNames?.label}`}>{label} {required && <span className="text-red-500">*</span>}</span>}

            <div
                style={{ borderColor: isOpen ? "var(--clr-accent)" : "var(--clr-border-gray)" }}
                className={` px-[16px] py-[12px] border border-2 border-[#e2e8f0] rounded-[10px] text-[14px] transition-all duration-200 bg-white w-full text-[#1e293b] ${classNames?.selector}`}
            >
                {(() => {
                    if (value) return <p className="text-gray-900 truncate">{value}</p>;
                    if (defaultValue) return <p className="text-gray-500 italic">{defaultValue}</p>;
                    return <span className="text-gray-400">{placeholder || 'Выберите...'}</span>;
                })()}

                <Icon name="arrowDownSelect" style={{ transitionDuration: "0.3s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
            </div>

            <div
                className={`absolute left-0 top-[110%] rounded-lg flex flex-col gap-2 w-full bg-white  border 
                 ${isOpen ? "min-w-full max-h-[160px] overflow-y-scroll z-[1] shadow-sm" : "hidden border-0 overflow-hidden"} ${classNames?.items}`}>
                {items.length === 0
                    ? <p className="text-sm font-medium text-gray-500 p-4">Список пустой</p>
                    : items.map(item => (
                        <div className="hover:bg-[#e2e2e2] py-3 px-2" onClick={() => { onChange(item.title); onSelect && onSelect(item) }}>
                            <span className="">{item.title}</span>
                        </div>
                    ))}
            </div>
        </div>
    )
})