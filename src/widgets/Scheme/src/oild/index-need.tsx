import { observer } from 'mobx-react-lite';
import { useState, useRef, useEffect } from 'react';
import { checkBox, schemeKNS } from '../../scheme-form/components/teeska';
import { ZoomableContainer } from './zoomable-container';
import { schemeActionsModel } from '../../model/scheme-actions-model';

export const KNSSchema = observer(({ data, extras, styles }) => {
    const [draggingId, setDraggingId] = useState(null);
    const [focusedId, setFocusedId] = useState(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [resizeInfo, setResizeInfo] = useState(null);
    const containerRef = useRef(null);

    const elements = schemeActionsModel.elements;

    const allElements = [
        ...schemeKNS.map(item => ({
            ...item,
            id: `static-${item.value || item.name}`,
            isStatic: true,
            canMove: true
        })),
        ...elements.map(item => ({
            ...item,
            isStatic: false,
            canMove: true
        }))
    ];

    // Обработчик клика для фокусаb
    const handleFocus = (id, e) => {
        e.stopPropagation();
        setFocusedId(id);
    };

    // Снятие фокуса при клике вне элементов
    const handleContainerClick = (e) => {
        if (e.target === containerRef.current) {
            setFocusedId(null);
        }
    };

    // Обработчик начала перетаскивания
    const handleDragStart = (e, id) => {
        e.preventDefault();
        e.stopPropagation();

        const element = allElements.find(el => el.id === id);
        if (!element || !element.canMove) return;

        const rect = e.target.closest('div')?.getBoundingClientRect() || e.target.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        setDraggingId(id);
        setFocusedId(id);
        setDragOffset({ x: offsetX, y: offsetY });
    };

    // Обработчик перемещения
    const handleDragMove = (e) => {
        if (!draggingId || !containerRef.current) return;

        e.preventDefault();

        const containerRect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - containerRect.left - dragOffset.x;
        const y = e.clientY - containerRect.top - dragOffset.y;

        // Проверяем, статический это элемент или из модели
        const staticIndex = schemeKNS.findIndex(el => `static-${el.value || el.name}` === draggingId);

        if (staticIndex !== -1) {
            // Обновляем статический элемент
            const updatedStatic = [...schemeKNS];
            const element = updatedStatic[staticIndex];
            const maxX = containerRect.width - element.innerWidth;
            const maxY = containerRect.height - element.innerHeight;

            updatedStatic[staticIndex] = {
                ...element,
                innerX: Math.max(0, Math.min(x, maxX)),
                innerY: Math.max(0, Math.min(y, maxY))
            };

            // Обновляем schemeKNS (нужно будет добавить в модель или стейт)
            // Пока просто вызовем кастомное событие для обновления
            const event = new CustomEvent('updateStaticElement', {
                detail: { index: staticIndex, element: updatedStatic[staticIndex] }
            });
            window.dispatchEvent(event);
        } else {
            // Обновляем элемент из модели
            const elementIndex = elements.findIndex(el => el.id === draggingId);
            if (elementIndex !== -1) {
                const element = elements[elementIndex];
                const maxX = containerRect.width - element.innerWidth;
                const maxY = containerRect.height - element.innerHeight;

                const updatedElements = [...elements];
                updatedElements[elementIndex] = {
                    ...element,
                    innerX: Math.max(0, Math.min(x, maxX)),
                    innerY: Math.max(0, Math.min(y, maxY))
                };
                schemeActionsModel.setElements(updatedElements);
            }
        }
    };

    // Обработчик начала изменения размера
    const handleResizeStart = (e, id, handle) => {
        e.preventDefault();
        e.stopPropagation();

        const element = allElements.find(el => el.id === id);
        if (!element) return;

        const startX = e.clientX;
        const startY = e.clientY;

        setResizeInfo({
            id,
            handle,
            startX,
            startY,
            startWidth: element.innerWidth,
            startHeight: element.innerHeight,
            startLeft: element.innerX,
            startTop: element.innerY
        });
        setFocusedId(id);
    };

    // Обработчик изменения размера
    const handleResizeMove = (e) => {
        if (!resizeInfo || !containerRef.current) return;

        e.preventDefault();

        const { id, handle, startX, startY, startWidth, startHeight, startLeft, startTop } = resizeInfo;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        const containerRect = containerRef.current.getBoundingClientRect();
        let newWidth = startWidth;
        let newHeight = startHeight;
        let newX = startLeft;
        let newY = startTop;

        // Обработка разных ручек изменения размера
        switch (handle) {
            case 'top-left':
                newWidth = Math.max(50, startWidth - deltaX);
                newHeight = Math.max(50, startHeight - deltaY);
                newX = startLeft + (startWidth - newWidth);
                newY = startTop + (startHeight - newHeight);
                break;
            case 'top':
                newHeight = Math.max(50, startHeight - deltaY);
                newY = startTop + (startHeight - newHeight);
                break;
            case 'top-right':
                newWidth = Math.max(50, startWidth + deltaX);
                newHeight = Math.max(50, startHeight - deltaY);
                newY = startTop + (startHeight - newHeight);
                break;
            case 'right':
                newWidth = Math.max(50, startWidth + deltaX);
                break;
            case 'bottom-right':
                newWidth = Math.max(50, startWidth + deltaX);
                newHeight = Math.max(50, startHeight + deltaY);
                break;
            case 'bottom':
                newHeight = Math.max(50, startHeight + deltaY);
                break;
            case 'bottom-left':
                newWidth = Math.max(50, startWidth - deltaX);
                newHeight = Math.max(50, startHeight + deltaY);
                newX = startLeft + (startWidth - newWidth);
                break;
            case 'left':
                newWidth = Math.max(50, startWidth - deltaX);
                newX = startLeft + (startWidth - newWidth);
                break;
            default:
                break;
        }

        // Проверка границ контейнера
        if (newX < 0) {
            newWidth += newX;
            newX = 0;
        }
        if (newY < 0) {
            newHeight += newY;
            newY = 0;
        }
        if (newX + newWidth > containerRect.width) {
            newWidth = containerRect.width - newX;
        }
        if (newY + newHeight > containerRect.height) {
            newHeight = containerRect.height - newY;
        }

        newWidth = Math.max(50, Math.min(newWidth, containerRect.width - newX));
        newHeight = Math.max(50, Math.min(newHeight, containerRect.height - newY));

        // Обновляем соответствующий элемент
        const staticIndex = schemeKNS.findIndex(el => `static-${el.value || el.name}` === id);

        if (staticIndex !== -1) {
            // Обновляем статический элемент
            const updatedStatic = [...schemeKNS];
            updatedStatic[staticIndex] = {
                ...updatedStatic[staticIndex],
                innerWidth: newWidth,
                innerHeight: newHeight,
                innerX: newX,
                innerY: newY
            };

            const event = new CustomEvent('updateStaticElement', {
                detail: { index: staticIndex, element: updatedStatic[staticIndex] }
            });
            window.dispatchEvent(event);
        } else {
            // Обновляем элемент из модели
            const elementIndex = elements.findIndex(el => el.id === id);
            if (elementIndex !== -1) {
                const updatedElements = [...elements];
                updatedElements[elementIndex] = {
                    ...updatedElements[elementIndex],
                    innerWidth: newWidth,
                    innerHeight: newHeight,
                    innerX: newX,
                    innerY: newY
                };
                schemeActionsModel.setElements(updatedElements);
            }
        }
    };

    // Обработчик окончания изменения размера
    const handleResizeEnd = () => {
        setResizeInfo(null);
    };

    // Обработчик окончания перетаскивания
    const handleDragEnd = () => {
        setDraggingId(null);
    };

    // Обработчик двойного клика для сброса позиции
    const handleDoubleClick = (id) => {
        const staticIndex = schemeKNS.findIndex(el => `static-${el.value || el.name}` === id);

        if (staticIndex !== -1) {
            const updatedStatic = [...schemeKNS];
            updatedStatic[staticIndex] = {
                ...updatedStatic[staticIndex],
                innerX: 100,
                innerY: 100,
                innerWidth: 100,
                innerHeight: 100
            };

            const event = new CustomEvent('updateStaticElement', {
                detail: { index: staticIndex, element: updatedStatic[staticIndex] }
            });
            window.dispatchEvent(event);
        } else {
            const elementIndex = elements.findIndex(el => el.id === id);
            if (elementIndex === -1) return;

            const updatedElements = [...elements];
            updatedElements[elementIndex] = {
                ...updatedElements[elementIndex],
                innerX: 100,
                innerY: 100,
                innerWidth: 100,
                innerHeight: 100
            };
            schemeActionsModel.setElements(updatedElements);
        }
    };

    useEffect(() => {
        if (draggingId) {
            window.addEventListener('mousemove', handleDragMove);
            window.addEventListener('mouseup', handleDragEnd);
        } else if (resizeInfo) {
            window.addEventListener('mousemove', handleResizeMove);
            window.addEventListener('mouseup', handleResizeEnd);
        }

        return () => {
            window.removeEventListener('mousemove', handleDragMove);
            window.removeEventListener('mouseup', handleDragEnd);
            window.removeEventListener('mousemove', handleResizeMove);
            window.removeEventListener('mouseup', handleResizeEnd);
        };
    }, [draggingId, dragOffset, resizeInfo]);

    // Функция для получения стилей ручек изменения размера
    const getResizeHandleStyle = (position, isFocused) => ({
        position: 'absolute',
        width: position.includes('left') || position.includes('right') ? '8px' : '16px',
        height: position.includes('top') || position.includes('bottom') ? '8px' : '16px',
        backgroundColor: isFocused ? '#4CAF50' : '#2196F3',
        border: '2px solid white',
        borderRadius: '4px',
        cursor: getCursorForHandle(position),
        zIndex: 102,
        ...getHandlePosition(position)
    });

    const getHandlePosition = (position) => {
        switch (position) {
            case 'top-left': return { top: -4, left: -4 };
            case 'top': return { top: -4, left: '50%', transform: 'translateX(-50%)' };
            case 'top-right': return { top: -4, right: -4 };
            case 'right': return { right: -4, top: '50%', transform: 'translateY(-50%)' };
            case 'bottom-right': return { bottom: -4, right: -4 };
            case 'bottom': return { bottom: -4, left: '50%', transform: 'translateX(-50%)' };
            case 'bottom-left': return { bottom: -4, left: -4 };
            case 'left': return { left: -4, top: '50%', transform: 'translateY(-50%)' };
            default: return {};
        }
    };

    const getCursorForHandle = (position) => {
        switch (position) {
            case 'top-left':
            case 'bottom-right':
                return 'nwse-resize';
            case 'top-right':
            case 'bottom-left':
                return 'nesw-resize';
            case 'top':
            case 'bottom':
                return 'ns-resize';
            case 'left':
            case 'right':
                return 'ew-resize';
            default:
                return 'default';
        }
    };

    return (
        <div className={styles.schemaContainer}>
            <ZoomableContainer>
                <div
                    ref={containerRef}
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        minHeight: '600px',
                        backgroundColor: '#f5f5f5',
                        overflow: 'hidden'
                    }}
                    onClick={handleContainerClick}
                >
                    {allElements
                        .map((item) => {
                            const isDragging = draggingId === item.id;
                            const isFocused = focusedId === item.id;
                            const isResizing = resizeInfo?.id === item.id;

                            return (
                                <div
                                    key={item.id}
                                    style={{
                                        position: 'absolute',
                                        left: item.innerX,
                                        top: item.innerY,
                                        width: item.innerWidth,
                                        height: item.innerHeight,
                                        cursor: isDragging ? 'grabbing' : 'grab',
                                        zIndex: isDragging || isResizing ? 100 : (isFocused ? 50 : (item.isStatic ? 1 : 2)),
                                        userSelect: 'none',
                                        outline: isFocused ? '2px solid #2196F3' : 'none',
                                        outlineOffset: '2px',
                                        opacity: item.isStatic && !isFocused && !isDragging ? 0.7 : 1
                                    }}
                                    onMouseDown={(e) => handleDragStart(e, item.id)}
                                    onClick={(e) => handleFocus(item.id, e)}
                                    onDoubleClick={() => handleDoubleClick(item.id)}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
                                            pointerEvents: 'none',
                                            border: isDragging || isResizing ? '2px solid #4CAF50' : '1px solid #ccc',
                                            boxShadow: isDragging || isResizing ? '0 4px 8px rgba(0,0,0,0.2)' : 'none'
                                        }}
                                    />

                                    {/* Ручки для изменения размера (показываем только для фокусированного элемента) */}
                                    {isFocused && (
                                        <>
                                            {/* Угловые ручки */}
                                            <div style={getResizeHandleStyle('top-left', isFocused)}
                                                onMouseDown={(e) => handleResizeStart(e, item.id, 'top-left')} />
                                            <div style={getResizeHandleStyle('top-right', isFocused)}
                                                onMouseDown={(e) => handleResizeStart(e, item.id, 'top-right')} />
                                            <div style={getResizeHandleStyle('bottom-right', isFocused)}
                                                onMouseDown={(e) => handleResizeStart(e, item.id, 'bottom-right')} />
                                            <div style={getResizeHandleStyle('bottom-left', isFocused)}
                                                onMouseDown={(e) => handleResizeStart(e, item.id, 'bottom-left')} />

                                            {/* Боковые ручки */}
                                            <div style={getResizeHandleStyle('top', isFocused)}
                                                onMouseDown={(e) => handleResizeStart(e, item.id, 'top')} />
                                            <div style={getResizeHandleStyle('right', isFocused)}
                                                onMouseDown={(e) => handleResizeStart(e, item.id, 'right')} />
                                            <div style={getResizeHandleStyle('bottom', isFocused)}
                                                onMouseDown={(e) => handleResizeStart(e, item.id, 'bottom')} />
                                            <div style={getResizeHandleStyle('left', isFocused)}
                                                onMouseDown={(e) => handleResizeStart(e, item.id, 'left')} />
                                        </>
                                    )}
                                </div>
                            );
                        })}
                </div>
            </ZoomableContainer>
        </div>
    );
});