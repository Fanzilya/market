import float_switch_1 from "../../../../.././widgets/Scheme/src/data/svg/float-switch-1.svg"
import grid_above from "../../../../.././widgets/Scheme/src/data/svg/grid_above.svg"
import grid from "../../../../.././widgets/Scheme/src/data/svg/grid.svg"
import pavilion from "../../../../.././widgets/Scheme/src/data/svg/pavilion.svg"
import pumps_pressure from "../../../../.././widgets/Scheme/src/data/svg/pumps_pressure.svg"
import shredder from "../../../../.././widgets/Scheme/src/data/svg/shredder.svg"
import pavilion_above from "../../../../.././widgets/Scheme/src/data/svg/pavilion_above.svg"

import { STORAGE_KEY_SCHEME_SETTINGS } from "@/entities/scheme/config"

// Опции для выпадающих списков
export const mediumOptions = [
    'Хоз-бытовые сточные воды',
    'Ливневые сточные воды',
    'Промышленные стоки',
    'Другое'
]

export const directionOptions = [
    { value: '12', label: '12 часов (вверх)' },
    { value: '1', label: '1 час (30°)' },
    { value: '2', label: '2 часа (60°)' },
    { value: '3', label: '3 часа (вправо)' },
    { value: '4', label: '4 часа (120°)' },
    { value: '5', label: '5 часов (150°)' },
    { value: '6', label: '6 часов (вниз)' },
    { value: '7', label: '7 часов (210°)' },
    { value: '8', label: '8 часов (240°)' },
    { value: '9', label: '9 часов (влево)' },
    { value: '10', label: '10 часов (300°)' },
    { value: '11', label: '11 часов (330°)' },
]

export const motorStartOptions = [
    { value: 'direct', label: 'Прямой пуск' },
    { value: 'soft', label: 'Плавный пуск (свыше 45 кВт)' },
    { value: 'frequency', label: 'Частотное регулирование' }
]

export const cabinetLocationOptions = [
    { value: 'УХЛ1', label: 'УХЛ1' },
    { value: 'УХЛ4', label: 'УХЛ4' }
]

export const savedData = () => localStorage.setItem(STORAGE_KEY_SCHEME_SETTINGS, JSON.stringify([
    {
        "id": 1,
        "name": "Поплавки",
        "value": 4,
        "checked": false,
        "image": float_switch_1,
        "innerWidth": 100,
        "innerHeight": 100,
        "innerX": 8,
        "innerY": 46
    },
    {
        "id": 2,
        "name": "Решётка сверху",
        "value": 5,
        "checked": false,
        "image": grid_above,
        "innerWidth": 100,
        "innerHeight": 100,
        "innerX": 505,
        "innerY": 172
    },
    {
        "id": 3,
        "name": "Решётка",
        "value": 6,
        "checked": false,
        "image": grid,
        "innerWidth": 100,
        "innerHeight": 100,
        "innerX": 132,
        "innerY": 73
    },
    {
        "id": 5,
        "name": "Павильон",
        "value": 10,
        "checked": true,
        "image": pavilion,
        "innerWidth": 231,
        "innerHeight": 165,
        "innerX": 293,
        "innerY": 10
    },
    {
        "id": 6,
        "name": "Насосы + напорка",
        "value": 11,
        "checked": false,
        "image": pumps_pressure,
        "innerWidth": 100,
        "innerHeight": 100,
        "innerX": 245,
        "innerY": 459
    },
    {
        "id": 7,
        "name": "Измельчитель",
        "value": 12,
        "checked": false,
        "image": shredder,
        "innerWidth": 100,
        "innerHeight": 100,
        "innerX": 456,
        "innerY": 460
    },
    {
        "id": 4,
        "name": "Павильон сверху",
        "value": 9,
        "checked": false,
        "image": pavilion_above,
        "innerWidth": 231,
        "innerHeight": 166,
        "innerX": 310,
        "innerY": 264,
        "showLine": true,
        "lineHeight": 1,
        "lineWidth": 300,
        "zeroLabel": "wer",
        "lineInnerX": -16,
        "lineInnerY": 377,
        "lineRotation": -90
    }
]))


//   1	Канальный измельчитель в КНС (сверху)
//=  2	Канальный измельчитель в КНС (разрез)
//   3	Канальный измельчитель перед КНС (сверху)
//   4	Канальный измельчитель перед КНС (разрез)
//   5	Шиберный затвор на подводящей трубе в КНС (сверху)
//   6	Шиберный затвор на подводящей трубе в КНС (разрез)
//   7	Колодец с задвижкой перед КНС (сверху)
//   8	Колодец с задвижкой перед КНС (сразрез)
//=  9	Наземный павильон (сверху)
//=  10	Наземный павильон (разрез)
//   11	Грузоподъёмное устройство (сверху)
//   12	Грузоподъёмное устройство (разрез)
//   13	Колодец с запорной арматурой после КНС (сверху)
//   14	Колодец с запорной арматурой после КНС (разрез)
//   15	Расходомер на напорном трубопроводе (сверху)
//   16	Расходомер на напорном трубопроводе (разрез)
//   17	Газоанализатор
//   18	Поплавковые датчики уровня 
//   19	Гидростатический датчик уровня
//=  20	Корпус КНС (разрез)
//=  21	Корпус КНС (сверху)
//=  22	Насос (разрез)
//   23	Насос (сверху) 2 шт
//   24	Насос (сверху) 3 шт
//   25	Напорка (разрез)
//   26	Напорка (сверху) 1 шт
//   27	Напорка (сверху) 2 шт
//   28	Винтовая решетка (разрез)
//   29	Винтовая решетка (сверху)