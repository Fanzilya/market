import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSessionUser } from '../auth/demoAuth.js'
import ProfileSettings from '../components/ProfileSettings.jsx'

export default function ProfilePage() {
  const user = getSessionUser()
  const navigate = useNavigate()

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
        maxWidth: 960,
        margin: '0 auto',
      },
      titleRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 12,
        flexWrap: 'wrap',
        marginBottom: 16,
      },
      title: { margin: 0, fontSize: 24, fontWeight: 900, color: '#222' },
      subtitle: { margin: '6px 0 0', fontSize: 14, color: '#666' },
      actions: { display: 'flex', gap: 10, flexWrap: 'wrap' },
      button: {
        padding: '10px 12px',
        borderRadius: 10,
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        fontWeight: 800,
        cursor: 'pointer',
        fontSize: 14,
      },
      linkButton: {
        padding: '10px 12px',
        borderRadius: 10,
        border: '2px solid #007bff',
        backgroundColor: 'transparent',
        color: '#007bff',
        fontWeight: 800,
        cursor: 'pointer',
        fontSize: 14,
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
        fontSize: 13,
        fontWeight: 800,
        color: '#444',
      },
      tileValue: {
        margin: '6px 0 0',
        fontSize: 14,
        color: '#222',
        whiteSpace: 'pre-wrap',
      },
      sectionTitle: {
        margin: '18px 0 8px 0',
        fontSize: 16,
        fontWeight: 900,
        color: '#222',
      },
    }),
    [],
  )

  if (!user) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Сессия не найдена</h2>
          <p style={styles.subtitle}>Пожалуйста, войдите в систему.</p>
          <button
            type="button"
            onClick={() => navigate('/')}
            style={styles.button}
          >
            Перейти к входу
          </button>
        </div>
      </div>
    )
  }

  const isSupplier = user.role === 'supplier'

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.titleRow}>
          <div>
            <h1 style={styles.title}>Профиль</h1>
            <p style={styles.subtitle}>
              {user.roleLabel} · {user.fullName} · {user.email}
              {user.phone ? ` · ${user.phone}` : ''}
            </p>
          </div>
          <div style={styles.actions}>
            <button
              type="button"
              style={styles.linkButton}
              onClick={() =>
                navigate(isSupplier ? '/supplier' : '/customer', {
                  replace: false,
                })
              }
            >
              В кабинет
            </button>
          </div>
        </div>

        <div style={styles.sectionTitle}>Данные пользователя</div>
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
            <p style={styles.tileTitle}>Телефон</p>
            <p style={styles.tileValue}>{user.phone || '—'}</p>
          </div>
          <div style={styles.tile}>
            <p style={styles.tileTitle}>Роль</p>
            <p style={styles.tileValue}>{user.roleLabel}</p>
          </div>
        </div>

        {isSupplier && user.company && (
          <>
            <div style={styles.sectionTitle}>Компания</div>
            <div style={styles.grid}>
              <div style={styles.tile}>
                <p style={styles.tileTitle}>Наименование компании</p>
                <p style={styles.tileValue}>{user.company.name}</p>
              </div>
              <div style={styles.tile}>
                <p style={styles.tileTitle}>Краткое наименование</p>
                <p style={styles.tileValue}>{user.company.shortName || '—'}</p>
              </div>
              <div style={styles.tile}>
                <p style={styles.tileTitle}>Тип компании</p>
                <p style={styles.tileValue}>{user.company.typeName || '—'}</p>
              </div>
              <div style={styles.tile}>
                <p style={styles.tileTitle}>ИНН</p>
                <p style={styles.tileValue}>{user.company.inn || '—'}</p>
              </div>
              <div style={styles.tile}>
                <p style={styles.tileTitle}>КПП</p>
                <p style={styles.tileValue}>{user.company.kpp || '—'}</p>
              </div>
              <div style={styles.tile}>
                <p style={styles.tileTitle}>ОГРН</p>
                <p style={styles.tileValue}>{user.company.ogrn || '—'}</p>
              </div>
              <div style={styles.tile}>
                <p style={styles.tileTitle}>Юр. адрес</p>
                <p style={styles.tileValue}>{user.company.legalAddress || '—'}</p>
              </div>
              <div style={styles.tile}>
                <p style={styles.tileTitle}>О компании</p>
                <p style={styles.tileValue}>{user.company.about || '—'}</p>
              </div>
            </div>
          </>
        )}
      </div>

      <ProfileSettings email={user.email} />
    </div>
  )
}

