import { makeAutoObservable } from 'mobx';
import { checkBox, schemeKNS } from '../scheme-form/components/teeska';

class SchemeActionsModel {
    elementsKNS = schemeKNS.map((item, index) => ({
        ...item,
        id: item.value || `kns-${item.name || index}`,
        type: 'static',
        originalIndex: index
    }))

    elements = checkBox.map((item, index) => ({
        ...item,
        id: item.value || `element-${index}`,
        type: 'dynamic',
        originalIndex: index
    }))

    constructor() {
        makeAutoObservable(this)
    }

    // Обновление динамических элементов
    setElements(data) {
        this.elements = data
    }

    // Обновление статических элементов
    setElementsKNS(data) {
        this.elementsKNS = data
    }

    // Универсальное обновление позиции
    updateElementPosition(id, x, y) {
        // Проверяем в динамических элементах
        const dynamicIndex = this.elements.findIndex(el => el.id === id);
        if (dynamicIndex !== -1) {
            this.elements[dynamicIndex] = {
                ...this.elements[dynamicIndex],
                innerX: x,
                innerY: y
            };
            return;
        }

        // Проверяем в статических элементах
        const staticIndex = this.elementsKNS.findIndex(el => el.id === id);
        if (staticIndex !== -1) {
            this.elementsKNS[staticIndex] = {
                ...this.elementsKNS[staticIndex],
                innerX: x,
                innerY: y
            };
        }
    }

    // Универсальное обновление размера
    updateElementSize(id, width, height) {
        // Проверяем в динамических элементах
        const dynamicIndex = this.elements.findIndex(el => el.id === id);
        if (dynamicIndex !== -1) {
            this.elements[dynamicIndex] = {
                ...this.elements[dynamicIndex],
                innerWidth: width,
                innerHeight: height
            };
            return;
        }

        // Проверяем в статических элементах
        const staticIndex = this.elementsKNS.findIndex(el => el.id === id);
        if (staticIndex !== -1) {
            this.elementsKNS[staticIndex] = {
                ...this.elementsKNS[staticIndex],
                innerWidth: width,
                innerHeight: height
            };
        }
    }

    // Универсальное обновление всех параметров элемента
    updateElement(id, updates) {
        // Проверяем в динамических элементах
        const dynamicIndex = this.elements.findIndex(el => el.id === id);
        if (dynamicIndex !== -1) {
            this.elements[dynamicIndex] = {
                ...this.elements[dynamicIndex],
                ...updates
            };
            return;
        }

        // Проверяем в статических элементах
        const staticIndex = this.elementsKNS.findIndex(el => el.id === id);
        if (staticIndex !== -1) {
            this.elementsKNS[staticIndex] = {
                ...this.elementsKNS[staticIndex],
                ...updates
            };
        }
    }

    // Получить элемент по ID
    getElementById(id) {
        return this.elements.find(el => el.id === id) ||
            this.elementsKNS.find(el => el.id === id);
    }

    // Получить все элементы (объединенный список)
    getAllElements() {
        return [...this.elementsKNS, ...this.elements];
    }

    // Получить только активные динамические элементы
    getActiveElements() {
        return this.elements.filter(el => el.checked);
    }

    // Сбросить позиции статических элементов к исходным
    resetStaticElements() {
        this.elementsKNS = schemeKNS.map((item, index) => ({
            ...item,
            id: item.value || `kns-${item.name || index}`,
            type: 'static',
            originalIndex: index
        }));
    }

    // Сбросить позиции динамических элементов к исходным
    resetDynamicElements() {
        this.elements = checkBox.map((item, index) => ({
            ...item,
            id: item.value || `element-${index}`,
            type: 'dynamic',
            originalIndex: index
        }));
    }

    // Сбросить все элементы
    resetAll() {
        this.resetStaticElements();
        this.resetDynamicElements();
    }

    // Обновить чекбокс динамического элемента
    toggleElementChecked(id) {
        const index = this.elements.findIndex(el => el.id === id);
        if (index !== -1) {
            this.elements[index] = {
                ...this.elements[index],
                checked: !this.elements[index].checked
            };
        }
    }

    // Получить элементы по типу
    getElementsByType(type) {
        if (type === 'static') return this.elementsKNS;
        if (type === 'dynamic') return this.elements;
        return this.getAllElements();
    }
}

export const schemeActionsModel = new SchemeActionsModel();