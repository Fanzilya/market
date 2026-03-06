import { makeAutoObservable } from 'mobx';

class ZoomableContainerModel {
    scale = 1;
    position = { x: 0, y: 0 };
    isDragging = false;
    dragStart = { x: 0, y: 0 };
    containerRef = null;
    contentRef = null;

    // Константы для масштабирования
    MIN_SCALE = 1;
    MAX_SCALE = 3;
    ZOOM_STEP = 0.2;

    constructor() {
        makeAutoObservable(this);
    }

    // Сеттеры для рефов
    setContainerRef = (ref) => {
        this.containerRef = ref;
    };

    setContentRef = (ref) => {
        this.contentRef = ref;
    };

    // Масштабирование
    zoomIn = () => {
        this.scale = Math.min(this.scale + this.ZOOM_STEP, this.MAX_SCALE);
    };

    zoomOut = () => {
        this.scale = Math.max(this.scale - this.ZOOM_STEP, this.MIN_SCALE);
    };

    // Сброс к исходному состоянию
    resetZoom = () => {
        this.scale = 1;
        this.position = { x: 0, y: 0 };
    };

    // Обработчики для перетаскивания
    handleMouseDown = (e) => {
        this.isDragging = true;
        this.dragStart = {
            x: e.clientX - this.position.x,
            y: e.clientY - this.position.y
        };
    };

    handleMouseMove = (e) => {
        if (!this.isDragging) return;

        e.preventDefault();

        const newX = e.clientX - this.dragStart.x;
        const newY = e.clientY - this.dragStart.y;

        // Ограничиваем перемещение, чтобы не уйти за пределы
        const container = this.containerRef?.current;
        const content = this.contentRef?.current;

        if (container && content) {
            const containerRect = container.getBoundingClientRect();
            const contentRect = content.getBoundingClientRect();

            const maxX = Math.max(0, (contentRect.width * this.scale - containerRect.width) / 2);
            const maxY = Math.max(0, (contentRect.height * this.scale - containerRect.height) / 2);

            this.position = {
                x: Math.min(Math.max(newX, -maxX), maxX),
                y: Math.min(Math.max(newY, -maxY), maxY)
            };
        }
    };

    handleMouseUp = () => {
        this.isDragging = false;
    };

    // Очистка состояния
    cleanup = () => {
        this.isDragging = false;
        this.dragStart = { x: 0, y: 0 };
    };

    // Геттеры для трансформаций
    get transformStyle() {
        return {
            transform: `translate(${this.position.x}px, ${this.position.y}px) scale(${this.scale})`,
            transformOrigin: '0 0',
            cursor: this.isDragging ? 'grabbing' : 'grab',
            transition: this.isDragging ? 'none' : 'transform 0.1s ease'
        };
    }

    get isZoomed() {
        return this.scale > this.MIN_SCALE;
    }

    get zoomLevel() {
        return Math.round(this.scale * 100) / 100;
    }

    get zoomPercentage() {
        return Math.round(this.scale * 100);
    }
}

export const zoomableContainerModel = new ZoomableContainerModel();