export const styleColorEnum = {
    blue: 'bg-[rgba(74,_133,_246)] text-white hover:bg-[rgba(74,_133,_246,_0.3)]',
    red: 'bg-red-500 text-white hover:bg-red-600',
    green: 'bg-green-500 text-white hover:bg-green-600',
    gray: 'bg-gray-300 text-gray-700 hover:bg-gray-400',
    yellow: 'bg-yellow-300 text-yellow-700 hover:bg-yellow-400',
} as const;

export type StyleColor = keyof typeof styleColorEnum;



export const panelTabs = ['Обзор', 'Управление', 'Сервис']