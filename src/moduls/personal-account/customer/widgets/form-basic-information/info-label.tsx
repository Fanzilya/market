import Icon from "@/shared/ui-kits/Icon";
import { useState } from "react";

export const InfoLabel = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="relative inline-block">
            <label className="text-sm font-medium text-slate-800 flex items-center gap-1">
                Заказчик
                <span className="text-[#ef4444] text-[16px]">*</span>
                <div
                    className="relative"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Icon name='info' color="oklch(27.9% 0.041 260.031)" width={15} />

                    {/* Тултип */}
                    {isHovered && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-white rounded-lg shadow-lg border border-slate-200 text-xs text-slate-600 z-50">
                            {/* Треугольник-стрелочка */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-0.5">
                                <div className="border-8 border-transparent border-t-white drop-shadow-lg"></div>
                            </div>

                            {/* Текст */}
                            Специализированное юридическое лицо, уполномоченное застройщиком управлять строительством, заключать договоры с подрядчиками, готовить документы и контролировать качество работ от имени застройщика
                        </div>
                    )}
                </div>
            </label>
        </div>
    );
};