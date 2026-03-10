// Основания
import KNSAbove from './svg/KNS_above.svg';
import KNS from './svg/KNS.svg';

// Компоненты
import floatSwitch_1 from './svg/float-switch-1.svg';
import floatSwitch_2 from './svg/float-switch-2.svg';
import floatSwitch_3 from './svg/float-switch-3.svg';
import floatSwitch_4 from './svg/float-switch-4.svg';
import gridAbove from './svg/grid_above.svg';
import grid from './svg/grid.svg';
import pavilionAbove from './svg/pavilion_above.svg';
import pavilion from './svg/pavilion.svg';
import pumpsPressure from './svg/pumps_pressure.svg';
import shredder from './svg/shredder.svg';


export const SchemeParams = {
    floatSwitch_1: 1,
    floatSwitch_2: 2,
    floatSwitch_3: 3,
    floatSwitch_4: 4,
    gridAbove: 5,
    grid: 6,
    pavilionAbove: 9,
    pavilion: 10,
    pumpsPressure: 11,
    shredder: 12,
}


export const floatSwitches = [
    {
        name: "Поплавки",
        value: SchemeParams.floatSwitch_1,
        checked: true,
        image: floatSwitch_1,
        innerWidth: 100,
        innerHeight: 100,
        innerX: 100,
        innerY: 100,
    },
    {
        name: "План 2",
        value: SchemeParams.floatSwitch_2,
        checked: true,
        image: floatSwitch_2,
        innerWidth: 100,
        innerHeight: 100,
        innerX: 100,
        innerY: 100,
    },
    {
        name: "План 3",
        value: SchemeParams.floatSwitch_3,
        checked: true,
        image: floatSwitch_3,
        innerWidth: 100,
        innerHeight: 100,
        innerX: 100,
        innerY: 100,
    },
    {
        name: "План 4",
        value: SchemeParams.floatSwitch_4,
        checked: true,
        image: floatSwitch_4,
        innerWidth: 100,
        innerHeight: 100,
        innerX: 100,
        innerY: 100,
    },
]

export interface SchemeObject {
    id?: string | number,
    name: string,
    value?: number,
    image: any,
    innerWidth: number | string,
    innerHeight: number | string,
    innerX: number,
    innerY: number,
}

export interface EquipmentData extends SchemeObject {
    isActive: boolean;
    unit: string;
    rotation: number;
    showLine: boolean;
    lineHeight: number;
    lineWidth: number;
    lineRotation: number;
    zeroLabel: string;
    lineInnerX: number,
    lineInnerY: number,
}

export interface EquipmentDataCheckbox extends EquipmentData {
    checked: boolean,
    disabled: boolean,
}

export interface SchemeObjectCheckBox extends SchemeObject {
    checked: boolean,
}

export const checkBox: SchemeObjectCheckBox[] = [
    {
        id: 1,
        name: "Поплавки",
        value: SchemeParams.floatSwitch_4,
        checked: false,
        image: floatSwitch_4,
        innerWidth: 100,
        innerHeight: 100,
        innerX: 100,
        innerY: 100,
    },
    {
        id: 2,
        name: "Решётка сверху",
        value: SchemeParams.gridAbove,
        checked: false,
        image: gridAbove,
        innerWidth: 100,
        innerHeight: 100,
        innerX: 100,
        innerY: 100,
    },
    {
        id: 3,
        name: "Решётка",
        value: SchemeParams.grid,
        checked: false,
        image: grid,
        innerWidth: 100,
        innerHeight: 100,
        innerX: 100,
        innerY: 100,
    },
    {
        id: 4,
        name: "Павильон сверху",
        value: SchemeParams.pavilionAbove,
        checked: false,
        image: pavilionAbove,
        innerWidth: 231,
        innerHeight: 165,
        innerX: 293,
        innerY: 293,
    },
    {
        id: 5,
        name: "Павильон",
        value: SchemeParams.pavilion,
        checked: true,
        image: pavilion,
        innerWidth: 231,
        innerHeight: 165,
        innerX: 293,
        innerY: 10,
    },
    {
        id: 6,
        name: "Насосы + напорка",
        value: SchemeParams.pumpsPressure,
        checked: false,
        image: pumpsPressure,
        innerWidth: 100,
        innerHeight: 100,
        innerX: 100,
        innerY: 100,
    },
    {
        id: 7,
        name: "Измельчитель",
        value: SchemeParams.shredder,
        checked: false,
        image: shredder,
        innerWidth: 100,
        innerHeight: 100,
        innerX: 100,
        innerY: 100,
    },

    {
        id: 8,
        name: "КНС",
        image: KNS,
        innerWidth: "auto",
        innerHeight: "30%",
        innerX: 100,
        innerY: 100,
        checked: true,
    },
    {
        id: 9,
        name: "КНС сверху",
        image: KNSAbove,
        innerWidth: 25,
        innerHeight: "auto",
        innerX: 100,
        innerY: 70,
        checked: true,
    }
]




