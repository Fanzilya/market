import { Input } from "@/shared/ui-kits/Input";
import { EquipmentData, SchemeObjectCheckBox } from "@/widgets/Scheme/src/data/teeska";
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";

interface Props {
    model: EquipmentData | undefined;
    onAdd?: (data: EquipmentData) => void;
    onUpdate?: (data: EquipmentData) => void;
    onCancel?: () => void;
    onChange: (data: any) => void
    removeModel: () => void
}

export const EquipmentForm = observer(({ model, onAdd, onUpdate, onCancel, onChange, removeModel }: Props) => {

    const handleSubmit = () => {
        if (model.id && model.id > 0) {
            onUpdate?.(model);
        } else {
            onAdd?.(model);
        }
    };

    return (
        <div className="flex flex-col gap-[20px]">

            {/* Основная информация */}

            <Input
                label="Наименование оборудования"
                placeholder="Введите название"
                value={model.name}
                onChange={(v) => onChange({ name: v })}
            />

            <label className="flex items-center gap-[8px]">
                <input
                    type="checkbox"
                    checked={model.isActive}
                    onChange={(e) => onChange({ isActive: e.target.checked })}
                />
                Активное оборудование
            </label>

            <Input
                label="Фотография оборудования (URL)"
                placeholder="https://..."
                value={model.image}
                onChange={(v) => onChange({ image: v })}
            />

            {/* Координаты */}

            <div className="grid grid-cols-2 gap-[12px]">
                <Input
                    label="X"
                    placeholder="0"
                    type="number"
                    value={model.innerX}
                    onChange={(v) => onChange({ innerX: Number(v) })}
                />

                <Input
                    label="Y"
                    placeholder="0"
                    type="number"
                    value={model.innerY}
                    onChange={(v) => onChange({ innerY: Number(v) })}
                />
            </div>

            {/* Размеры */}

            <div className="grid grid-cols-2 gap-[12px]">
                <Input
                    label="Width"
                    placeholder="100"
                    type="number"
                    value={model.innerWidth}
                    onChange={(v) => onChange({ innerWidth: Number(v) })}
                />

                <Input
                    label="Height"
                    placeholder="100"
                    type="number"
                    value={model.innerHeight}
                    onChange={(v) => onChange({ innerHeight: Number(v) })}
                />
            </div>

            <Input
                label="Ед. измерения"
                placeholder="например: °C, bar"
                value={model.unit}
                onChange={(v) => onChange({ unit: v })}
            />

            <Input
                label="Градус поворота"
                placeholder="0"
                type="number"
                value={model.rotation}
                onChange={(v) => onChange({ rotation: Number(v) })}
            />

            {/* Линия отображения */}

            <label className="flex items-center gap-[8px] mt-[10px]">
                <input
                    type="checkbox"
                    checked={model.showLine}
                    onChange={(e) => onChange({ showLine: e.target.checked })}
                />
                Добавить линию отображения
            </label>

            {model.showLine && (
                <div className="grid grid-cols-2 gap-[12px]">
                    <Input
                        label="Высота полосы"
                        placeholder="0"
                        type="number"
                        value={model?.lineHeight || ""}
                        onChange={(v) => onChange({ lineHeight: Number(v) })}
                    />
                    <Input
                        label="Ширина полосы"
                        placeholder="0"
                        type="number"
                        value={model?.lineWidth || ""}
                        onChange={(v) => onChange({ lineWidth: Number(v) })}
                    />

                    <Input
                        label="Градус поворота линии"
                        placeholder="0"
                        type="number"
                        value={model.lineRotation || ""}
                        onChange={(v) => onChange({ lineRotation: Number(v) })}
                    />

                    <Input
                        label="X"
                        placeholder="0"
                        type="number"
                        value={model?.lineInnerX || ""}
                        onChange={(v) => onChange({ lineInnerX: v })}
                    />

                    <Input
                        label="Y"
                        placeholder="0"
                        type="number"
                        value={model?.lineInnerY || ""}
                        onChange={(v) => onChange({ lineInnerY: v })}
                    />

                    <Input
                        label="Буквенное обозначение при нуле"
                        placeholder="например: N"
                        value={model.zeroLabel || ""}
                        onChange={(v) => onChange({ zeroLabel: v })}
                    />

                </div>
            )}

            <div className="w-full flex gap-1.5">
                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 cursor-pointer text-white w-full py-[12px] rounded-[10px]"
                >
                    {model.id && model.id > 0 ? "Обновить оборудование" : "Добавить оборудование"}
                </button>
                <button
                    onClick={onCancel}
                    className="bg-gray-600  cursor-pointer w-full text-white py-[12px] rounded-[10px]"
                >
                    Отмена
                </button>
            </div>

            <button
                onClick={removeModel}
                className="bg-red-600  cursor-pointer w-full text-white py-[12px] rounded-[10px]"
            >
                Удалить
            </button>

        </div>
    );
})