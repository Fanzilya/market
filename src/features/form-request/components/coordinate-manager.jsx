import React, { useState } from 'react';
import './CoordinateManager.css';
import { observer } from 'mobx-react-lite';

export const CoordinateManager = observer(({ model }) => {
    const [editingIndex, setEditingIndex] = useState(null);

    // Обработчик изменения чекбокса
    const handleCheckboxChange = (index) => {
        const updatedItems = [...model.elements];
        updatedItems[index].checked = !updatedItems[index].checked;
        model.setElements(updatedItems);
    };

    // Обработчик выбора элемента для редактирования
    const handleSelectItem = (index) => {
        setEditingIndex(index);
    };

    // Обработчик изменения параметров (напрямую меняет элемент в массиве)
    const handleParamChange = (e, index) => {
        const { name, value } = e.target;
        const updatedItems = [...model.elements];
        updatedItems[index] = {
            ...updatedItems[index],
            [name]: parseInt(value) || 0
        };
        model.setElements(updatedItems);
    };

    // Закрытие панели редактирования
    const handleClose = () => {
        setEditingIndex(null);
    };

    const selectedItem = editingIndex !== null ? model.elements[editingIndex] : null;

    return (
        <div className="coordinate-manager">
            <h2>Управление координатами и размерами</h2>

            <div className="main-layout">
                {/* Список элементов */}
                <div className="items-list">
                    <h3>Элементы схемы</h3>
                    {model.elements.map((item, index) => (
                        <div
                            key={item.value}
                            className={`item-card ${editingIndex === index ? 'selected' : ''}`}
                            onClick={() => handleSelectItem(index)}
                        >
                            <div className="item-header">
                                <input
                                    type="checkbox"
                                    checked={item.checked}
                                    onChange={(e) => {
                                        e.stopPropagation();
                                        handleCheckboxChange(index);
                                    }}
                                />
                                <span className="item-name">{item.name}</span>
                            </div>

                            <div className="item-preview">
                                {item.image && (
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            objectFit: 'contain'
                                        }}
                                    />
                                )}
                            </div>

                            <div className="item-coords">
                                <div>X: {item.innerX}</div>
                                <div>Y: {item.innerY}</div>
                                <div>W: {item.innerWidth}</div>
                                <div>H: {item.innerHeight}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Панель редактирования */}
                {editingIndex !== null && selectedItem && (
                    <div className="edit-panel">
                        <div className="edit-panel-header">
                            <h3>Редактирование: {selectedItem.name}</h3>
                            <button onClick={handleClose} className="close-btn">×</button>
                        </div>

                        <div className="form-group">
                            <label htmlFor={`innerX-${editingIndex}`}>Позиция X:</label>
                            <input
                                type="number"
                                id={`innerX-${editingIndex}`}
                                name="innerX"
                                value={selectedItem.innerX}
                                onChange={(e) => handleParamChange(e, editingIndex)}
                                min="0"
                                step="1"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor={`innerY-${editingIndex}`}>Позиция Y:</label>
                            <input
                                type="number"
                                id={`innerY-${editingIndex}`}
                                name="innerY"
                                value={selectedItem.innerY}
                                onChange={(e) => handleParamChange(e, editingIndex)}
                                min="0"
                                step="1"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor={`innerWidth-${editingIndex}`}>Ширина:</label>
                            <input
                                type="number"
                                id={`innerWidth-${editingIndex}`}
                                name="innerWidth"
                                value={selectedItem.innerWidth}
                                onChange={(e) => handleParamChange(e, editingIndex)}
                                min="10"
                                max="1000"
                                step="1"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor={`innerHeight-${editingIndex}`}>Высота:</label>
                            <input
                                type="number"
                                id={`innerHeight-${editingIndex}`}
                                name="innerHeight"
                                value={selectedItem.innerHeight}
                                onChange={(e) => handleParamChange(e, editingIndex)}
                                min="10"
                                max="1000"
                                step="1"
                            />
                        </div>

                        {selectedItem.image && (
                            <div className="image-preview">
                                <h4>Предпросмотр:</h4>
                                <img
                                    src={selectedItem.image}
                                    alt={selectedItem.name}
                                    style={{
                                        width: `${Math.min(selectedItem.innerWidth, 200)}px`,
                                        height: `${Math.min(selectedItem.innerHeight, 200)}px`,
                                        objectFit: 'contain',
                                        border: '1px solid #ccc',
                                        marginTop: '10px'
                                    }}
                                />
                            </div>
                        )}

                        <div className="button-group">
                            <button onClick={handleClose} className="close-edit-btn">
                                Закрыть
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
});