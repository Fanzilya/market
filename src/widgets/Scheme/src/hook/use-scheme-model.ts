import { useState, useRef, useEffect } from "react";
import { EquipmentData } from "../data/teeska";

interface Props {
    models: EquipmentData[];
    onChange?: (id: string, updates: Partial<EquipmentData>) => void;
}

type ResizeInfo = {
    id: string;
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
};

type RotateInfo = {
    id: string;
    centerX: number;
    centerY: number;
};

type LineDragInfo = {
    id: string
    offsetX: number
    offsetY: number
}

type LineRotateInfo = {
    id: string
    centerX: number
    centerY: number
}


export const useKNSSchema = ({ models, onChange }: Props) => {
    const [lineDrag, setLineDrag] = useState<LineDragInfo | null>(null)
    const [lineRotate, setLineRotate] = useState<LineRotateInfo | null>(null)

    const containerRef = useRef<HTMLDivElement | null>(null);

    const [focusedId, setFocusedId] = useState<string | null>(null);
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const [resizeInfo, setResizeInfo] = useState<ResizeInfo | null>(null);
    const [rotateInfo, setRotateInfo] = useState<RotateInfo | null>(null);

    const getElement = (id: string) => models.find(e => e.id === id);

    const handleFocus = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setFocusedId(id);
    };

    const handleContainerClick = () => {
        setFocusedId(null);
    };

    // DRAG START
    const handleDragStart = (e: React.MouseEvent, id: string) => {

        const el = getElement(id);
        if (!el) return;

        e.stopPropagation();
        e.preventDefault();

        setDraggingId(id);

        setDragOffset({
            x: e.clientX - el.innerX,
            y: e.clientY - el.innerY
        });
    };

    // RESIZE START
    const handleResizeStart = (e: React.MouseEvent, id: string) => {

        const el = getElement(id);
        if (!el) return;

        e.stopPropagation();
        e.preventDefault();

        setResizeInfo({
            id,
            startX: e.clientX,
            startY: e.clientY,
            startWidth: el.innerWidth,
            startHeight: el.innerHeight
        });
    };

    // ROTATE START
    const handleRotateStart = (e: React.MouseEvent, id: string) => {

        const rect = e.currentTarget.parentElement!.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        setRotateInfo({
            id,
            centerX,
            centerY
        });

        e.stopPropagation();
        e.preventDefault();
    };

    // GLOBAL MOVE
    const handleMouseMove = (e: MouseEvent) => {

        if (draggingId) {

            const x = e.clientX - dragOffset.x;
            const y = e.clientY - dragOffset.y;

            onChange?.(draggingId, {
                innerX: x,
                innerY: y
            });
        }

        if (resizeInfo) {

            const { id, startX, startY, startWidth, startHeight } = resizeInfo;

            const dx = e.clientX - startX;
            const dy = e.clientY - startY;

            onChange?.(id, {
                innerWidth: Math.max(30, startWidth + dx),
                innerHeight: Math.max(30, startHeight + dy)
            });
        }

        if (rotateInfo) {

            const { id, centerX, centerY } = rotateInfo;

            const angle =
                Math.atan2(e.clientY - centerY, e.clientX - centerX) *
                (180 / Math.PI);

            onChange?.(id, {
                rotation: angle
            });
        }

        if (lineDrag) {

            const x = e.clientX - lineDrag.offsetX
            const y = e.clientY - lineDrag.offsetY

            onChange?.(lineDrag.id, {
                lineInnerX: x,
                lineInnerY: y
            })
        }

        if (lineRotate) {

            const { id, centerX, centerY } = lineRotate

            const angle =
                Math.atan2(e.clientY - centerY, e.clientX - centerX) *
                (180 / Math.PI)

            onChange?.(id, {
                lineRotation: angle
            })
        }
    };

    // GLOBAL END
    const handleMouseUp = () => {
        setDraggingId(null);
        setResizeInfo(null);
        setRotateInfo(null);
        setLineDrag(null)
        setLineRotate(null)
    };


    // Старт перемещения линии
    const handleLineDragStart = (e: React.MouseEvent, id: string) => {
        const el = getElement(id)
        if (!el) return

        e.stopPropagation()
        e.preventDefault()

        setLineDrag({
            id,
            offsetX: e.clientX - el.lineInnerX,
            offsetY: e.clientY - el.lineInnerY
        })
    }

    // Старт вращения линии
    const handleLineRotateStart = (e: React.MouseEvent, id: string) => {

        const rect = e.currentTarget.parentElement!.getBoundingClientRect()

        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        setLineRotate({
            id,
            centerX,
            centerY
        })

        e.stopPropagation()
        e.preventDefault()
    }

    useEffect(() => {
        if (onChange) {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseup", handleMouseUp);

            return () => {
                document.removeEventListener("mousemove", handleMouseMove);
                document.removeEventListener("mouseup", handleMouseUp);
            };
        }
    });

    return {
        containerRef,
        focusedId,

        handleFocus,
        handleContainerClick,
        handleDragStart,
        handleResizeStart,
        handleRotateStart,
        handleLineDragStart,
        handleLineRotateStart
    };
};