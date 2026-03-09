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
        "image": "data:image/svg+xml,%3csvg%20width='28'%20height='747'%20viewBox='0%200%2028%20747'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M14.0859%20714.718V6.04736'%20stroke='black'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M14.0866%2011.595C17.1504%2011.595%2019.6341%209.1113%2019.6341%206.0475C19.6341%202.9837%2017.1504%200.5%2014.0866%200.5C11.0228%200.5%208.53906%202.9837%208.53906%206.0475C8.53906%209.1113%2011.0228%2011.595%2014.0866%2011.595Z'%20stroke='black'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M14.4422%20707.878C16.8362%20712.793%2028.1341%20736.024%2028%20736.471C26.5%20741.471%2020.3817%20746.115%2016%20746.123C6.83257%20747.264%200.852934%20741.872%200.0148205%20736.077C0.0046598%20736.007%200.00659201%20735.95%200.0350538%20735.885C0.731952%20734.293%2011.2606%20712.61%2013.559%20707.878C13.7412%20707.503%2014.2596%20707.503%2014.4422%20707.878Z'%20fill='%23F26722'/%3e%3c/svg%3e",
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
        "image": "data:image/svg+xml,%3csvg%20width='235'%20height='191'%20viewBox='0%200%20235%20191'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M134.16%2020.8928H233.637'%20stroke='black'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M134.504%20169.716V20.5'%20stroke='black'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M156.754%20169.716V20.5'%20stroke='black'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M179.004%20169.716V20.5'%20stroke='black'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M201.254%20169.716V20.5'%20stroke='black'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M223.504%20169.716V20.5'%20stroke='black'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M233.637%20170.108H134.16'%20stroke='black'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M183.9%2016.4163C188.295%2016.4163%20191.858%2012.8533%20191.858%208.45817C191.858%204.06299%20188.295%200.5%20183.9%200.5C179.504%200.5%20175.941%204.06299%20175.941%208.45817C175.941%2012.8533%20179.504%2016.4163%20183.9%2016.4163Z'%20stroke='black'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M183.9%20190.502C188.295%20190.502%20191.858%20186.939%20191.858%20182.543C191.858%20178.148%20188.295%20174.585%20183.9%20174.585C179.504%20174.585%20175.941%20178.148%20175.941%20182.543C175.941%20186.939%20179.504%20190.502%20183.9%20190.502Z'%20stroke='black'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M173.949%203.48438V20.8929'%20stroke='black'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M193.848%203.48438V20.8929'%20stroke='black'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M173.949%20187.517V170.108'%20stroke='black'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M193.848%20187.517V170.108'%20stroke='black'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M68.7467%20135.291H0.5'%20stroke='black'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M0.5%20135.291V55.7092'%20stroke='black'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M0.5%2055.7092H68.7467'%20stroke='black'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M68.75%2055.7094V24.4612'%20stroke='black'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M68.75%2024.4612H104.162'%20stroke='black'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M68.75%20135.291V166.54'%20stroke='black'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M68.75%20166.54H104.162'%20stroke='black'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M68.75%2055.7092V135.291'%20stroke='black'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M104.156%2024.4612H123.685'%20stroke='black'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M123.688%2024.4612V166.54'%20stroke='black'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M123.685%20166.54H104.156'%20stroke='black'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M234.156%2020.8928V170.108'%20stroke='black'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e",
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
        "image": "/src/widgets/Scheme/src/data/svg/grid.svg",
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
        "image": "/src/widgets/Scheme/src/data/svg/pavilion.svg",
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
        "image": "/src/widgets/Scheme/src/data/svg/pumps_pressure.svg",
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
        "image": "/src/widgets/Scheme/src/data/svg/shredder.svg",
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
        "image": "/src/widgets/Scheme/src/data/svg/pavilion_above.svg",
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