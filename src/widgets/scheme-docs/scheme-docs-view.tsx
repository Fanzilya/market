import { useEffect, useState } from "react";

export const SchemeDocsView = ({ url, fileType = "create" }: { url?: string, fileType?: "download" | "create" }) => {
    const [fileData, setFileData] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (fileType == "download" && url) {
            loadFile();
        } else {
            setLoading(false);
            setFileData(null);
        }

        return () => {
            if (fileData) {
                URL.revokeObjectURL(fileData);
            }
        };
    }, [url]);

    const loadFile = async () => {
        setLoading(true);
        setError(null);

        if (fileData) {
            URL.revokeObjectURL(fileData);
            setFileData(null);
        }

        try {
            const response = await fetch(url!);

            if (!response.ok) {
                throw new Error("Файл не найден или ошибка сети");
            }

            // Получаем JSON с base64 данными
            const jsonData = await response.json();

            // Проверяем, что в ответе есть fileData
            if (!jsonData.fileData) {
                throw new Error("Нет данных файла в ответе");
            }

            // Декодируем base64 в бинарные данные
            const binaryString = atob(jsonData.fileData);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            // Создаем blob с правильным MIME типом
            const blob = new Blob([bytes], { type: jsonData.contentType || 'application/pdf' });
            const urlObject = URL.createObjectURL(blob);

            setFileData(urlObject);
            setLoading(false);

        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : "Ошибка загрузки файла");
            setLoading(false);
        }
    };

    return (
        <div className={`sticky top-[50px] w-full h-[90vh] ${url ? "bg-white" : "bg-gray-100"} rounded-xl p-4 border border-[#e2e8f0] overflow-x-auto`}>
            {loading && (
                <div className="flex items-center justify-center h-64">
                    <p className="text-gray-500">Загрузка файла...</p>
                </div>
            )}

            {!loading && error && (
                <div className="flex flex-col items-center justify-center h-64">
                    <p className="text-xl text-red-500 font-semibold mb-4">Ошибка при загрузке документа</p>
                    <p className="text-gray-500">{error}</p>
                </div>
            )}

            {!loading && !error && (
                <iframe
                    src={`${fileType == "download" ? fileData : url}#toolbar=0&navpanes=0`}
                    className="w-full h-full rounded-lg"
                    title="Просмотр файла"
                    style={{ border: 'none' }}
                />
            )}
        </div>
    );
};