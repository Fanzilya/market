import React, { useState, useRef, useEffect } from 'react';
import './ZoomableContainer.css';

export const ZoomableContainer = ({ children }) => {
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const containerRef = useRef(null);
    const contentRef = useRef(null);

    // Масштабирование
    const zoomIn = () => {
        setScale(prev => Math.min(prev + 0.2, 3)); // максимум x3
    };

    const zoomOut = () => {
        setScale(prev => Math.max(prev - 0.2, 1)); // минимум x0.5
    };

    // Сброс к исходному состоянию
    const resetZoom = () => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
    };

    // Обработчики для перетаскивания
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setDragStart({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;

        e.preventDefault();

        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;

        // Ограничиваем перемещение, чтобы не уйти за пределы
        const container = containerRef.current;
        const content = contentRef.current;

        if (container && content) {
            const containerRect = container.getBoundingClientRect();
            const contentRect = content.getBoundingClientRect();

            const maxX = (contentRect.width * scale - containerRect.width) / 2;
            const maxY = (contentRect.height * scale - containerRect.height) / 2;

            setPosition({
                x: Math.min(Math.max(newX, -maxX), maxX),
                y: Math.min(Math.max(newY, -maxY), maxY)
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Обработка колесика мыши для масштабирования
    const handleWheel = (e) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const delta = e.deltaY > 0 ? -0.1 : 0.1;
            setScale(prev => Math.min(Math.max(prev + delta, 0.5), 3));
        }
    };

    // Добавляем и удаляем обработчики событий
    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragStart, scale]);

    return (
        <div className="zoomable-container-wrapper">
            <div
                className="zoomable-container"
                ref={containerRef}
                onWheel={handleWheel}
            >
                <div
                    ref={contentRef}
                    className={`zoomable-content ${isDragging ? 'dragging' : ''}`}
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                        cursor: scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
                    }}
                    onMouseDown={handleMouseDown}
                >
                    {children}
                </div>
            </div>
            <div className="controls">
                <button onClick={zoomIn} className="control-btn">+</button>
                <button onClick={zoomOut} className="control-btn">-</button>
                <button onClick={resetZoom} className="control-btn reset">Сброс</button>
                <span className="zoom-level">{Math.round(scale * 100)}%</span>
            </div>
        </div>
    );
};