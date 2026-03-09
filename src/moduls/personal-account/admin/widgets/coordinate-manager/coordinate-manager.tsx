import React, { useState } from 'react';
import './CoordinateManager.css';
import { observer } from 'mobx-react-lite';
import { Input } from '@/shared/ui-kits/Input';
import { SchemeObject } from '../../../../../widgets/Scheme/src/data/teeska';
import { PRIMARY_COLOR } from '@/shared/ui-kits/design-tokens';


interface Props {
    model: SchemeObject[],
    setIdFocus: (id: number | null) => void
}

export const CoordinateManager = observer(({ model, setIdFocus }: Props) => {
    return (
        <div className="p-[20px] max-w-[1200px]">
            <div className="items-list">
                <h3 className='text-2xl mb-2'>Элементы схемы</h3>
                {model.length > 0 && model.map((item, index) => (
                    <div
                        key={item.id}
                        className={`hover:bg-[#f5f5f5] border border-gray-200 hover:border-gray-[#999] rounded-lg p-4 mb-2.5 cursor-pointer transition-all duration-500 flex justify-between gap-2.5 items-center`}
                        onClick={() => setIdFocus(item.id)}
                    >
                        <span>{item.name}</span>

                        <div className="flex justify-center items-center">
                            {item.image && (
                                <img
                                    className='object-contain w-[50px] h-[50px]'
                                    src={item.image}
                                    alt={item.name}
                                />
                            )}
                        </div>
                    </div>
                ))}
                <div className={`bg-[#4A85F6] text-white rounded-lg p-2 mb-2.5 cursor-pointer transition-all duration-500 flex justify-center items-center`}
                    onClick={() => setIdFocus(0)}
                >
                    <div className="flex justify-center items-center">
                        +
                    </div>
                </div>
            </div>
        </div>
    );
});