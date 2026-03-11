import { useKNSSchema } from "./src/hook/use-scheme-model";
import { ZoomableContainer } from "./src/components/zoomable-container";
import { EquipmentData } from "./src/data/teeska";
import { observer } from "mobx-react-lite";
import styles from "./scheme.module.css";

import schemeActiveCheck from "../../moduls/personal-account/customer/assets/imgs/scheme-active-check.png"
import scheme from "../../moduls/personal-account/customer/assets/imgs/scheme.png"

interface Props {
    isActive: boolean
}

export const KNSSchemaTesting = observer(({ isActive }: Props) => {
    return (
        <div className={styles.schemaContainer}>
            <ZoomableContainer>
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        minHeight: "600px"
                    }}
                >


                    <div className="p-4"
                        style={{
                            position: "absolute",
                            left: 0,
                            top: 0,
                            width: "100%",
                            height: "100%",
                            // transform: `rotate(${item.rotation || 0}deg)`,
                            transformOrigin: "center",
                            cursor: "default"
                        }}
                    >

                        <img
                            src={isActive ? schemeActiveCheck : scheme}
                            alt={"scheme"}
                            className="rounded-lg"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                userSelect: "none",
                                WebkitUserSelect: "none",
                                MozUserSelect: "none",
                                msUserSelect: "none",
                                pointerEvents: "none"
                            }}
                        />


                    </div>
                </div>
            </ZoomableContainer>
        </div>
    );
})