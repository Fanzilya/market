import { useEffect, useMemo, useState } from 'react'
import { changePasswordDemo } from '../auth/demoAuth.js'
import { getUserSettings, updateUserSettings } from '../data/settings.js'

export default function ProfileSettings({ email }) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')

  const [settings, setSettings] = useState(() => getUserSettings(email))
  const [notifSaved, setNotifSaved] = useState(false)

  useEffect(() => {
    setSettings(getUserSettings(email))
  }, [email])

  const styles = useMemo(
    () => ({
      card: {
        marginTop: 16,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.06)',
        padding: 20,
      },
      title: {
        margin: 0,
        fontSize: 18,
        fontWeight: 900,
        color: '#222',
      },
      sectionTitle: {
        margin: '14px 0 8px 0',
        fontSize: 14,
        fontWeight: 800,
        color: '#244a8f',
      },
      grid2: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12,
      },
      group: { display: 'flex', flexDirection: 'column', gap: 6 },
      label: { fontSize: 12, fontWeight: 800, color: '#555' },
      input: {
        padding: '10px 12px',
        borderRadius: 10,
        border: '1px solid #ddd',
        fontSize: 14,
        outline: 'none',
      },
      checkbox: { display: 'flex', gap: 10, alignItems: 'center' },
      btnPrimary: {
        padding: '8px 12px',
        borderRadius: 10,
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        fontWeight: 800,
        cursor: 'pointer',
        fontSize: 13,
      },
      btnSecondary: {
        padding: '8px 12px',
        borderRadius: 10,
        border: '2px solid #007bff',
        backgroundColor: 'transparent',
        color: '#007bff',
        fontWeight: 800,
        cursor: 'pointer',
        fontSize: 13,
      },
      row: { display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 8 },
      error: {
        backgroundColor: '#fee',
        border: '1px solid #fcc',
        color: '#c33',
        padding: 8,
        borderRadius: 10,
        marginTop: 8,
        fontSize: 12,
      },
      success: {
        backgroundColor: '#e9f9ec',
        border: '1px solid #c2efce',
        color: '#267a39',
        padding: 8,
        borderRadius: 10,
        marginTop: 8,
        fontSize: 12,
      },
      hint: { fontSize: 12, color: '#666' },
    }),
    [],
  )

  const submitPassword = (e) => {
    e.preventDefault()
    setPasswordError('')
    setPasswordSuccess('')

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Заполните все поля для смены пароля')
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Новый пароль и подтверждение не совпадают')
      return
    }

    const res = changePasswordDemo({
      email,
      currentPassword,
      newPassword,
    })

    if (!res.ok) {
      setPasswordError(res.message || 'Не удалось сменить пароль')
      return
    }

    setPasswordSuccess('Пароль успешно изменён (демо). Используйте новый пароль при входе.')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const toggleNotif = (field) => {
    setNotifSaved(false)
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: !prev.notifications[field],
      },
    }))
  }

  const saveNotifications = () => {
    const next = updateUserSettings(email, { notifications: settings.notifications })
    setSettings(next)
    setNotifSaved(true)
  }

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Настройки профиля</h3>

      <div style={styles.sectionTitle}>Смена пароля</div>
      <form onSubmit={submitPassword}>
        <div style={styles.grid2}>
          <div style={styles.group}>
            <div style={styles.label}>Текущий пароль</div>
            <input
              type="password"
              style={styles.input}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div style={styles.group}>
            <div style={styles.label}>Новый пароль</div>
            <input
              type="password"
              style={styles.input}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>

        <div style={{ marginTop: 10, maxWidth: 360 }}>
          <div style={styles.group}>
            <div style={styles.label}>Подтверждение нового пароля</div>
            <input
              type="password"
              style={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <div style={styles.row}>
          <button type="submit" style={styles.btnPrimary}>
            Изменить пароль
          </button>
          <button
            type="button"
            style={styles.btnSecondary}
            onClick={() => {
              setCurrentPassword('')
              setNewPassword('')
              setConfirmPassword('')
              setPasswordError('')
              setPasswordSuccess('')
            }}
          >
            Очистить
          </button>
        </div>

        {passwordError && <div style={styles.error}>{passwordError}</div>}
        {passwordSuccess && <div style={styles.success}>{passwordSuccess}</div>}
        <div style={{ ...styles.hint, marginTop: 6 }}>
          В демо‑версии пароль хранится в браузере (localStorage). Для боевой версии
          нужно будет подключить серверную авторизацию.
        </div>
      </form>

      <div style={styles.sectionTitle}>Настройки уведомлений</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, maxWidth: 420 }}>
        <label style={styles.checkbox}>
          <input
            type="checkbox"
            checked={settings.notifications.email}
            onChange={() => toggleNotif('email')}
          />
          <span>Email‑уведомления</span>
        </label>
        <label style={styles.checkbox}>
          <input
            type="checkbox"
            checked={settings.notifications.sms}
            onChange={() => toggleNotif('sms')}
          />
          <span>SMS‑уведомления</span>
        </label>
        <label style={styles.checkbox}>
          <input
            type="checkbox"
            checked={settings.notifications.inApp}
            onChange={() => toggleNotif('inApp')}
          />
          <span>Уведомления в личном кабинете</span>
        </label>
      </div>

      <div style={styles.row}>
        <button type="button" style={styles.btnPrimary} onClick={saveNotifications}>
          Сохранить уведомления
        </button>
      </div>
      {notifSaved && (
        <div style={styles.success}>Настройки уведомлений сохранены.</div>
      )}
    </div>
  )
}

