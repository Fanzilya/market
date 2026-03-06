// src/pages/supplier/CreateOfferPage/index.jsx
import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { getSessionUser } from '../../../auth/demoAuth.js'
import Sidebar from '../../../components/Sidebar.jsx'
import AccessDenied from './components/AccessDenied'
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

const TABS = [
  { id: 'main', label: 'Основная информация', component: MainInfoTab },
  { id: 'company', label: 'Информация о компании', component: CompanyInfoTab },
  { id: 'delivery', label: 'Условия поставки', component: DeliveryTab },
  { id: 'materials', label: 'Материалы и оборудование', component: MaterialsTab },
  { id: 'docs', label: 'Документы', component: DocumentsTab }
]

export default function CreateOfferPage() {
  const { requestId } = useParams()
  const location = useLocation()
  const user = getSessionUser()
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('main')
  const [showSuccess, setShowSuccess] = useState(false)

  const { request, isLoading: isLoadingRequest } = useRequestData({ 
    requestId, 
    initialState: location.state?.request 
  })

  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    validateForm,
    updateFormData
  } = useOfferForm({
    request,
    user,
    onSubmit: async (data) => {
      setShowSuccess(true)
      setTimeout(() => {
        navigate(`/supplier/request/${request.id}/full`, {
          state: { 
            message: 'Коммерческое предложение успешно отправлено!',
            refresh: true,
            type: 'success'
          }
        })
      }, 1500)
    }
  })

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    setDarkMode(savedTheme === 'dark')
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
    document.body.classList.toggle('dark-mode', darkMode)
  }, [darkMode])

  if (!user) {
    return <AccessDenied type="session" onNavigate={navigate} />
  }

  if (isLoadingRequest) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner} />
        <p>Загрузка данных заявки...</p>
      </div>
    )
  }

  if (!request) {
    return <AccessDenied type="notFound" onNavigate={navigate} />
  }

  const CurrentTabComponent = TABS.find(tab => tab.id === activeTab)?.component

  return (
    <div className={`${styles.page} ${darkMode ? styles.dark : ''}`}>
      <Sidebar
        user={user}
        onLogout={() => navigate('/')}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <main className={styles.main}>
        <div className={styles.container}>
          <PageHeader 
            requestId={request.id} 
            onNavigate={navigate} 
          />

          {showSuccess && <SuccessNotification />}

          <RequestInfoCard request={request} />
          
          <ClicksInfo />

          <FormTabs 
            tabs={TABS} 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />

          <ErrorBox error={errors.form} />

          <form onSubmit={handleSubmit} className={styles.form}>
            {CurrentTabComponent && (
              <CurrentTabComponent
                formData={formData}
                errors={errors}
                onChange={handleChange}
                updateFormData={updateFormData}
                isSubmitting={showSuccess}
              />
            )}

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
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
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
          </form>
        </div>
      </main>
    </div>
  )
}

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M20 14.66V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2H14L20 8V14.66Z" stroke="white" strokeWidth="2"/>
    <path d="M14 2V8H20" stroke="white" strokeWidth="2"/>
  </svg>
)