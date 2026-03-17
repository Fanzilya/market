// src/pages/supplier/CreateOfferPage/index.tsx
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import PageHeader from '@supplier/features/offer-create/old-src/components/PageHeader'
import RequestInfoCard from '@supplier/features/offer-create/old-src/components/RequestInfoCard'
import ClicksInfo from '@supplier/features/offer-create/old-src/components/ClicksInfo'
import SuccessNotification from '@supplier/features/offer-create/old-src/components/SuccessNotification'
import FormTabs from '@supplier/features/offer-create/old-src/components/FormTabs'
import ErrorBox from '@supplier/features/offer-create/old-src/components/ErrorBox'
import MainInfoTab from '@supplier/features/offer-create/old-src/components/Tabs/MainInfoTab'
import CompanyInfoTab from '@supplier/features/offer-create/old-src/components/Tabs/CompanyInfoTab'
import DeliveryTab from '@supplier/features/offer-create/old-src/components/Tabs/DeliveryTab'
import MaterialsTab from '@supplier/features/offer-create/old-src/components/Tabs/MaterialsTab'
import DocumentsTab from '@supplier/features/offer-create/old-src/components/Tabs/DocumentsTab'
import useRequestData from '@supplier/features/offer-create/old-src/hooks/useRequestData'
import useOfferForm from '@supplier/features/offer-create/old-src/hooks/useOfferForm'
import styles from './CreateOfferPage.module.css'
import { useAuth } from '@/features/user/context/context'
import { createOfferModel } from '../../features/offer-create/offer-create-model'
import Loader from '@/shared/ui-kits/loader/loader'
import { observer } from 'mobx-react-lite'
import { Input } from '@/shared/ui-kits/Input'
import { BasicInformationForm } from './tabs/basic-information-form'
import { DocumentsForm } from './tabs/documents-form'
import { InformationsBox } from '@/shared/ui-kits/information-box'
import Icon from '@/shared/ui-kits/Icon'

const TABS = [
  { id: 'main', label: 'Основная информация', component: MainInfoTab },
  // { id: 'company', label: 'Информация о компании', component: CompanyInfoTab },
  // { id: 'delivery', label: 'Условия поставки', component: DeliveryTab },
  // { id: 'materials', label: 'Материалы и оборудование', component: MaterialsTab },
  { id: 'docs', label: 'Документы', component: DocumentsTab }
]

export const CreateOfferPage = observer(() => {
  const { requestId } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<"main" | "company" | "delivery" | "materials" | "docs">('main')
  const [showSuccess, setShowSuccess] = useState(false)

  const { request, isLoader, init, setModel, model, create, docsModel, setDocsModel, isValid, isSubmitting } = createOfferModel

  useEffect(() => {
    init(requestId!)
  }, [requestId])

  const onSubmit = () => {
    create(user?.fullName, navigate)
  }


  return isLoader ? <Loader /> : (
    <div className={styles.container}>
      <PageHeader
        requestId={request?.id}
        onNavigate={navigate}
      />

      {showSuccess && <SuccessNotification />}

      <RequestInfoCard request={request} />

      <InformationsBox
        title='Использован 1 бесплатный отклик'
        text='После отправки КП вам станет доступна полная информация о заказчике.'
        type='info'
        classNames={{ container: "mb-[20px]" }}
      />

      {/* <FormTabs
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      /> */}

      {/* <InformationsBox text={error} type='info' classNames={{ container: "mb-[20px]" }} /> */}

      <div className={styles.form}>

        <div className='bg-white rounded-2xl border-[1px_solid_#E2E8F0] p-[24px] mb-[24px]'>
          <BasicInformationForm model={model} setModel={setModel} />
          <div className='h-6'></div>
          <DocumentsForm docsModel={docsModel} setDocsModel={setDocsModel} />
          {/* {activeTab == "main" &&
          }
          {activeTab == "docs" &&
          } */}
        </div>

        {!showSuccess && (
          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => navigate(`/supplier/request/${request.id}`)}
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
        )}
      </div>
    </div>

  )
})

// const SendIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//     <path d="M20 14.66V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2H14L20 8V14.66Z" stroke="white" strokeWidth="2" />
//     <path d="M14 2V8H20" stroke="white" strokeWidth="2" />
//   </svg>
// )