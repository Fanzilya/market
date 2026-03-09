import { schemeSettingModel } from "../../features/SchemeSetting/models/scheme-setting-model";
import { useEffect } from "react";
import { CoordinateManager } from "../../widgets/coordinate-manager/coordinate-manager";
import { checkBox } from "@/widgets/Scheme/src/data/teeska";
import { KNSSchema } from "@/widgets/Scheme";
import { EquipmentForm } from "../../widgets/scheme-form";
import { observer } from "mobx-react-lite";
import { savedData } from "@/moduls/personal-account/customer/features/CreateRequestPage/data";
import { STORAGE_KEY_SCHEME_SETTINGS } from "@/entities/scheme/config";

export const SchemeSetting = observer(() => {
    const {
        models,
        addModel,
        removeModel,
        setIdFocus,
        idFocusObject,
        focusedModel,
        updateModel,
        saveToStorage,
    } = schemeSettingModel


    useEffect(() => {
        if (models.length === 0) {
            savedData()
            const data = JSON.parse(localStorage.getItem(STORAGE_KEY_SCHEME_SETTINGS) || "")
            addModel(data)
        }
    }, [])


    return (
        <div className="grid grid-cols-[40%_55%] gap-[50px]">
            {idFocusObject != null
                ?
                <EquipmentForm
                    model={focusedModel}
                    onChange={(data) => updateModel(idFocusObject, data)}
                    onAdd={addModel}
                    onUpdate={saveToStorage}
                    onCancel={() => setIdFocus(null)}
                    removeModel={() => { removeModel(idFocusObject); setIdFocus(null) }}
                />
                :
                <CoordinateManager model={models} setIdFocus={setIdFocus} />
            }

            {/* <KNSSchema models={models} /> */}
            <KNSSchema
                models={models}
                editable
                onChange={(id, updates) => updateModel(id, updates)}
            />
        </div>
    );
})