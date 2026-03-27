import { EquipmentDataCheckbox } from '@/widgets/Scheme/src/data/teeska';
import { makeAutoObservable } from 'mobx';


class KnsRuleuleSchemeObjectModel {

    checkForDisable(data: EquipmentDataCheckbox[], id: number, checked: boolean) {
        const arraySetting: Record<number, number[]> = {
            5: [2, 3, 7],
            2: [5, 1],
        };

        const elementsToDisable = arraySetting[id];

        if (elementsToDisable) {
            data.forEach(item => {
                if (elementsToDisable.includes(item.id)) {
                    item.checked = false;
                    item.disabled = checked;
                }
            });
        }
    }
}

export const knsRuleSchemeObjectModel = new KnsRuleuleSchemeObjectModel()