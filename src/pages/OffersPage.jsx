// src/pages/OffersPage.jsx
import { useMemo, useState, useEffect } from 'react'
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
  const [selectedOffers, setSelectedOffers] = useState([])
  const [sortBy, setSortBy] = useState('price')
  const [sortOrder, setSortOrder] = useState('asc')
  const [filterCompany, setFilterCompany] = useState('all')
  const [selectAll, setSelectAll] = useState(false)
  const [viewMode, setViewMode] = useState('table') // 'table' или 'cards'

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    setDarkMode(savedTheme === 'dark')
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  const request = useMemo(() => {
    return requestId ? getRequestById(requestId) : null
  }, [requestId])

  const offers = useMemo(() => {
    if (!requestId) return []
    return listOffersByRequestId(requestId).map((offer, index) => ({
      ...offer,
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
        status: offer.status || '2',
      }
    }))
  }, [requestId])

  const sortedOffers = useMemo(() => {
    let sorted = [...offers]
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
    return {
      total: offers.length,
      minPrice: prices.length ? Math.min(...prices) : 0,
      maxPrice: prices.length ? Math.max(...prices) : 0,
      avgPrice: prices.length ? (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2) : 0,
    }
  }, [offers])

  const exportToExcel = async () => {
    const offersToExport = selectedOffers.length > 0
      ? filteredOffers.filter(o => selectedOffers.includes(o.id))
      : filteredOffers

    if (offersToExport.length === 0) {
      alert('Нет предложений для экспорта')
      return
    }

    try {
      // Загружаем шаблон
      const templateUrl = '/export_template.xlsx' // или '/export_template.xlsx'
      const response = await fetch(templateUrl)
      const templateData = await response.arrayBuffer()

      // Читаем шаблон
      const wb = XLSX.read(templateData, { type: 'array' })
      const ws = wb.Sheets['Лист1'] // или нужный лист

      // Находим строку, с которой начинаются данные
      // Например, данные начинаются с 16 строки (после всех заголовков)
      XLSX.utils.sheet_add_aoa(ws, [[` ${request?.objectName || ''}`]], { origin: 'A3' })
      const startRow = 12

      // Вставляем данные
      offersToExport.forEach((offer, index) => {
        const rowNum = startRow + index
        const priceWithVAT = parseFloat(offer.price) || 0



        // Заполняем ячейки
        XLSX.utils.sheet_add_aoa(ws, [[
          index + 1, // №
          '', // Код
          request?.objectName || '', // Наименование из заявки
          offer.supplierCompany || offer.supplierFullName || '', // Из КП
          offer.unit || 'шт', // Ед. изм. заявка
          offer.unit || 'шт', // Ед. изм. КП
          priceWithVAT, // Цена с НДС
          priceWithVAT / 1.2, // Цена без НДС
          new Date(offer.createdAt).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' }), // Дата
          '', // Индекс
          1, // Коэффициент
          priceWithVAT / 1.2, // Текущая цена
          '', '', '', '', '', '', '', '', // Затраты (пусто)
          offer.supplierCompany || offer.supplierFullName || '', // Поставщик
          offer.analysisData?.country || 'Россия', // Страна
          offer.analysisData?.kpp || '', // КПП
          offer.analysisData?.inn || '', // ИНН
          offer.analysisData?.website || '', // Сайт
          offer.analysisData?.location || '', // Населенный пункт
          offer.analysisData?.status || '2' // Статус
        ]], { origin: `A${rowNum}` })
      })

      // Сохраняем файл
      const fileName = `Конъюктурный анализ _${request?.id || 'заявка'}_${new Date().toISOString().slice(0, 10)}.xlsx`
      XLSX.writeFile(wb, fileName)

    } catch (error) {
      console.error('Ошибка при загрузке шаблона:', error)
      alert('Не удалось загрузить шаблон')
    }
  }

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOffers([])
    } else {
      setSelectedOffers(filteredOffers.map(o => o.id))
    }
    setSelectAll(!selectAll)
  }

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

  // Функция для перехода на детали предложения
  const handleViewOffer = (offerId) => {
    navigate(`/customer/offer/${offerId}`)
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
    <div className={`${styles.page} ${darkMode ? styles.dark : ''}`}>
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
              <span className={styles.separator}>›</span>
              <span className={styles.breadcrumb} onClick={() => navigate('/customer')}>Заявки</span>
              <span className={styles.separator}>›</span>
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
              Назад
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
                Экспорт ({selectedOffers.length})
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

        {/* Статистика */}
        {offers.length > 0 && (
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{stats.total}</span>
              <span className={styles.statLabel}>Всего КП</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{stats.minPrice.toLocaleString()} ₽</span>
              <span className={styles.statLabel}>Мин. цена</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{stats.maxPrice.toLocaleString()} ₽</span>
              <span className={styles.statLabel}>Макс. цена</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statValue}>{stats.avgPrice.toLocaleString()} ₽</span>
              <span className={styles.statLabel}>Ср. цена</span>
            </div>
          </div>
        )}

        {/* Фильтры */}
        <div className={styles.filtersBar}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Сортировать:</label>
            <select
              className={styles.filterSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="price">По цене</option>
              <option value="date">По дате</option>
              <option value="company">По компании</option>
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
              <div className={styles.viewToggle}>
                <button
                  className={`${styles.viewToggleButton} ${viewMode === 'table' ? styles.active : ''}`}
                  onClick={() => setViewMode('table')}
                  title="Таблица"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M3 9H21" stroke="currentColor" strokeWidth="2" />
                    <path d="M3 15H21" stroke="currentColor" strokeWidth="2" />
                    <path d="M9 3V21" stroke="currentColor" strokeWidth="2" />
                    <path d="M15 3V21" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>
                <button
                  className={`${styles.viewToggleButton} ${viewMode === 'cards' ? styles.active : ''}`}
                  onClick={() => setViewMode('cards')}
                  title="Карточки"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
                    <rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
                    <rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
                    <rect x="13" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Таблица или карточки */}
        {filteredOffers.length === 0 ? (
          <div className={styles.emptyState}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#CBD5E1" strokeWidth="2" />
              <path d="M12 8V12M12 16H12.01" stroke="#CBD5E1" strokeWidth="2" />
            </svg>
            <h3>Коммерческие предложения отсутствуют</h3>
            <p>На данную заявку пока нет предложений от поставщиков</p>
          </div>
        ) : viewMode === 'table' ? (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th} style={{ width: '40px' }}>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                      className={styles.checkbox}
                    />
                  </th>
                  <th className={styles.th}>Компания</th>
                  <th className={styles.th}>Цена</th>
                  <th className={styles.th}>Дата</th>
                  <th className={styles.th}>ИНН</th>
                  <th className={styles.th}>КПП</th>
                  <th className={styles.th}>Статус</th>
                  <th className={styles.th}>Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredOffers.map((offer) => (
                  <tr
                    key={offer.id}
                    className={styles.tr}
                    onClick={() => handleViewOffer(offer.id)} // ← переход по клику на строку
                  >
                    <td className={styles.td} onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedOffers.includes(offer.id)}
                        onChange={() => handleSelectOffer(offer.id)}
                        className={styles.checkbox}
                      />
                    </td>
                    <td className={styles.td}>
                      <div className={styles.companyCell}>
                        <div className={styles.companyAvatar}>
                          {offer.supplierCompany?.charAt(0) || offer.supplierFullName?.charAt(0)}
                        </div>
                        <div>
                          <div className={styles.companyName}>{offer.supplierCompany || offer.supplierFullName}</div>
                          <div className={styles.companyContact}>{offer.contactEmail || '—'}</div>
                        </div>
                      </div>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.priceCell}>{offer.price} ₽</span>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.dateCell}>
                        {new Date(offer.createdAt).toLocaleDateString('ru-RU')}
                      </span>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.innCell}>{offer.analysisData.inn}</span>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.kppCell}>{offer.analysisData.kpp}</span>
                    </td>
                    <td className={styles.td}>
                      <span className={`${styles.statusCell} ${offer.analysisData.status === '1' ? styles.manufacturer : styles.supplier}`}>
                        {offer.analysisData.status === '1' ? 'Производитель' : 'Поставщик'}
                      </span>
                    </td>
                    <td className={styles.td} onClick={(e) => e.stopPropagation()}>
                      <button
                        className={styles.viewOfferButton}
                        onClick={() => handleViewOffer(offer.id)} // ← переход по кнопке
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" />
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.cardsGrid}>
            {filteredOffers.map((offer) => (
              <div
                key={offer.id}
                className={`${styles.offerCard} ${selectedOffers.includes(offer.id) ? styles.offerCardSelected : ''}`}
                onClick={() => handleViewOffer(offer.id)} // ← переход по клику на карточку
              >
                <div className={styles.cardHeader}>
                  <div className={styles.cardHeaderLeft}>
                    <input
                      type="checkbox"
                      checked={selectedOffers.includes(offer.id)}
                      onChange={(e) => {
                        e.stopPropagation()
                        handleSelectOffer(offer.id)
                      }}
                      className={styles.cardCheckbox}
                    />
                    <div className={styles.cardAvatar}>
                      {offer.supplierCompany?.charAt(0) || offer.supplierFullName?.charAt(0)}
                    </div>
                    <div>
                      <h3 className={styles.cardCompany}>{offer.supplierCompany || offer.supplierFullName}</h3>
                      <span className={styles.cardDate}>
                        {new Date(offer.createdAt).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  </div>
                  <div className={styles.cardPrice}>
                    {offer.price} ₽
                  </div>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardRow}>
                    <span className={styles.cardLabel}>ИНН:</span>
                    <span className={styles.cardValue}>{offer.analysisData.inn}</span>
                  </div>
                  <div className={styles.cardRow}>
                    <span className={styles.cardLabel}>КПП:</span>
                    <span className={styles.cardValue}>{offer.analysisData.kpp}</span>
                  </div>
                  <div className={styles.cardRow}>
                    <span className={styles.cardLabel}>Страна:</span>
                    <span className={styles.cardValue}>{offer.analysisData.country}</span>
                  </div>
                  <div className={styles.cardRow}>
                    <span className={styles.cardLabel}>Статус:</span>
                    <span className={`${styles.cardStatus} ${offer.analysisData.status === '1' ? styles.cardManufacturer : styles.cardSupplier}`}>
                      {offer.analysisData.status === '1' ? 'Производитель' : 'Поставщик'}
                    </span>
                  </div>
                </div>

                {offer.comment && (
                  <div className={styles.cardComment}>
                    <p>{offer.comment}</p>
                  </div>
                )}

                <div className={styles.cardFooter}>
                  <button
                    className={styles.cardButton}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleViewOffer(offer.id) // ← переход по кнопке "Подробнее"
                    }}
                  >
                    Подробнее
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" />
                      <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}