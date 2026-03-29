import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { SeletectItemInterface } from "./src/type";
import Icon from "../Icon";
import { ErrorText } from "@/shared/components/error-text";

type Props = {
    placeholder: string;
    items: SeletectItemInterface[];
    onSelect: (item: SeletectItemInterface) => void;
    defaultValue?: string | number;
    error?: string;
    label?: string,
    required?: boolean,
    classNames?: {
        wripper?: string,
        items?: string,
        selector?: string,
    }
}

export const Selector = ({ placeholder, items, onSelect, classNames, defaultValue, label, required = false, error }: Props) => {

    let [isOpen, setOpen] = useState<boolean>(false)

    const [value, setValue] = useState<string | null>(() => {
        if (defaultValue) {
            const foundItem = items.find(element => element.value == defaultValue);
            return foundItem ? foundItem.title : "";
        }
        return "";
    });

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
        <div ref={containerRef} className={`relative flex flex-col gap-[8px] ${classNames?.wripper}`} onClick={(e) => { e.stopPropagation(); handleButtonClick() }}>
            {label && <span className={`text-[14px] font-medium text-[#1e293b] ${classNames?.label}`}>{label} {required && <span className="text-red-500">*</span>}</span>}

            <div
                // style={{ borderColor: isOpen ? "#4A85F6" : "#e2e8f0" }}
                // className={`flex items-center cursor-pointer justify-between px-[16px] py-[12px] border border-2 rounded-[10px] text-[14px] transition-all duration-200 bg-white w-full text-[#1e293b] ${classNames?.selector}`}
                className={`${isOpen ? "border-[#4A85F6] shadow-[0_0_0_3px_rgba(74,133,246,0.1)]" : "border-slate-200"} relative flex items-center cursor-pointer justify-between px-4 py-3 border-2 rounded-[10px] text-sm transition-all duration-200 bg-white text-slate-700 w-full`}
            >
                {(() => {
                    if (value) return <p className="text-gray-900 truncate">{value}</p>;
                    else if (defaultValue) return <p className="text-gray-500 italic">{defaultValue}</p>;
                    return <span className="text-gray-400">{placeholder || 'Выберите...'}</span>;
                })()}


                <div className="w-min h-[12px] flex items-center justify-between" style={{ transitionDuration: "0.3s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                    <Icon width={12} name="arrowDownSelect" color="gray" />
                </div>


                <div
                    className={` 
                    absolute left-0 top-[110%] rounded-lg flex flex-col gap-2 w-full bg-white  
                    ${isOpen ? "min-w-full max-h-[160px] overflow-y-auto z-[1] shadow-lg" : "hidden overflow-hidden"}
                    ${classNames?.items}
                `}
                >
                    {items.length === 0
                        ? <p className="text-sm font-medium text-gray-500 p-4">Список пустой</p>
                        : items.map(item => (
                            <div className="hover:bg-[#e9ecf5] py-3 px-2 cursor-pointer" onClick={() => { onChange(item.title); onSelect && onSelect(item) }}>
                                <span className="">{item.title}</span>
                            </div>
                        ))
                    }
                </div>
            </div>

            {error && <ErrorText text={error} />}
        </div>
    )
}