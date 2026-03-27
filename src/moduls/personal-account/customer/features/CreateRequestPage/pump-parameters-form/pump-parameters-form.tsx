import { observer } from 'mobx-react-lite';
import { KNSSchemaTesting } from '@/widgets/Scheme/scheme-testing';
import { PerfomanceMeasureUnit, PerfomanceMeasureUnitTranslations } from '@/entities/request/config';
import { Input } from '@/shared/ui-kits/Input';
import { SelectParameters } from '../ui/select-parameters';
import { pumpParametersModel } from './pump-parameters-model';
import { BackButton, FormBtnContainer, NextButton } from '../ui/form-btn-container';

interface Props {
    styles: any,
    handleNext: () => void
    handleBack: () => void
}

export const PumpParametersForm = observer(({ styles, handleNext, handleBack }: Props) => {

    const { model, setKnsData, clear, initData } = pumpParametersModel

    const handleBackButton = () => {
        clear()
        handleBack()
    }

    return (
        <div className={styles.stepContent} >
            <h2 className={styles.sectionTitle}>Технические параметры насосов</h2>
            <div className={styles.formGrid}>
                <div>
                    <h3 className={styles.subsectionTitle}>Основные параметры</h3>
                    <div className={styles.formGridTech}>

                        <h1>Форма насосов</h1>

                        {/* <div className="flex gap-3">
                            <Input
                                type="number"
                                value={model.capacity}
                                required
                                label='Производительность'
                                onChange={(e) => setKnsData("capacity", e)}
                                classNames={{ container: "w-full" }}
                                placeholder="0"
                            />

                            <SelectParameters
                                label='Единица измерения'
                                value={model.units}
                                onChange={(e) => setKnsData("units", e.target.value)}
                                items={[
                                    {
                                        value: PerfomanceMeasureUnit.LiterSecond,
                                        text: PerfomanceMeasureUnitTranslations[PerfomanceMeasureUnit.LiterSecond as PerfomanceMeasureUnit]
                                    },
                                    {
                                        value: PerfomanceMeasureUnit.CubicMeter,
                                        text: PerfomanceMeasureUnitTranslations[PerfomanceMeasureUnit.CubicMeter as PerfomanceMeasureUnit]
                                    },
                                ]}
                            />
                        </div> */}

                    </div>
                </div>

                <KNSSchemaTesting isActive={false} />
            </div>

            <FormBtnContainer>
                <BackButton onClick={handleBackButton} />
                <NextButton onClick={handleNext} />
            </FormBtnContainer >

        </div>
    );
})