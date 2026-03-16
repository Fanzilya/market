import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ForbiddenPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl w-full text-center">
                {/* Иконка с анимацией */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 bg-blue-100  rounded-full blur-3xl opacity-30 animate-pulse" />
                    </div>
                    <div className="relative flex justify-center gap-4">
                        <span className="text-8xl font-bold text-gray-400 ">403</span>
                    </div>
                </div>

                {/* Текст ошибки */}
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900  mb-4">
                    Доступ запрошён
                </h1>


                {/* Кнопка возврата */}
                <button
                    onClick={handleGoBack}
                    className="inline-flex mt-5 items-center px-6 py-3 text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                    Вернуться назад
                </button>

                {/* Дополнительные ссылки (опционально) */}
                <div className="mt-8 text-sm text-gray-400 ">
                    <span>Или перейдите на </span>
                    <button
                        onClick={() => navigate('/')}
                        className="text-blue-600 hover:underline focus:outline-none"
                    >
                        главную страницу
                    </button>
                </div>
            </div>

            {/* Фоновый паттерн (декоративный) */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-20" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-20" />
            </div>

        </div>
    );
};