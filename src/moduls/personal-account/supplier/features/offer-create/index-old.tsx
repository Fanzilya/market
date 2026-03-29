// src/pages/supplier/CreateOfferPage/index.tsx
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import PageHeader from '@supplier/features/offer-create/old-src/components/PageHeader'
import RequestInfoCard from '@supplier/features/offer-create/old-src/components/RequestInfoCard'
import SuccessNotification from '@supplier/features/offer-create/old-src/components/SuccessNotification'
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

const TABS = [
  { id: 'main', label: 'Основная информация', component: MainInfoTab },
  // { id: 'company', label: 'Информация о компании', component: CompanyInfoTab },
  // { id: 'delivery', label: 'Условия поставки', component: DeliveryTab },
  // { id: 'materials', label: 'Материалы и оборудование', component: MaterialsTab },
  { id: 'docs', label: 'Документы', component: DocumentsTab }
]

export const CreateOfferPage = observer(() => {
  const { requestId, type } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [showSuccess, setShowSuccess] = useState(false)

  const { request, isLoader, init, setModel, model, create, docsModel, setDocsModel, isValid, isSubmitting } = createOfferModel

  useEffect(() => {
    init(requestId!)
  }, [requestId])

  const onSubmit = () => {
    create(user?.fullName, navigate)
  }

  return isLoader ? <Loader /> : (
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
  )
})

// const SendIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//     <path d="M20 14.66V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2H14L20 8V14.66Z" stroke="white" strokeWidth="2" />
//     <path d="M14 2V8H20" stroke="white" strokeWidth="2" />
//   </svg>
// )