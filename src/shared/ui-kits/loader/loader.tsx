import React, { CSSProperties } from 'react';
import './loader.css';

type LoaderProps = {
    size?: number;          // размер спиннера
    color?: string;         // цвет
    fullscreen?: boolean;   // блокирует страницу оверлеем
};

const Loader: React.FC<LoaderProps> = ({
    size = 48,
    color = '#007aff',
    fullscreen = false
}) => {
    const style: CSSProperties = {
        width: size,
        height: size,
        borderColor: color,
        borderTopColor: 'transparent'
    };

    return (
        <div className={fullscreen ? 'loader-overlay' : 'loader-wrapper'}>
            <div className="loader-spinner" style={style} />
        </div>
    );
};

export default Loader;
