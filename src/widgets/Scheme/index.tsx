import { useKNSSchema } from "./src/hook/use-scheme-model";
import { ZoomableContainer } from "./src/components/zoomable-container";
import { EquipmentData } from "./src/data/teeska";
import { observer } from "mobx-react-lite";
import styles from "./Scheme.module.css";

interface Props {
    models: EquipmentData[]
    editable?: boolean
    onChange?: (id: string, updates: Partial<EquipmentData>) => void
}

export const KNSSchema = observer(({ models, editable = false, onChange }: Props) => {

    const {
        containerRef,
        focusedId,

        handleFocus,
        handleContainerClick,
        handleDragStart,
        handleResizeStart,
        handleRotateStart,
        handleLineDragStart,
        handleLineRotateStart
    } = useKNSSchema({ models, onChange });

    return (
        <div className={styles.schemaContainer}>
            <ZoomableContainer>

                <div
                    ref={containerRef}
                    onClick={handleContainerClick}
                    style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        minHeight: "600px"
                    }}
                >

                    {models.map(item => {

                        const isFocused = focusedId === item.id;

                        return (
                            <>
                                <div
                                    key={item.id}
                                    style={{
                                        position: "absolute",
                                        left: item.innerX,
                                        top: item.innerY,
                                        width: item.innerWidth,
                                        height: item.innerHeight,
                                        transform: `rotate(${item.rotation || 0}deg)`,
                                        transformOrigin: "center",
                                        cursor: editable ? "grab" : "default"
                                    }}
                                    onMouseDown={(e) => editable && handleDragStart(e, item.id)}
                                    onClick={(e) => handleFocus(item.id, e)}
                                >

                                    <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "contain" }} />

                                    {editable && isFocused && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                right: -6,
                                                bottom: -6,
                                                width: 12,
                                                height: 12,
                                                background: "#2196F3",
                                                cursor: "nwse-resize"
                                            }}
                                            onMouseDown={(e) => handleResizeStart(e, item.id)}
                                        />
                                    )}

                                    {editable && isFocused && (
                                        <div
                                            style={{
                                                position: "absolute",
                                                top: -20,
                                                left: "50%",
                                                transform: "translateX(-50%)",
                                                width: 12,
                                                height: 12,
                                                borderRadius: "50%",
                                                background: "#22c55e",
                                                cursor: "grab"
                                            }}
                                            onMouseDown={(e) => handleRotateStart(e, item.id)}
                                        />
                                    )}
                                </div>

                                {item.showLine &&
                                    <div
                                        className="bg-black flex"
                                        style={{
                                            position: "absolute",
                                            width: item.lineWidth,
                                            height: item.lineHeight,
                                            rotate: item.lineRotation + "deg",
                                            left: item.lineInnerX,
                                            top: item.lineInnerY,
                                            alignItems: item.lineWidth > item.lineHeight ? "end" : "center",
                                            justifyContent: item.lineWidth > item.lineHeight ? "center" : "end",
                                            cursor: editable ? "grab" : "default"
                                        }}

                                        onMouseDown={(e) => editable && handleLineDragStart(e, item.id)}
                                    >

                                        {item.zeroLabel}
                                        {editable && isFocused && item.showLine &&
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    top: "-16",
                                                    left: "50%",
                                                    transform: "translateX(-50%)",
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: "50%",
                                                    background: "orange",
                                                    cursor: "grab"
                                                }}

                                                onMouseDown={(e) => handleLineRotateStart(e, item.id)}
                                            />

                                        }
                                    </div>
                                }
                            </>
                        );
                    })}

                </div>

            </ZoomableContainer>
        </div>
    );
})