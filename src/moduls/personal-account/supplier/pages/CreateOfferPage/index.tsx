// src/pages/supplier/CreateOfferPage/index.tsx
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import PageHeader from './components/PageHeader'
import RequestInfoCard from './components/RequestInfoCard'
import ClicksInfo from './components/ClicksInfo'
import SuccessNotification from './components/SuccessNotification'
import FormTabs from './components/FormTabs'
import ErrorBox from './components/ErrorBox'
import MainInfoTab from './components/Tabs/MainInfoTab'
import CompanyInfoTab from './components/Tabs/CompanyInfoTab'
import DeliveryTab from './components/Tabs/DeliveryTab'
import MaterialsTab from './components/Tabs/MaterialsTab'
import DocumentsTab from './components/Tabs/DocumentsTab'
import useRequestData from './hooks/useRequestData'
import useOfferForm from './hooks/useOfferForm'
import styles from './CreateOfferPage.module.css'
import { useAuth } from '@/features/user/context/context'
import { createOfferModel } from '../../features/create-offer/create-offer-model'
import Loader from '@/shared/ui-kits/loader/loader'
import { observer } from 'mobx-react-lite'
import { Input } from '@/shared/ui-kits/Input'

const TABS = [
  { id: 'main', label: 'Основная информация', component: MainInfoTab },
  { id: 'company', label: 'Информация о компании', component: CompanyInfoTab },
  { id: 'delivery', label: 'Условия поставки', component: DeliveryTab },
  { id: 'materials', label: 'Материалы и оборудование', component: MaterialsTab },
  { id: 'docs', label: 'Документы', component: DocumentsTab }
]

export const CreateOfferPage = observer(() => {
  const { requestId } = useParams()
  const location = useLocation()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('main')
  const [showSuccess, setShowSuccess] = useState(false)

  const { request, isLoader, init, setModel, model, create } = createOfferModel

  useEffect(() => {
    init(requestId!)
  }, [])

  const onSubmit = () => {
    create(user?.fullName, navigate)
  }


  const { formData, errors, isSubmitting, handleChange, handleSubmit, updateFormData } = useOfferForm({
    request, user,
    onSubmit: async (data) => {
      setShowSuccess(true)
      setTimeout(() => {
        navigate(`/supplier/request/${request.id}`, {
          state: {
            message: 'Коммерческое предложение успешно отправлено!',
            refresh: true,
            type: 'success'
          }
        })
      }, 1500)
    }
  })


  // const CurrentTabComponent = TABS.find(tab => tab.id === activeTab)?.component



  return isLoader ? <Loader /> : (
    <div className={styles.container}>
      <PageHeader
        requestId={request.id}
        onNavigate={navigate}
      />

      {showSuccess && <SuccessNotification />}

      <RequestInfoCard request={request} />

      <ClicksInfo />

      {/* <FormTabs
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      /> */}

      <ErrorBox error={errors.form} />

      <div className={styles.form}>
        {/* {CurrentTabComponent && ( */}
        {/* <MainInfoTab
          model={model}
          errors={errors}
          onChange={setModel}
          // updateFormData={updateFormData}
          isSubmitting={showSuccess}
        /> */}
        {/* // )} */}


        <div className='bg-white rounded-2xl border-[1px_solid_#E2E8F0] p-[24px] mb-[24px]'>
          <h3 className={styles.sectionTitle}>Основная информация</h3>
          <div className='grid grid-cols-2 gap-[16px]'>

            <div className={styles.formGroup}>
              <label className={styles.label}>Местоположение склада</label>
              <Input placeholder='Местоположение склада' value={model.warehouseLocation} onChange={(e) => setModel("warehouseLocation", e.toString())} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Cайта поставщика</label>
              <Input placeholder='Список поставщиков' value={model.supplierSiteURL} onChange={(e) => setModel("supplierSiteURL", e.toString())} />
            </div>

            <label className={styles.formGroup}>
              <div className={styles.label}>Дата оформления сопроводительного документа</div>
              <Input placeholder='Дата оформления сопроводительного документа' type='date' value={model.supportingDocumentDate} onChange={(e) => setModel("supportingDocumentDate", e)} />
            </label>
            <div className={styles.formGroup}>
              <label className={styles.label}>Страна производитель</label>
              <Input placeholder='Страна производитель' value={model.manufacturerCountry} onChange={(e) => setModel("manufacturerCountry", e.toString())} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Цена без НДС, ₽</label>
              <Input placeholder='Цена без НДС' value={model.currentPriceNoNDS || ""} type='number' onChange={(e) => setModel("currentPriceNoNDS", e.toString())} />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Цена с НДС, ₽</label>
              <Input placeholder='Цена с НДС' disabled value={(model.currentPriceNDS) || ""} type='number' onChange={(e) => setModel("currentPriceNDS", Number(e))} />
            </div>

          </div>
        </div>


        {!showSuccess && (
          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={() => navigate(`/supplier/request/${request.id}/preview`)}
            >
              Отмена
            </button>
            <button
              className={styles.submitButton}
              onClick={onSubmit}
            >
              {isSubmitting ? (
                <>
                  <span className={styles.spinner} />
                  Отправка...
                </>
              ) : (
                <>
                  <SendIcon />
                  Отправить коммерческое предложение
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>

  )
})

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M20 14.66V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2H14L20 8V14.66Z" stroke="white" strokeWidth="2" />
    <path d="M14 2V8H20" stroke="white" strokeWidth="2" />
  </svg>
)