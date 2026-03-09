import React, { useRef, useEffect } from 'react';
import './ZoomableContainer.css';
import { observer } from 'mobx-react-lite';
import { zoomableContainerModel } from '../models/zoomable-container-model';

export const ZoomableContainer = observer(({ children }) => {
    const { setContainerRef, setContentRef, handleMouseMove, handleMouseUp,
        cleanup, zoomOut, MIN_SCALE, zoomPercentage, zoomIn, scale, MAX_SCALE,
        isZoomed, resetZoom, handleMouseDown, transformStyle } = zoomableContainerModel

    const containerRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        setContainerRef(containerRef);
        setContentRef(contentRef);
    }, [setContainerRef, setContentRef]);

    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            cleanup();
        };
    }, [handleMouseMove, handleMouseUp, cleanup]); // Зависимости от функций модели

    return (
        <div className="zoomable-container-wrapper">
            <div ref={containerRef} className="zoomable-container">
                <div
                    ref={contentRef}
                    className="zoomable-content"
                    style={{
                        ...transformStyle,
                        width: '100%',
                        height: '100%',
                        display: 'inline-block'
                    }}
                    onMouseDown={handleMouseDown}
                >
                    {children}
                </div>
            </div>
            <div className="controls">
                <button
                    onClick={zoomIn}
                    className="control-btn"
                    disabled={scale >= MAX_SCALE}
                >
                    +
                </button>
                <button
                    onClick={zoomOut}
                    className="control-btn"
                    disabled={scale <= MIN_SCALE}
                >
                    -
                </button>
                <button onClick={resetZoom} className="control-btn reset">
                    Сброс
                </button>
                <span className="zoom-level">{zoomPercentage}%</span>
            </div>
        </div>
    );
});