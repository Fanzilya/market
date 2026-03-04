// src/pages/OffersPage.jsx
import { useMemo, useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getSessionUser } from '../auth/demoAuth.js'
import { getRequestById } from '../data/requests.js'
import { listOffersByRequestId } from '../data/offers.js'
import Sidebar from '../components/Sidebar.jsx'
import * as XLSX from 'xlsx'
import styles from './OffersPage.module.css'

export default function OffersPage() {
  const { requestId } = useParams()
  const user = getSessionUser()
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)
  const [selectedOffer, setSelectedOffer] = useState(null)
  const [selectedOffers, setSelectedOffers] = useState([])
  const [sortBy, setSortBy] = useState('price')
  const [sortOrder, setSortOrder] = useState('asc')
  const [filterCompany, setFilterCompany] = useState('all')
  const [selectAll, setSelectAll] = useState(false)

  // Состояния для чата
  const [showChat, setShowChat] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [activeChatSupplier, setActiveChatSupplier] = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    setDarkMode(savedTheme === 'dark')

    // Загружаем сохраненные сообщения чата
    loadChatMessages()
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  // Прокрутка вниз при новых сообщениях
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chatMessages])

  const request = useMemo(() => {
    return requestId ? getRequestById(requestId) : null
  }, [requestId])

  const offers = useMemo(() => {
    if (!requestId) return []
    return listOffersByRequestId(requestId).map((offer, index) => ({
      ...offer,
      // Добавляем данные для конъюнктурного анализа
      analysisData: {
        number: index + 1,
        unit: offer.unit || 'шт',
        priceWithVAT: offer.priceWithVAT || offer.price,
        priceWithoutVAT: offer.priceWithoutVAT || Math.round(parseFloat(offer.price) / 1.2 * 100) / 100,
        documentDate: offer.documentDate || new Date().toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' }),
        supplierFullName: offer.supplierCompany || offer.supplierFullName,
        supplierShortName: offer.supplierShortName || (offer.supplierCompany || offer.supplierFullName).substring(0, 30),
        country: offer.country || 'Россия',
        kpp: offer.kpp || '770101001',
        inn: offer.inn || '7701234567',
        website: offer.website || 'www.example.com',
        location: offer.location || 'г. Москва',
        status: offer.status || '2', // 1 - Производитель, 2 - Поставщик
      }
    }))
  }, [requestId])

  // Загрузка сообщений чата из localStorage
  const loadChatMessages = () => {
    const chatKey = `chat_${requestId}`
    const saved = localStorage.getItem(chatKey)
    if (saved) {
      try {
        setChatMessages(JSON.parse(saved))
      } catch (e) {
        console.error('Ошибка загрузки сообщений чата:', e)
      }
    } else {
      // Демо-сообщения для примера
      const demoTemplate = [
        {
          id: 1,
          supplierId: 'supplier1',
          supplierName: 'ООО "СтройИнжПроект"',
          messages: [
            {
              id: 'm1',
              sender: 'supplier',
              text: 'Здравствуйте! Готов ответить на ваши вопросы по предложению.',
              timestamp: new Date(Date.now() - 86400000).toISOString(),
              read: true
            },
            {
              id: 'm2',
              sender: 'customer',
              text: 'Добрый день! Подскажите, входит ли доставка в стоимость?',
              timestamp: new Date(Date.now() - 43200000).toISOString(),
              read: true
            },
            {
              id: 'm3',
              sender: 'supplier',
              text: 'Доставка оплачивается отдельно, но можем предложить скидку при заказе от 3-х единиц.',
              timestamp: new Date(Date.now() - 21600000).toISOString(),
              read: false
            }
          ]
        },
        {
          id: 2,
          supplierId: 'supplier2',
          supplierName: 'ООО "ТехноСтрой"',
          messages: [
            {
              id: 'm4',
              sender: 'customer',
              text: 'Здравствуйте! Можете предоставить сертификаты на оборудование?',
              timestamp: new Date(Date.now() - 172800000).toISOString(),
              read: true
            },
            {
              id: 'm5',
              sender: 'supplier',
              text: 'Да, конечно. Отправил сертификаты в приложении к сообщению.',
              timestamp: new Date(Date.now() - 86400000).toISOString(),
              read: true
            }
          ]
        }
      ]
      setChatMessages(demoTemplate)
      localStorage.setItem(chatKey, JSON.stringify(demoTemplate))
    }
  }

  // Открыть чат с поставщиком
  const openChat = (supplierId, supplierName, e) => {
    e.stopPropagation()
    setActiveChatSupplier({ id: supplierId, name: supplierName })
    setShowChat(true)

    // Отмечаем сообщения как прочитанные
    const updatedMessages = chatMessages.map(chat => {
      if (chat.supplierId === supplierId) {
        return {
          ...chat,
          messages: chat.messages.map(msg => ({ ...msg, read: true }))
        }
      }
      return chat
    })
    setChatMessages(updatedMessages)
    localStorage.setItem(`chat_${requestId}`, JSON.stringify(updatedMessages))
  }

  // Отправить сообщение
  const sendMessage = () => {
    if (!newMessage.trim() || !activeChatSupplier) return

    const newMsg = {
      id: `msg_${Date.now()}`,
      sender: 'customer',
      text: newMessage,
      timestamp: new Date().toISOString(),
      read: false
    }

    const updatedMessages = chatMessages.map(chat => {
      if (chat.supplierId === activeChatSupplier.id) {
        return {
          ...chat,
          messages: [...chat.messages, newMsg]
        }
      }
      return chat
    })

    setChatMessages(updatedMessages)
    localStorage.setItem(`chat_${requestId}`, JSON.stringify(updatedMessages))
    setNewMessage('')

    // Симуляция ответа от поставщика через 3 секунды
    setTimeout(() => {
      const replyMsg = {
        id: `msg_${Date.now() + 1000}`,
        sender: 'supplier',
        text: 'Спасибо за сообщение! Я отвечу в ближайшее время.',
        timestamp: new Date().toISOString(),
        read: false
      }

      const withReply = updatedMessages.map(chat => {
        if (chat.supplierId === activeChatSupplier.id) {
          return {
            ...chat,
            messages: [...chat.messages, replyMsg]
          }
        }
        return chat
      })

      setChatMessages(withReply)
      localStorage.setItem(`chat_${requestId}`, JSON.stringify(withReply))
    }, 3000)
  }

  // Получить сообщения для активного чата
  const getActiveChatMessages = () => {
    if (!activeChatSupplier) return []
    const chat = chatMessages.find(c => c.supplierId === activeChatSupplier.id)
    return chat?.messages || []
  }

  // Форматирование времени
  const formatChatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) {
      return `${diffMins} мин назад`
    } else if (diffHours < 24) {
      return `${diffHours} ч назад`
    } else if (diffDays === 1) {
      return 'вчера'
    } else if (diffDays < 7) {
      return `${diffDays} дн назад`
    } else {
      return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
    }
  }

  const sortedOffers = useMemo(() => {
    let sorted = [...offers]

    // Сортировка
    sorted.sort((a, b) => {
      if (sortBy === 'price') {
        const priceA = parseFloat(a.price) || 0
        const priceB = parseFloat(b.price) || 0
        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA
      }
      if (sortBy === 'date') {
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
      }
      if (sortBy === 'company') {
        const nameA = (a.supplierCompany || a.supplierFullName || '').toLowerCase()
        const nameB = (b.supplierCompany || b.supplierFullName || '').toLowerCase()
        return sortOrder === 'asc'
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA)
      }
      return 0
    })

    return sorted
  }, [offers, sortBy, sortOrder])

  const companies = useMemo(() => {
    const unique = [...new Set(offers.map(o => o.supplierCompany || o.supplierFullName))]
    return ['all', ...unique]
  }, [offers])

  const filteredOffers = useMemo(() => {
    if (filterCompany === 'all') return sortedOffers
    return sortedOffers.filter(o =>
      (o.supplierCompany || o.supplierFullName) === filterCompany
    )
  }, [sortedOffers, filterCompany])

  const stats = useMemo(() => {
    const prices = offers.map(o => parseFloat(o.price) || 0).filter(p => p > 0)
    const pricesWithVAT = offers.map(o => parseFloat(o.analysisData.priceWithVAT) || 0).filter(p => p > 0)
    const pricesWithoutVAT = offers.map(o => parseFloat(o.analysisData.priceWithoutVAT) || 0).filter(p => p > 0)

    return {
      total: offers.length,
      minPrice: prices.length ? Math.min(...prices) : 0,
      maxPrice: prices.length ? Math.max(...prices) : 0,
      avgPrice: prices.length ? (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2) : 0,
      minPriceWithVAT: pricesWithVAT.length ? Math.min(...pricesWithVAT) : 0,
      maxPriceWithVAT: pricesWithVAT.length ? Math.max(...pricesWithVAT) : 0,
      avgPriceWithVAT: pricesWithVAT.length ? (pricesWithVAT.reduce((a, b) => a + b, 0) / pricesWithVAT.length).toFixed(2) : 0,
      minPriceWithoutVAT: pricesWithoutVAT.length ? Math.min(...pricesWithoutVAT) : 0,
      maxPriceWithoutVAT: pricesWithoutVAT.length ? Math.max(...pricesWithoutVAT) : 0,
      avgPriceWithoutVAT: pricesWithoutVAT.length ? (pricesWithoutVAT.reduce((a, b) => a + b, 0) / pricesWithoutVAT.length).toFixed(2) : 0,
    }
  }, [offers])

  // Функция для экспорта в Excel
  const exportToExcel = () => {
    // Определяем, какие предложения экспортировать (выбранные или все)
    const offersToExport = selectedOffers.length > 0
      ? filteredOffers.filter(o => selectedOffers.includes(o.id))
      : filteredOffers

    if (offersToExport.length === 0) {
      alert('Нет предложений для экспорта')
      return
    }

    // Создаем данные для экспорта в формате конъюнктурного анализа
    const exportData = offersToExport.map((offer, index) => ({
      'Номер по порядку': index + 1,
      'Наименование': request?.objectName || 'Насосное оборудование',
      'Единица измерения': offer.analysisData.unit,
      'Текущая отпускная цена за единицу измерения с НДС, рублей': offer.analysisData.priceWithVAT,
      'Текущая отпускная цена за единицу измерения без учета НДС, рублей': offer.analysisData.priceWithoutVAT,
      'Месяц и год составления обосновывающего документа': offer.analysisData.documentDate,
      'Полное наименование производителя (поставщика)': offer.analysisData.supplierFullName,
      'Сокращенное наименование производителя (поставщика)': offer.analysisData.supplierShortName,
      'Страна производителя': offer.analysisData.country,
      'КПП организации': offer.analysisData.kpp,
      'ИНН организации': offer.analysisData.inn,
      'Гиперссылка на веб-сайт производителя (поставщика)': offer.analysisData.website,
      'Населенный пункт расположения склада': offer.analysisData.location,
      'Статус организации': offer.analysisData.status === '1' ? 'Производитель' : 'Поставщик',
      'Контактное лицо': offer.contactPerson || '',
      'Телефон': offer.contactPhone || '',
      'Email': offer.contactEmail || '',
      'Комментарий': offer.comment || '',
    }))

    // Создаем рабочий лист
    const ws = XLSX.utils.json_to_sheet(exportData)

    // Настраиваем ширину колонок
    const colWidths = [
      { wch: 10 }, // Номер
      { wch: 40 }, // Наименование
      { wch: 15 }, // Единица измерения
      { wch: 25 }, // Цена с НДС
      { wch: 25 }, // Цена без НДС
      { wch: 25 }, // Дата документа
      { wch: 40 }, // Полное наименование
      { wch: 30 }, // Сокращенное наименование
      { wch: 20 }, // Страна
      { wch: 15 }, // КПП
      { wch: 15 }, // ИНН
      { wch: 30 }, // Сайт
      { wch: 30 }, // Населенный пункт
      { wch: 20 }, // Статус
      { wch: 25 }, // Контактное лицо
      { wch: 20 }, // Телефон
      { wch: 30 }, // Email
      { wch: 40 }, // Комментарий
    ]
    ws['!cols'] = colWidths

    // Создаем рабочую книгу
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Конъюнктурный анализ')

    // Генерируем имя файла
    const fileName = `Конъюнктурный_анализ_${request?.id || 'заявка'}_${new Date().toISOString().slice(0, 10)}.xlsx`

    // Сохраняем файл
    XLSX.writeFile(wb, fileName)
  }

  // Функция для выбора всех предложений
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOffers([])
    } else {
      setSelectedOffers(filteredOffers.map(o => o.id))
    }
    setSelectAll(!selectAll)
  }

  // Функция для выбора отдельного предложения
  const handleSelectOffer = (offerId) => {
    if (selectedOffers.includes(offerId)) {
      setSelectedOffers(selectedOffers.filter(id => id !== offerId))
      setSelectAll(false)
    } else {
      setSelectedOffers([...selectedOffers, offerId])
      if (selectedOffers.length + 1 === filteredOffers.length) {
        setSelectAll(true)
      }
    }
  }

  if (!user) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <div className={styles.errorIcon}>⚠️</div>
          <h2>Сессия не найдена</h2>
          <p>Пожалуйста, войдите в систему для продолжения.</p>
          <button onClick={() => navigate('/login')} className={styles.primaryButton}>
            Перейти к входу
          </button>
        </div>
      </div>
    )
  }

  if (!request) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <div className={styles.errorIcon}>🔍</div>
          <h2>Заявка не найдена</h2>
          <p>Запрошенная заявка не существует или была удалена</p>
          <button onClick={() => navigate('/customer')} className={styles.primaryButton}>
            Вернуться к заявкам
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.page} ${darkMode ? styles.dark : ''} ${showChat ? styles.withChat : ''}`}>
      <Sidebar
        user={user}
        onLogout={() => navigate('/login')}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <main className={styles.main}>
        {/* Шапка страницы */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Коммерческие предложения</h1>
            <div className={styles.breadcrumbs}>
              <span className={styles.breadcrumb} onClick={() => navigate('/dashboard')}>Главная</span>
              <span className={styles.separator}>/</span>
              <span className={styles.breadcrumb} onClick={() => navigate('/customer')}>Заявки</span>
              <span className={styles.separator}>/</span>
              <span className={styles.current}>{request.id}</span>
            </div>
          </div>

          <div className={styles.headerActions}>
            <button
              className={styles.backButton}
              onClick={() => navigate(`/customer/request/${requestId}`)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5" stroke="currentColor" strokeWidth="2" />
                <path d="M12 5L5 12L12 19" stroke="currentColor" strokeWidth="2" />
              </svg>
              Вернуться к заявке
            </button>

            {selectedOffers.length > 0 && (
              <button
                className={styles.exportButton}
                onClick={exportToExcel}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" />
                  <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 15V3" stroke="currentColor" strokeWidth="2" />
                </svg>
                Экспорт выбранных ({selectedOffers.length})
              </button>
            )}
          </div>
        </div>

        {/* Информация о заявке */}
        <div className={styles.requestInfoCard}>
          <div className={styles.requestHeader}>
            <h2 className={styles.requestTitle}>{request.objectName}</h2>
            <span className={styles.requestId}>{request.id}</span>
          </div>
          <div className={styles.requestDetails}>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Заказчик:</span>
              <span className={styles.detailValue}>{request.govCustomerName}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Тип:</span>
              <span className={styles.detailValue}>{request.configType}</span>
            </div>
            <div className={styles.detailItem}>
              <span className={styles.detailLabel}>Дата:</span>
              <span className={styles.detailValue}>
                {new Date(request.createdAt).toLocaleDateString('ru-RU')}
              </span>
            </div>
          </div>
        </div>

        {/* Статистика по КП */}
        {offers.length > 0 && (
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{stats.total}</span>
              <span className={styles.statLabel}>Всего КП</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{stats.minPriceWithVAT.toLocaleString()} ₽</span>
              <span className={styles.statLabel}>Мин. цена (с НДС)</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{stats.maxPriceWithVAT.toLocaleString()} ₽</span>
              <span className={styles.statLabel}>Макс. цена (с НДС)</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{stats.avgPriceWithVAT.toLocaleString()} ₽</span>
              <span className={styles.statLabel}>Ср. цена (с НДС)</span>
            </div>
          </div>
        )}

        {/* Фильтры и сортировка */}
        <div className={styles.filtersBar}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Сортировать по:</label>
            <select
              className={styles.filterSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="price">Цене</option>
              <option value="date">Дате</option>
              <option value="company">Компании</option>
            </select>
            <button
              className={styles.sortOrderButton}
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>

          {companies.length > 1 && (
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Компания:</label>
              <select
                className={styles.filterSelect}
                value={filterCompany}
                onChange={(e) => setFilterCompany(e.target.value)}
              >
                {companies.map(company => (
                  <option key={company} value={company}>
                    {company === 'all' ? 'Все компании' : company}
                  </option>
                ))}
              </select>
            </div>
          )}

          {filteredOffers.length > 0 && (
            <div className={styles.filterGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className={styles.checkbox}
                />
                Выбрать все
              </label>
            </div>
          )}
        </div>

        {/* Список КП */}
        <div className={styles.offersContainer}>
          {filteredOffers.length === 0 ? (
            <div className={styles.emptyState}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#CBD5E1" strokeWidth="2" />
                <path d="M12 8V12M12 16H12.01" stroke="#CBD5E1" strokeWidth="2" />
              </svg>
              <h3>Коммерческие предложения отсутствуют</h3>
              <p>На данную заявку пока нет предложений от поставщиков</p>
            </div>
          ) : (
            <div className={styles.offersGrid}>
              {filteredOffers.map((offer) => (
                <div
                  key={offer.id}
                  className={`${styles.offerCard} ${selectedOffer === offer.id ? styles.offerCardSelected : ''} ${selectedOffers.includes(offer.id) ? styles.offerCardChecked : ''}`}
                  onClick={() => setSelectedOffer(offer.id)}
                >
                  <div className={styles.offerHeader}>
                    <div className={styles.offerCompany}>
                      <button
                        className={`${styles.checkboxButton} ${selectedOffers.includes(offer.id) ? styles.checkboxButtonChecked : ''}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSelectOffer(offer.id)
                        }}
                      >
                        {selectedOffers.includes(offer.id) ? '✓' : ''}
                      </button>

                      <div className={styles.companyIcon}>
                        {offer.supplierCompany?.charAt(0) || offer.supplierFullName?.charAt(0)}
                      </div>
                      <div>
                        <h3 className={styles.companyName}>
                          {offer.supplierCompany || offer.supplierFullName}
                        </h3>
                        <span className={styles.offerDate}>
                          {new Date(offer.createdAt).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                    </div>
                    <div className={styles.offerPrice}>
                      {offer.price} ₽
                    </div>
                  </div>

                  {/* Данные для конъюнктурного анализа */}
                  <div className={styles.analysisData}>
                    <div className={styles.analysisRow}>
                      <span className={styles.analysisLabel}>ИНН:</span>
                      <span className={styles.analysisValue}>{offer.analysisData.inn}</span>
                    </div>
                    <div className={styles.analysisRow}>
                      <span className={styles.analysisLabel}>КПП:</span>
                      <span className={styles.analysisValue}>{offer.analysisData.kpp}</span>
                    </div>
                    <div className={styles.analysisRow}>
                      <span className={styles.analysisLabel}>Страна:</span>
                      <span className={styles.analysisValue}>{offer.analysisData.country}</span>
                    </div>
                    <div className={styles.analysisRow}>
                      <span className={styles.analysisLabel}>Статус:</span>
                      <span className={styles.analysisValue}>
                        {offer.analysisData.status === '1' ? 'Производитель' : 'Поставщик'}
                      </span>
                    </div>
                    <div className={styles.analysisRow}>
                      <span className={styles.analysisLabel}>Цена с НДС:</span>
                      <span className={styles.analysisValue}>{offer.analysisData.priceWithVAT} ₽</span>
                    </div>
                    <div className={styles.analysisRow}>
                      <span className={styles.analysisLabel}>Цена без НДС:</span>
                      <span className={styles.analysisValue}>{offer.analysisData.priceWithoutVAT} ₽</span>
                    </div>
                  </div>

                  {offer.comment && (
                    <div className={styles.offerComment}>
                      <p>{offer.comment}</p>
                    </div>
                  )}

                  {/* Кнопка чата */}
                  <div className={styles.offerFooter}>
                    <button
                      className={styles.chatButton}
                      onClick={(e) => openChat(offer.supplierId || `supplier_${offer.id}`, offer.supplierCompany || offer.supplierFullName, e)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Чат с поставщиком
                    </button>
                  </div>

                  {offer.attachments && offer.attachments.length > 0 && (
                    <div className={styles.attachments}>
                      <span className={styles.attachmentsLabel}>Файлы:</span>
                      {offer.attachments.map((file, i) => (
                        <span key={i} className={styles.attachment}>{file}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Кнопка экспорта (дублирующая внизу) */}
        {selectedOffers.length > 0 && (
          <div className={styles.bottomExport}>
            <button
              className={styles.exportButtonLarge}
              onClick={exportToExcel}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" />
                <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 15V3" stroke="currentColor" strokeWidth="2" />
              </svg>
              Экспортировать в Excel ({selectedOffers.length} предложений)
            </button>
          </div>
        )}
      </main>

      {/* Боковая панель чата */}
      {showChat && activeChatSupplier && (
        <div className={styles.chatSidebar}>
          <div className={styles.chatHeader}>
            <div className={styles.chatHeaderInfo}>
              <h3 className={styles.chatTitle}>Чат с поставщиком</h3>
              <span className={styles.chatSupplierName}>{activeChatSupplier.name}</span>
            </div>
            <button
              className={styles.chatCloseButton}
              onClick={() => setShowChat(false)}
            >
              ✕
            </button>
          </div>

          <div className={styles.chatMessages}>
            {getActiveChatMessages().map((msg) => (
              <div
                key={msg.id}
                className={`${styles.chatMessage} ${msg.sender === 'customer' ? styles.customerMessage : styles.supplierMessage}`}
              >
                <div className={styles.messageContent}>
                  <p>{msg.text}</p>
                  <span className={styles.messageTime}>
                    {formatChatTime(msg.timestamp)}
                    {msg.sender === 'supplier' && !msg.read && (
                      <span className={styles.messageUnread}>•</span>
                    )}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.chatInput}>
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Напишите сообщение..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage()
                }
              }}
            />
            <button
              className={styles.sendButton}
              onClick={sendMessage}
              disabled={!newMessage.trim()}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}