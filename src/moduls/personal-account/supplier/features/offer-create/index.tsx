// src/pages/supplier/CreateOfferPage/index.tsx
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import MainInfoTab from '@supplier/features/offer-create/old-src/components/Tabs/MainInfoTab'
import DocumentsTab from '@supplier/features/offer-create/old-src/components/Tabs/DocumentsTab'
import styles from './CreateOfferPage.module.css'
import { useAuth } from '@/features/user/context/context'
import { createOfferModel } from './offer-create-model'
import Loader from '@/shared/ui-kits/loader/loader'
import { observer } from 'mobx-react-lite'
import { BasicInformationForm } from './tabs/basic-information-form'
import { DocumentsForm } from './tabs/documents-form'
import { InformationsBox } from '@/shared/ui-kits/information-box'
import Icon from '@/shared/ui-kits/Icon'
import { AccountHeader } from '@/moduls/personal-account/_layout/widgets/account-header'
import { BaseInfoFull } from '@/entities/request/type'
import { useOfferCreate } from './use-offer-create'
import { DeliveryForm } from './tabs/delivery-form'



interface Props {
  className: string,
  requestId: string
  request: BaseInfoFull
  onCancle: () => void
  setIsPay: () => void
}

export const CreateOfferForm = observer(({ className, requestId, request, onCancle, setIsPay }: Props) => {
  const { user, accountData } = useAuth()

  const { setModel, model, create, docsModel, clear, setDocsModel, isValid, isSubmitting } = createOfferModel

  const onSubmit = () => {
    create(user?.fullName, requestId, request.objectName, accountData.id, onCancle, setIsPay)
  }

  useEffect(() => {
    clear()
  }, [])


  return (
    <div className={`${styles.form} ${className} min-h-[50vh]`}>
      <h3 className={"text-[22px] font-semibold text-[#1E293B] mb-[10px] pb-[12px] border-b border-[#F1F5F9]"}>Создать коммерческое предложение</h3>


      <div className='mb-[24px]'>
        <BasicInformationForm model={model} setModel={setModel} />
      </div>

      <div className='mb-[24px]'>
        <DocumentsForm docsModel={docsModel} setDocsModel={setDocsModel} />
      </div>

      <div className='mb-[24px]'>
        <DeliveryForm model={model} setModel={setModel} />
      </div>



      <div className={styles.formActions}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancle}
        >
          Отмена
        </button>
        <button
          className={styles.submitButton}
          onClick={onSubmit}
          style={{ backgroundColor: isValid ? "black" : "" }}
        >
          {isSubmitting
            ? <span className={styles.spinner}>Отправка...</span>
            : <> <Icon name='file' width={18} />Отправить коммерческое предложение</>
          }
        </button>
      </div>
    </div>
  )
})