import { observer } from 'mobx-react-lite';
import { KNSSchemaTesting } from '@/widgets/Scheme/scheme-testing';
import { PerfomanceMeasureUnit, PerfomanceMeasureUnitTranslations } from '@/entities/request/config';
import { Input } from '@/shared/ui-kits/Input';
import { SelectParameters } from '../ui/select-parameters';
import { pumpParametersModel } from './pump-parameters-model';
import { BackButton, FormBtnContainer, NextButton } from '../ui/form-btn-container';
import { useEffect } from 'react';
import { SchemeDocsForm } from '@/widgets/scheme-docs/scheme-docs-form';
import { Selector } from '@/shared/ui-kits/select';

interface Props {
    styles: any,
    handleNext: () => void
    handleBack: () => void
    fullClear: boolean,
}

export const PumpParametersForm = observer(({ styles, handleNext, handleBack, fullClear }: Props) => {

    const { clearForm, validateForm, setModelData, initData, model, configTypes, errorModel, setFile, fileUrl, file } = pumpParametersModel

    useEffect(() => {
        if (configTypes.length == 0) {
            initData()
        }

        if (fullClear) {
            errorModel.clearErrors()
            clearForm()
        }
    }, [])

    const handleBackButton = () => {
        clearForm()
        handleBack()
    }

    const onHandleNext = () => {
        if (validateForm()) {
            handleNext()
        }
    }


    return (
        <div className={styles.stepContent} >
            <h2 className={styles.sectionTitle}>Технические параметры насосов</h2>
            <div className={styles.formGrid}>
                <div>
                    <h3 className={styles.subsectionTitle}>Форма конфигурации насоса</h3>
                    <div className={styles.formGridTech}>
                        <Selector
                            required
                            placeholder={"Вид перекачиваемой жидкости"}
                            label={"Вид перекачиваемой жидкости"}
                            classNames={{ wripper: "w-[20%] min-w-[250px]" }}
                            items={[
                                {
                                    title: "Бытовые сточные воды",
                                    value: "Бытовые сточные воды"
                                },
                                {
                                    title: "Производственные сточные воды",
                                    value: "Производственные сточные воды"
                                },
                                {
                                    title: "Дождевой и талый сток",
                                    value: "Дождевой и талый сток"
                                },
                            ]}

                            defaultValue={String(model.pumpTypeId)}
                            onSelect={(e) => setModelData("pumpTypeId", e.value)}
                            error={errorModel.errors.pumpTypeId}
                        />

                        {/* ПОДАЧА */}
                        <Input
                            required
                            label='Производительность'
                            type="number"
                            value={model.pumpEfficiency}
                            onChange={(e) => setModelData("pumpEfficiency", e)}
                            error={errorModel.errors.pumpEfficiency}
                            placeholder="0"
                        />

                        <Input
                            label='Кол-во рабочих насосов'
                            type="number"
                            value={model.pumpEfficiency}
                            onChange={(e) => setModelData("pumpEfficiency", e)}
                            error={errorModel.errors.pumpEfficiency}
                            placeholder="0"
                        />
                        <Input
                            label='Кол-во резервных'
                            type="number"
                            value={model.pumpEfficiency}
                            onChange={(e) => setModelData("pumpEfficiency", e)}
                            error={errorModel.errors.pumpEfficiency}
                            placeholder="0"
                        />
                    </div>

                    <h3 className={styles.subsectionTitle}>Качество воды</h3>
                    <div className={styles.formGridTech}>
                        <Input
                            label='Температура (°C)'
                            type="number"
                            value={model.pumpEfficiency}
                            onChange={(e) => setModelData("pumpEfficiency", e)}
                            error={errorModel.errors.pumpEfficiency}
                            placeholder="0 °C"
                        />

                        <Input
                            label='Крупность минеральных частиц'
                            type="number"
                            value={model.pumpEfficiency}
                            onChange={(e) => setModelData("pumpEfficiency", e)}
                            error={errorModel.errors.pumpEfficiency}
                            placeholder="0 °C"
                        />

                        <Input
                            label='Содержание минеральных частиц кг/м³'
                            type="number"
                            value={model.pumpEfficiency}
                            onChange={(e) => setModelData("pumpEfficiency", e)}
                            error={errorModel.errors.pumpEfficiency}
                            placeholder="0 °C"
                        />
                    </div>
                </div>

                {/* <Selector
                    required
                    placeholder={"Вид перекачиваемой жидкости"}
                    label={"Вид перекачиваемой жидкости"}
                    classNames={{ wripper: "w-[20%] min-w-[250px]" }}
                    items={configTypes.map(item => {
                        return {
                            title: item.typeName,
                            value: item.id
                        }
                    })}

                    defaultValue={String(model.pumpTypeId)}
                    onSelect={(e) => setModelData("pumpTypeId", e.value)}
                    error={errorModel.errors.pumpTypeId}
                /> */}

                <SchemeDocsForm setFile={setFile} isError={errorModel.errors?.fileUrl?.length > 0} fileUrl={fileUrl} fileData={file} />
            </div>

            <FormBtnContainer>
                <BackButton onClick={handleBackButton} />
                <NextButton onClick={onHandleNext} />
            </FormBtnContainer >

        </div>
    );
})