interface Props {
    tabForm: number; // 1 или 2
}

export const TabCounter = ({ tabForm }: Props) => {
    return (
        <div className="flex items-center justify-center gap-2 bg-gray-100 py-2 rounded-xl">
            {/* Шаг 1 */}
            <div className="flex items-center">
                <span
                    className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                        transition-colors
                        ${tabForm >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400'}
                    `}
                >
                    1
                </span>
                <span
                    className={`
                        ml-2 text-sm
                        ${tabForm >= 1 ? 'text-gray-700' : 'text-gray-400'}
                    `}
                >
                    Пользователь
                </span>
            </div>

            {/* Разделитель */}
            <div className="w-8 h-px bg-gray-300 mx-2" />

            <div className="flex items-center">
                <span
                    className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                        transition-colors
                        ${tabForm >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-400'
                        }
                    `}
                >
                    2
                </span>
                <span
                    className={`
                        ml-2 text-sm
                        ${tabForm >= 2 ? 'text-gray-700' : 'text-gray-400'}
                    `}
                >
                    Компания
                </span>
            </div>
        </div>
    );
};