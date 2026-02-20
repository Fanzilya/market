import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getSessionUser, signOut } from '../auth/demoAuth.js'
import Modal from '../components/Modal.jsx'
import { listAllRequests } from '../data/requests.js'
import { createOffer, listOffersByRequestId } from '../data/offers.js'
import ProfileSettings from '../components/ProfileSettings.jsx'

export default function SupplierPage() {
  const user = getSessionUser()
  const navigate = useNavigate()
  const [selectedRequestId, setSelectedRequestId] = useState(null)
  const [isOfferOpen, setIsOfferOpen] = useState(false)
  const [offerPrice, setOfferPrice] = useState('')
  const [offerComment, setOfferComment] = useState('')
  const [error, setError] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  const requests = useMemo(() => {
    // refreshKey используется только чтобы форсировать пересчёт
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const _ = refreshKey
    return listAllRequests()
  }, [])
  const selectedRequest = useMemo(
    () => requests.find((r) => r.id === selectedRequestId) ?? null,
    [requests, selectedRequestId],
  )
  const myOffersForSelected = useMemo(() => {
    if (!selectedRequestId || !user?.email) return []
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const _ = refreshKey
    return listOffersByRequestId(selectedRequestId).filter(
      (o) => String(o.supplierEmail || '').toLowerCase() === user.email.toLowerCase(),
    )
  }, [selectedRequestId, user?.email])

  const styles = useMemo(
    () => ({
      container: {
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: 20,
      },
      card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: 24,
        width: '100%',
        maxWidth: 920,
        margin: '0 auto',
      },
      titleRow: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 12,
        flexWrap: 'wrap',
        marginBottom: 16,
      },
      title: {
        margin: 0,
        fontSize: 22,
        color: '#222',
      },
      subtitle: {
        margin: '6px 0 0 0',
        color: '#666',
        fontSize: 14,
      },
      actions: {
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        flexWrap: 'wrap',
      },
      button: {
        padding: '10px 12px',
        fontSize: 14,
        fontWeight: 600,
        color: '#fff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: 10,
        cursor: 'pointer',
      },
      linkButton: {
        padding: '10px 12px',
        fontSize: 14,
        fontWeight: 600,
        color: '#007bff',
        backgroundColor: 'transparent',
        border: '2px solid #007bff',
        borderRadius: 10,
        cursor: 'pointer',
        textDecoration: 'none',
      },
      grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 14,
      },
      tile: {
        border: '1px solid #eee',
        borderRadius: 12,
        padding: 16,
      },
      tileTitle: {
        margin: 0,
        fontSize: 14,
        color: '#444',
        fontWeight: 700,
      },
      tileValue: {
        margin: '8px 0 0 0',
        fontSize: 16,
        color: '#222',
        whiteSpace: 'pre-wrap',
      },
      warn: {
        marginTop: 16,
        color: '#666',
        fontSize: 13,
      },
      tableWrap: {
        border: '1px solid #e9e9e9',
        borderRadius: 12,
        overflow: 'hidden',
        marginTop: 16,
      },
      tableHeader: {
        backgroundColor: '#2f66c5',
        color: '#fff',
        padding: '12px 14px',
        fontWeight: 900,
      },
      table: {
        width: '100%',
        borderCollapse: 'collapse',
      },
      th: {
        textAlign: 'left',
        fontSize: 12,
        color: '#4a4a4a',
        padding: '10px 12px',
        backgroundColor: '#f7f7f7',
        borderBottom: '1px solid #eee',
      },
      td: {
        padding: '12px 12px',
        borderBottom: '1px solid #f0f0f0',
        fontSize: 14,
        color: '#222',
        verticalAlign: 'top',
      },
      trClickable: { cursor: 'pointer' },
      pill: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '4px 10px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 800,
        backgroundColor: '#eef5ff',
        color: '#1f5bb8',
        border: '1px solid #d7e8ff',
      },
      empty: { padding: 14, color: '#666', fontSize: 14 },
    }),
    [],
  )

  const onLogout = () => {
    signOut()
    navigate('/', { replace: true })
  }

  if (!user) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Сессия не найдена</h2>
          <p style={styles.subtitle}>Пожалуйста, войдите в систему.</p>
          <Link to="/" style={styles.linkButton}>
            Перейти к входу
          </Link>
        </div>
      </div>
    )
  }

  const openOffer = (requestId) => {
    setSelectedRequestId(requestId)
    setOfferPrice('')
    setOfferComment('')
    setError('')
    setIsOfferOpen(true)
  }

  const submitOffer = (e) => {
    e.preventDefault()
    setError('')
    if (!selectedRequest) {
      setError('Заявка не найдена')
      return
    }
    if (!offerPrice.trim()) {
      setError('Введите цену (можно с валютой/единицами)')
      return
    }

    createOffer({
      id: `OFFER-${Date.now().toString(36).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      requestId: selectedRequest.id,
      supplierEmail: user.email,
      supplierFullName: user.fullName,
      supplierCompany: user.company?.name ?? '',
      price: offerPrice.trim(),
      comment: offerComment.trim(),
    })

    setIsOfferOpen(false)
    setRefreshKey((x) => x + 1)
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.titleRow}>
          <div>
            <h2 style={styles.title}>Кабинет Исполнителя</h2>
            <p style={styles.subtitle}>
              {user.roleLabel} · {user.fullName} · {user.email}
            </p>
          </div>
          <div style={styles.actions}>
            <button
              type="button"
              onClick={() => navigate('/profile')}
              style={styles.linkButton}
            >
              Профиль
            </button>
            <button type="button" onClick={onLogout} style={styles.button}>
              Выйти
            </button>
          </div>
        </div>

        <div style={styles.grid}>
          <div style={styles.tile}>
            <p style={styles.tileTitle}>ФИО</p>
            <p style={styles.tileValue}>{user.fullName}</p>
          </div>
          <div style={styles.tile}>
            <p style={styles.tileTitle}>Email</p>
            <p style={styles.tileValue}>{user.email}</p>
          </div>
          <div style={styles.tile}>
            <p style={styles.tileTitle}>Компания</p>
            <p style={styles.tileValue}>{user.company?.name ?? '—'}</p>
          </div>
          <div style={styles.tile}>
            <p style={styles.tileTitle}>ИНН</p>
            <p style={styles.tileValue}>{user.company?.inn ?? '—'}</p>
          </div>
          <div style={styles.tile}>
            <p style={styles.tileTitle}>Краткое наименование</p>
            <p style={styles.tileValue}>{user.company?.shortName ?? '—'}</p>
          </div>
          <div style={styles.tile}>
            <p style={styles.tileTitle}>Тип компании</p>
            <p style={styles.tileValue}>{user.company?.typeName ?? '—'}</p>
          </div>
          <div style={styles.tile}>
            <p style={styles.tileTitle}>КПП</p>
            <p style={styles.tileValue}>{user.company?.kpp ?? '—'}</p>
          </div>
          <div style={styles.tile}>
            <p style={styles.tileTitle}>ОГРН</p>
            <p style={styles.tileValue}>{user.company?.ogrn ?? '—'}</p>
          </div>
          <div style={styles.tile}>
            <p style={styles.tileTitle}>Юр. адрес</p>
            <p style={styles.tileValue}>{user.company?.legalAddress ?? '—'}</p>
          </div>
          <div style={styles.tile}>
            <p style={styles.tileTitle}>Телефон пользователя</p>
            <p style={styles.tileValue}>{user.phone || '—'}</p>
          </div>
          <div style={styles.tile}>
            <p style={styles.tileTitle}>Роль</p>
            <p style={styles.tileValue}>{user.roleLabel}</p>
          </div>
        </div>

        <p style={styles.warn}>
          Ниже — список заявок заказчиков. Вы можете сформировать коммерческое
          предложение по любой заявке.
        </p>

        <div style={styles.tableWrap}>
          <div style={styles.tableHeader}>Заявки (для КП)</div>
          {requests.length === 0 ? (
            <div style={styles.empty}>
              Пока нет заявок. Зайдите под заказчиком и создайте заявку.
            </div>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Объект</th>
                  <th style={styles.th}>Гос. заказчик</th>
                  <th style={styles.th}>Тип</th>
                  <th style={styles.th}>Контакт</th>
                  <th style={styles.th}>Действие</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr key={r.id} style={styles.trClickable}>
                    <td style={styles.td}>
                      <span style={styles.pill}>{r.id}</span>
                    </td>
                    <td style={styles.td}>{r.objectName}</td>
                    <td style={styles.td}>{r.govCustomerName}</td>
                    <td style={styles.td}>{r.configType}</td>
                    <td style={styles.td}>
                      {r.contactPerson}
                      <br />
                      <span style={{ color: '#666', fontSize: 12 }}>
                        {r.contactPhone} · {r.contactEmail}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <button
                        type="button"
                        style={styles.button}
                        onClick={() => openOffer(r.id)}
                      >
                        Сделать КП
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <ProfileSettings email={user.email} />

      <Modal
        isOpen={isOfferOpen}
        title={selectedRequest ? `Коммерческое предложение для ${selectedRequest.id}` : 'Коммерческое предложение'}
        onClose={() => setIsOfferOpen(false)}
        width={760}
      >
        {selectedRequest && (
          <div style={{ marginBottom: 12, color: '#444', fontSize: 13 }}>
            <b>Объект:</b> {selectedRequest.objectName}
            <br />
            <b>Тип:</b> {selectedRequest.configType}
          </div>
        )}

        {error && (
          <div
            style={{
              backgroundColor: '#fee',
              border: '1px solid #fcc',
              color: '#c33',
              padding: 10,
              borderRadius: 10,
              marginBottom: 12,
              fontSize: 13,
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={submitOffer}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 12, fontWeight: 900, color: '#244a8f' }}>
                Цена
              </div>
              <input
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                placeholder="Например: 1 250 000 ₽"
                style={{
                  padding: '10px 12px',
                  borderRadius: 10,
                  border: '1px solid #ddd',
                  fontSize: 14,
                  outline: 'none',
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 12, fontWeight: 900, color: '#244a8f' }}>
                Ваши КП по этой заявке
              </div>
              <div style={{ color: '#666', fontSize: 13 }}>
                {myOffersForSelected.length === 0
                  ? 'Пока нет'
                  : `Отправлено: ${myOffersForSelected.length}`}
              </div>
            </div>
          </div>

          <div style={{ height: 12 }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 12, fontWeight: 900, color: '#244a8f' }}>
              Комментарий / условия
            </div>
            <textarea
              value={offerComment}
              onChange={(e) => setOfferComment(e.target.value)}
              placeholder="Сроки, условия, состав поставки и т.д."
              style={{
                padding: '10px 12px',
                borderRadius: 10,
                border: '1px solid #ddd',
                fontSize: 14,
                outline: 'none',
                minHeight: 110,
                resize: 'vertical',
              }}
            />
          </div>

          <div style={{ height: 16 }} />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button type="submit" style={styles.button}>
              Отправить КП
            </button>
            <button
              type="button"
              onClick={() => setIsOfferOpen(false)}
              style={styles.linkButton}
            >
              Отмена
            </button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

