import { Button } from '@/shared/ui-kits/button';
import React, { useState, useCallback } from 'react';

interface PdfUploaderProps {
    setFile: (file: File | null, url: string) => void;
    maxSize?: number;
    isError?: boolean;
    acceptedTypes?: string[];
    fileUrl?: string;
    fileData?: File;
}

export const SchemeDocsForm: React.FC<PdfUploaderProps> = ({ setFile, maxSize = 1024 * 1024 * 1024, acceptedTypes = ['application/pdf'], isError, fileUrl, fileData }) => {
    const [pdfUrl, setPdfUrl] = useState<string | null>(fileUrl || null);
    const [fileName, setFileName] = useState<string>(fileData?.name || "");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [dragActive, setDragActive] = useState<boolean>(false);

    // Проверка файла
    const validateFile = useCallback((file: File): boolean => {
        // Проверка типа
        if (!acceptedTypes.includes(file.type)) {
            setError('Пожалуйста, загрузите PDF файл');
            return false;
        }

        // Проверка размера
        if (file.size > maxSize) {
            setError(`Размер файла не должен превышать ${maxSize / (1024 * 1024)}MB`);
            return false;
        }

        setError('');
        return true;
    }, [acceptedTypes, maxSize]);

    // Обработка загруженного файла
    const handleFile = useCallback(async (file: File) => {
        if (!validateFile(file)) return;

        setIsLoading(true);
        setFileName(file.name);

        try {
            let url: string;
            url = URL.createObjectURL(file);

            setFile(file, url)
            setPdfUrl(url);
            setError('');

        } catch (err) {
            setError('Ошибка при загрузке файла');
            console.error('Upload error:', err);
        } finally {
            setIsLoading(false);
        }
    }, [setFile, validateFile]);

    // Обработчик выбора файла
    const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFile(file);
        }
    }, [handleFile]);

    // Обработчики drag and drop
    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleFile(file);
        }
    }, [handleFile]);

    // Очистка PDF
    const handleClear = useCallback(() => {
        if (pdfUrl) {
            URL.revokeObjectURL(pdfUrl);
        }

        setFile(null, "")
        setPdfUrl(null);
        setFileName('');
        setError('');
    }, [pdfUrl, setFile]);

    // Форматирование размера файла
    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className={`sticky top-[50px] w-full h-[90vh] bg-white rounded-xl p-4 border border-gray-200  overflow-x-auto`}>
            {/* Форма загрузки */}
            {!pdfUrl ? (
                <div className="h-full flex flex-col items-center justify-center">
                    <div
                        className={`
              w-full max-w-2xl p-8 border-2 border-dashed rounded-lg text-center
              transition-colors duration-200 cursor-pointer
              ${(isError || (error && error.length > 0))
                                ? "border-red-500"
                                : (dragActive
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                                )
                            }
            `}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById('pdf-upload')?.click()}
                    >
                        <input
                            id="pdf-upload"
                            type="file"
                            accept=".pdf,application/pdf"
                            onChange={handleFileSelect}
                            className="hidden"
                            disabled={isLoading}
                        />

                        {isLoading ? (
                            <div className="flex flex-col items-center">
                                <p className="text-gray-600">Загрузка PDF...</p>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                    Загрузите PDF документ
                                </h3>
                                <p className="text-gray-500 mb-4">
                                    Перетащите файл сюда или кликните для выбора
                                </p>
                                <div className="text-sm text-gray-400">
                                    <p>Поддерживаемые форматы: PDF</p>
                                    <p>Максимальный размер: {formatFileSize(maxSize)}</p>
                                </div>
                            </>
                        )}
                    </div>

                    {error && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm">{error}</p>
                        </div>
                    )}
                </div>
            ) : (
                // Отображение PDF
                <div className="h-full flex flex-col">
                    {/* Информация о файле */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-700">{fileName}</span>
                        </div>


                        <Button
                            styleColor='red'
                            className='px-4 py-1 !rounded-sm'
                            onClick={handleClear}>
                            Удалить
                        </Button>
                    </div>

                    {/* PDF Viewer */}
                    <div className="flex-1 min-h-0">
                        <iframe
                            src={`${pdfUrl}#toolbar=0&navpanes=0`}
                            title="PDF Viewer"
                            className="w-full h-full rounded-lg border border-gray-200"
                            style={{ border: 'none' }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};