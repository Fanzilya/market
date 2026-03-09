import React from 'react';

interface ResizeHandlesProps {
    itemId: string;
    isFocused: boolean;
    onResizeStart: (e: React.MouseEvent, id: string, handle: string) => void;
}

const HANDLE_POSITIONS = [
    'top-left', 'top', 'top-right',
    'right', 'bottom-right', 'bottom',
    'bottom-left', 'left'
] as const;

type HandlePosition = typeof HANDLE_POSITIONS[number];

const getHandleStyle = (position: HandlePosition, isFocused: boolean): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
        position: 'absolute',
        width: position.includes('left') || position.includes('right') ? '8px' : '16px',
        height: position.includes('top') || position.includes('bottom') ? '8px' : '16px',
        backgroundColor: isFocused ? '#4CAF50' : '#2196F3',
        border: '2px solid white',
        borderRadius: '4px',
        cursor: getCursorForHandle(position),
        zIndex: 102
    };

    return { ...baseStyle, ...getHandlePosition(position) };
};

const getHandlePosition = (position: HandlePosition): React.CSSProperties => {
    const positions: Record<HandlePosition, React.CSSProperties> = {
        'top-left': { top: -4, left: -4 },
        'top': { top: -4, left: '50%', transform: 'translateX(-50%)' },
        'top-right': { top: -4, right: -4 },
        'right': { right: -4, top: '50%', transform: 'translateY(-50%)' },
        'bottom-right': { bottom: -4, right: -4 },
        'bottom': { bottom: -4, left: '50%', transform: 'translateX(-50%)' },
        'bottom-left': { bottom: -4, left: -4 },
        'left': { left: -4, top: '50%', transform: 'translateY(-50%)' }
    };
    return positions[position];
};

const getCursorForHandle = (position: HandlePosition): string => {
    const cursors: Record<HandlePosition, string> = {
        'top-left': 'nwse-resize',
        'top': 'ns-resize',
        'top-right': 'nesw-resize',
        'right': 'ew-resize',
        'bottom-right': 'nwse-resize',
        'bottom': 'ns-resize',
        'bottom-left': 'nesw-resize',
        'left': 'ew-resize'
    };
    return cursors[position];
};

export const ResizeHandles: React.FC<ResizeHandlesProps> = ({
    itemId,
    isFocused,
    onResizeStart
}) => {
    return (
        <>
            {HANDLE_POSITIONS.map((position) => (
                <div
                    key={position}
                    style={getHandleStyle(position, isFocused)}
                    onMouseDown={(e) => onResizeStart(e, itemId, position)}
                />
            ))}
        </>
    );
};