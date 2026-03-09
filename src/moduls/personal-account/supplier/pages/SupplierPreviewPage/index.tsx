// src/pages/supplier/SupplierPreviewPage/index.tsx
import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import AccessDenied from './components/AccessDenied'
import PageHeader from './components/PageHeader'
import InfoBanner from './components/InfoBanner'
import ContactInfo from './components/ContactInfo'
import TechSpecs from './components/TechSpecs'
import ExtrasSection from './components/ExtrasSection'
import ClicksInfo from './components/ClicksInfo'
import RespondButton from './components/RespondButton'
import OfferButton from './components/OfferButton'
import usePreviewData from './hooks/usePreviewData'
import useFreeClicks from './hooks/useFreeClicks'
import useFavorites from './hooks/useFavorites'
import { useAuth } from '@/features/user/context/context'
import FreeClicksModal from '@/shared/components/FreeClicksModal'
import styles from "./SupplierPreviewPage.module.css"

export const SupplierPreviewPage = () => {
  const { requestId } = useParams()
  const location = useLocation()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)
  const [showFreeClicksModal, setShowFreeClicksModal] = useState(false)

  const {
    request,
    hasResponded,
    setHasResponded,
    isLoading,
    error
  } = usePreviewData({ requestId, initialState: location.state?.request })

  const {
    freeClicksLeft,
    decrementClicks,
    isClicksAvailable
  } = useFreeClicks()

  const {
    isFavorite,
    handleToggleFavorite
  } = useFavorites({ user, requestId })

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    setDarkMode(savedTheme === 'dark')
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
    document.body.classList.toggle('dark-mode', darkMode)
  }, [darkMode])

  const handleRespond = () => {
    setShowFreeClicksModal(true)
  }

  const handleConfirmFreeClick = () => {
    decrementClicks()
    setShowFreeClicksModal(false)
    setHasResponded(true)

    // Сохраняем в localStorage, что откликнулись на эту заявку
    const respondedRequests = JSON.parse(localStorage.getItem('respondedRequests') || '[]')
    respondedRequests.push(requestId)
    localStorage.setItem('respondedRequests', JSON.stringify(respondedRequests))

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleGoToBilling = () => {
    navigate('/billing', {
      state: {
        message: 'Бесплатные клики закончились. Для продолжения необходимо пополнить счет.'
      }
    })
  }

  const handleCreateOffer = () => {
    navigate(`/supplier/request/${request.id}/offer/new`, {
      state: { request, freeClicksLeft }
    })
  }

  if (!user) {
    return <AccessDenied type="session" onNavigate={navigate} />
  }

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner} />
        <p>Загрузка заявки...</p>
      </div>
    )
  }

  if (error || !request) {
    return <AccessDenied type="notFound" onNavigate={navigate} />
  }

  return (
    <>
      <div className={styles.container}>
        <PageHeader
          requestId={request.id}
          hasResponded={hasResponded}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
          onNavigate={navigate}
        />

        <InfoBanner hasResponded={hasResponded} />

        <div className={styles.requestCard}>
          <div className={styles.requestHeader}>
            <h2 className={styles.requestTitle}>{request.objectName}</h2>
            <span className={styles.requestId}>{request.id}</span>
          </div>

          {hasResponded && (
            <ContactInfo
              govCustomerName={request.govCustomerName}
              contactPerson={request.contactPerson}
              contactPhone={request.contactPhone}
              contactEmail={request.contactEmail}
            />
          )}

          <RequestMetaInfo
            configType={request.configType}
            createdAt={request.createdAt}
            region={request.region}
          />

          <TechSpecs kns={request.kns} />

          <ExtrasSection knsExtras={request.knsExtras} />

          {!hasResponded && (
            <ClicksInfo freeClicksLeft={freeClicksLeft} />
          )}

          {!hasResponded ? (
            <RespondButton
              freeClicksLeft={freeClicksLeft}
              isClicksAvailable={isClicksAvailable}
              onRespond={handleRespond}
            />
          ) : (
            <OfferButton
              onCreateOffer={handleCreateOffer}
            />
          )}
        </div>
      </div>

      {showFreeClicksModal && (
        <FreeClicksModal
          clicksLeft={freeClicksLeft}
          onConfirm={handleConfirmFreeClick}
          onClose={() => setShowFreeClicksModal(false)}
          onGoToBilling={handleGoToBilling}
        />
      )}
    </>
  )
}

// Вспомогательный компонент для мета-информации
const RequestMetaInfo = ({ configType, createdAt, region }) => (
  <div className={styles.infoGrid}>
    <InfoItem label="Тип конфигурации" value={configType || 'КНС'} />
    <InfoItem label="Дата создания" value={new Date(createdAt).toLocaleDateString('ru-RU')} />
    {region && <InfoItem label="Регион" value={region} />}
  </div>
)

const InfoItem = ({ label, value }) => (
  <div className={styles.infoItem}>
    <span className={styles.infoLabel}>{label}</span>
    <span className={styles.infoValue}>{value}</span>
  </div>
)