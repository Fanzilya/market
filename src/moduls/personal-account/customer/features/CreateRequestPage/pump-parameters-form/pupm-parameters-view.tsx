import { observer } from 'mobx-react-lite';
import { PerfomanceMeasureUnitTranslations, PumpsStartupMethodTranslations } from '@/entities/request/config';
import { BackButton, FormBtnContainer } from '../ui/form-btn-container';
import { FormViewContainer } from '../ui/form-view-container';
import { pumpParametersModel } from './pump-parameters-model';


interface Props {
    styles: any,
    handleNext: () => void
    handleBack: () => void
}

export const PupmParametersView = observer(({ styles, handleNext, handleBack }: Props) => {

    const { model } = pumpParametersModel

    return (
        <>
            <FormViewContainer
                title='Результат формы'
                items={[]}
            />


            <FormBtnContainer>
                <BackButton onClick={handleBack} />
                {/* <SubmitButton /> */}
            </FormBtnContainer >
        </>
    );
})


// {elements && (
//     <>
//         <h3 className={styles.previewTitle}>Дополнительная комплектация</h3>
//         <div className={styles.previewList}>
//
//         </div>
//     </>
// )}

