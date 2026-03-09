import { useEffect, useMemo, useState } from 'react'
import { changePasswordDemo } from '../../auth/demoAuth.ts'
import { getUserSettings, updateUserSettings } from '../data/settings.ts'

export default function ProfileSettings({ email }) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [focusedInput, setFocusedInput] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [settings, setSettings] = useState(() => getUserSettings(email))
  const [notifSaved, setNotifSaved] = useState(false)
  const [isSavingNotif, setIsSavingNotif] = useState(false)

  useEffect(() => {
    setSettings(getUserSettings(email))
  }, [email])

  const PRIMARY = '#4A85F6'
  const PRIMARY_DARK = '#3A6BC9'
  const PRIMARY_BG = '#4A85F610'
  const PRIMARY_BORDER = '#4A85F633'

  const styles = useMemo(
    () => ({
      card: {
        marginTop: 24,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        boxShadow: `0 10px 40px ${PRIMARY}15`,
        padding: '28px',
        border: `1px solid ${PRIMARY_BORDER}`,
      },
      header: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 24,
        paddingBottom: 16,
        borderBottom: `1px solid ${PRIMARY_BORDER}`,
      },
      headerIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
      },
      title: {
        margin: 0,
        fontSize: 20,
        fontWeight: 700,
        color: '#1e293b',
        letterSpacing: '-0.3px',
      },
      section: {
        marginBottom: 28,
      },
      sectionHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        marginBottom: 16,
      },
      sectionIcon: {
        width: 20,
        height: 20,
        color: PRIMARY,
      },
      sectionTitle: {
        margin: 0,
        fontSize: 16,
        fontWeight: 700,
        color: '#334155',
      },
      grid2: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 14,
      },
      group: { display: 'flex', flexDirection: 'column', gap: 8 },
      label: {
        fontSize: 12,
        fontWeight: 700,
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      },
      inputWrapper: {
        position: 'relative',
      },
      input: {
        width: '100%',
        padding: '13px 44px 13px 16px',
        borderRadius: 12,
        border: '2px solid #e2e8f0',
        fontSize: 14,
        outline: 'none',
        transition: 'all 0.25s ease',
        backgroundColor: '#f8fafc',
        color: '#1e293b',
        boxSizing: 'border-box',
      },
      inputFocus: {
        borderColor: PRIMARY,
        backgroundColor: '#ffffff',
        boxShadow: `0 0 0 3px ${PRIMARY}22`,
      },
      passwordToggle: {
        position: 'absolute',
        right: 12,
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#94a3b8',
        padding: '6px',
        borderRadius: 6,
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      row: { display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 16 },
      btnPrimary: {
        padding: '13px 24px',
        borderRadius: 12,
        border: 'none',
        background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%)`,
        color: '#fff',
        fontWeight: 600,
        cursor: 'pointer',
        fontSize: 14,
        transition: 'all 0.25s ease',
        boxShadow: `0 4px 14px ${PRIMARY}44`,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      },
      btnPrimaryHover: {
        transform: 'translateY(-2px)',
        boxShadow: `0 8px 25px ${PRIMARY}55`,
      },
      btnSecondary: {
        padding: '13px 24px',
        borderRadius: 12,
        border: `2px solid #e2e8f0`,
        backgroundColor: 'transparent',
        color: '#64748b',
        fontWeight: 600,
        cursor: 'pointer',
        fontSize: 14,
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      },
      error: {
        backgroundColor: '#fef2f2',
        border: '1px solid #fecaca',
        color: '#dc2626',
        padding: '12px 14px',
        borderRadius: 12,
        marginTop: 14,
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      },
      success: {
        backgroundColor: '#f0fdf4',
        border: '1px solid #bbf7d0',
        color: '#16a34a',
        padding: '12px 14px',
        borderRadius: 12,
        marginTop: 14,
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      },
      hint: {
        fontSize: 12,
        color: '#64748b',
        marginTop: 10,
        padding: '12px 14px',
        backgroundColor: '#f8fafc',
        borderRadius: 10,
        border: `1px solid #e2e8f0`,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 8,
        lineHeight: 1.5,
      },
      notificationGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 12,
      },
      notificationCard: {
        border: `1px solid #e2e8f0`,
        borderRadius: 12,
        padding: '14px 16px',
        backgroundColor: '#f8fafc',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      },
      notificationCardActive: {
        borderColor: PRIMARY,
        backgroundColor: `${PRIMARY}08`,
        boxShadow: `0 4px 12px ${PRIMARY}15`,
      },
      checkboxCustom: {
        width: 22,
        height: 22,
        borderRadius: 6,
        border: '2px solid #cbd5e1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s',
        flexShrink: 0,
      },
      checkboxChecked: {
        backgroundColor: PRIMARY,
        borderColor: PRIMARY,
      },
      notificationLabel: {
        fontSize: 14,
        fontWeight: 600,
        color: '#475569',
      },
      spinner: {
        width: 16,
        height: 16,
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderTop: '2px solid #ffffff',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite',
      },
    }),
    [PRIMARY, PRIMARY_DARK, PRIMARY_BG, PRIMARY_BORDER],
  )

  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false)
  const [isSecondaryHovered, setIsSecondaryHovered] = useState(false)

  const submitPassword = async (e) => {
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
    if (newPassword.length < 6) {
      setPasswordError('Новый пароль должен содержать минимум 6 символов')
      return
    }

    setIsSubmitting(true)

    setTimeout(() => {
      const res = changePasswordDemo({
        email,
        currentPassword,
        newPassword,
      })

      if (!res.ok) {
        setPasswordError(res.message || 'Не удалось сменить пароль')
        setIsSubmitting(false)
        return
      }

      setPasswordSuccess('Пароль успешно изменён (демо). Используйте новый пароль при входе.')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setIsSubmitting(false)
    }, 600)
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
    setIsSavingNotif(true)
    setTimeout(() => {
      const next = updateUserSettings(email, { notifications: settings.notifications })
      setSettings(next)
      setNotifSaved(true)
      setIsSavingNotif(false)
    }, 400)
  }

  return (
    <div style={styles.card}>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div style={styles.header}>
        <div style={styles.headerIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" strokeWidth="2" />
            <path d="M19.4 15C19.4 15 20 13.5 20 12C20 10.5 19.4 9 19.4 9" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M4.6 9C4.6 9 4 10.5 4 12C4 13.5 4.6 15 4.6 15" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M15 19.4C15 19.4 13.5 20 12 20C10.5 20 9 19.4 9 19.4" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M9 4.6C9 4.6 10.5 4 12 4C13.5 4 15 4.6 15 4.6" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <h3 style={styles.title}>Настройки профиля</h3>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <svg style={styles.sectionIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
            <path d="M7 11V7C7 4.79086 8.79086 3 11 3H13C15.2091 3 17 4.79086 17 7V11" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="16" r="1" fill="currentColor" />
          </svg>
          <h4 style={styles.sectionTitle}>Смена пароля</h4>
        </div>

        <form onSubmit={submitPassword}>
          <div style={styles.grid2}>
            <div style={styles.group}>
              <div style={styles.label}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
                  <path d="M7 11V7C7 4.79086 8.79086 3 11 3H13C15.2091 3 17 4.79086 17 7V11" stroke="currentColor" strokeWidth="2" />
                </svg>
                Текущий пароль
              </div>
              <div style={styles.inputWrapper}>
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  style={{
                    ...styles.input,
                    ...(focusedInput === 'current' ? styles.inputFocus : {}),
                  }}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  onFocus={() => setFocusedInput('current')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="Введите текущий пароль"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  style={styles.passwordToggle}
                  onMouseEnter={(e) => e.target.style.color = PRIMARY}
                  onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                >
                  {showCurrentPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 12C2 12 5 6 12 6C19 6 22 12 22 12C22 12 19 18 12 18C5 18 2 12 2 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L23 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M16.51 16.51C15.29 17.53 13.73 18.17 12 18.17C5 18.17 2 12.17 2 12.17C2 12.17 2.53 11.09 3.58 10.04" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8.29 8.29C9.28 7.68 10.57 7.27 12 7.27C19 7.27 22 13.27 22 13.27C22 13.27 21.68 13.92 21.13 14.53" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div style={styles.group}>
              <div style={styles.label}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="8" r="1" fill="currentColor" />
                </svg>
                Новый пароль
              </div>
              <div style={styles.inputWrapper}>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  style={{
                    ...styles.input,
                    ...(focusedInput === 'new' ? styles.inputFocus : {}),
                  }}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onFocus={() => setFocusedInput('new')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="Минимум 6 символов"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  style={styles.passwordToggle}
                  onMouseEnter={(e) => e.target.style.color = PRIMARY}
                  onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                >
                  {showNewPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 12C2 12 5 6 12 6C19 6 22 12 22 12C22 12 19 18 12 18C5 18 2 12 2 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L23 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M16.51 16.51C15.29 17.53 13.73 18.17 12 18.17C5 18.17 2 12.17 2 12.17C2 12.17 2.53 11.09 3.58 10.04" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8.29 8.29C9.28 7.68 10.57 7.27 12 7.27C19 7.27 22 13.27 22 13.27C22 13.27 21.68 13.92 21.13 14.53" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 14, maxWidth: 420 }}>
            <div style={styles.group}>
              <div style={styles.label}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                </svg>
                Подтверждение нового пароля
              </div>
              <div style={styles.inputWrapper}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  style={{
                    ...styles.input,
                    ...(focusedInput === 'confirm' ? styles.inputFocus : {}),
                  }}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => setFocusedInput('confirm')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="Повторите новый пароль"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.passwordToggle}
                  onMouseEnter={(e) => e.target.style.color = PRIMARY}
                  onMouseLeave={(e) => e.target.style.color = '#94a3b8'}
                >
                  {showConfirmPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 12C2 12 5 6 12 6C19 6 22 12 22 12C22 12 19 18 12 18C5 18 2 12 2 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L23 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M16.51 16.51C15.29 17.53 13.73 18.17 12 18.17C5 18.17 2 12.17 2 12.17C2 12.17 2.53 11.09 3.58 10.04" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8.29 8.29C9.28 7.68 10.57 7.27 12 7.27C19 7.27 22 13.27 22 13.27C22 13.27 21.68 13.92 21.13 14.53" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div style={styles.row}>
            <button
              type="submit"
              style={{
                ...styles.btnPrimary,
                ...(isPrimaryHovered && !isSubmitting ? styles.btnPrimaryHover : {}),
                ...(isSubmitting ? { opacity: 0.7, cursor: 'not-allowed', transform: 'none' } : {}),
              }}
              onMouseEnter={() => !isSubmitting && setIsPrimaryHovered(true)}
              onMouseLeave={() => setIsPrimaryHovered(false)}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span style={styles.spinner} />
                  Изменение...
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" />
                    <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Изменить пароль
                </>
              )}
            </button>
            <button
              type="button"
              style={{
                ...styles.btnSecondary,
                ...(isSecondaryHovered ? { borderColor: '#cbd5e1', backgroundColor: '#f1f5f9' } : {}),
              }}
              onMouseEnter={() => setIsSecondaryHovered(true)}
              onMouseLeave={() => setIsSecondaryHovered(false)}
              onClick={() => {
                setCurrentPassword('')
                setNewPassword('')
                setConfirmPassword('')
                setPasswordError('')
                setPasswordSuccess('')
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Очистить
            </button>
          </div>

          {passwordError && (
            <div style={styles.error}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#fecaca" />
                <path d="M12 7V13" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="17" r="1.5" fill="#dc2626" />
              </svg>
              {passwordError}
            </div>
          )}

          {passwordSuccess && (
            <div style={styles.success}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#bbf7d0" />
                <path d="M8 12L11 15L16 9" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {passwordSuccess}
            </div>
          )}

          <div style={styles.hint}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }} xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="#94a3b8" strokeWidth="2" />
              <path d="M12 16V12" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="8" r="1" fill="#94a3b8" />
            </svg>
            <span>
              В демо‑версии пароль хранится в браузере (localStorage). Для боевой версии нужно будет подключить серверную авторизацию.
            </span>
          </div>
        </form>
      </div>

      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <svg style={styles.sectionIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 8C19.6569 8 21 9.34315 21 11C21 12.6569 19.6569 14 18 14C16.3431 14 15 12.6569 15 11C15 9.34315 16.3431 8 18 8Z" stroke="currentColor" strokeWidth="2" />
            <path d="M6 15C7.65685 15 9 16.3431 9 18C9 19.6569 7.65685 21 6 21C4.34315 21 3 19.6569 3 18C3 16.3431 4.34315 15 6 15Z" stroke="currentColor" strokeWidth="2" />
            <path d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M6 8C7.65685 8 9 6.65685 9 5C9 3.34315 7.65685 2 6 2C4.34315 2 3 3.34315 3 5C3 6.65685 4.34315 8 6 8Z" stroke="currentColor" strokeWidth="2" />
            <path d="M6 13V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M18 11V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <h4 style={styles.sectionTitle}>Настройки уведомлений</h4>
        </div>

        <div style={styles.notificationGrid}>
          <div
            style={{
              ...styles.notificationCard,
              ...(settings.notifications.email ? styles.notificationCardActive : {}),
            }}
            onClick={() => toggleNotif('email')}
          >
            <div style={{
              ...styles.checkboxCustom,
              ...(settings.notifications.email ? styles.checkboxChecked : {}),
            }}>
              {settings.notifications.email && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12L9 16L19 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <div>
              <div style={styles.notificationLabel}>Email-уведомления</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>
                {settings.notifications.email ? 'Включены' : 'Отключены'}
              </div>
            </div>
          </div>

          <div
            style={{
              ...styles.notificationCard,
              ...(settings.notifications.sms ? styles.notificationCardActive : {}),
            }}
            onClick={() => toggleNotif('sms')}
          >
            <div style={{
              ...styles.checkboxCustom,
              ...(settings.notifications.sms ? styles.checkboxChecked : {}),
            }}>
              {settings.notifications.sms && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12L9 16L19 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <div>
              <div style={styles.notificationLabel}>SMS-уведомления</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>
                {settings.notifications.sms ? 'Включены' : 'Отключены'}
              </div>
            </div>
          </div>

          <div
            style={{
              ...styles.notificationCard,
              ...(settings.notifications.inApp ? styles.notificationCardActive : {}),
            }}
            onClick={() => toggleNotif('inApp')}
          >
            <div style={{
              ...styles.checkboxCustom,
              ...(settings.notifications.inApp ? styles.checkboxChecked : {}),
            }}>
              {settings.notifications.inApp && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12L9 16L19 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <div>
              <div style={styles.notificationLabel}>Уведомления в ЛК</div>
              <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>
                {settings.notifications.inApp ? 'Включены' : 'Отключены'}
              </div>
            </div>
          </div>
        </div>

        <div style={styles.row}>
          <button
            type="button"
            style={{
              ...styles.btnPrimary,
              ...(isPrimaryHovered && !isSavingNotif ? styles.btnPrimaryHover : {}),
              ...(isSavingNotif ? { opacity: 0.7, cursor: 'not-allowed', transform: 'none' } : {}),
            }}
            onMouseEnter={() => !isSavingNotif && setIsPrimaryHovered(true)}
            onMouseLeave={() => setIsPrimaryHovered(false)}
            onClick={saveNotifications}
            disabled={isSavingNotif}
          >
            {isSavingNotif ? (
              <>
                <span style={styles.spinner} />
                Сохранение...
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M17 21V13H7V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7 3V8H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Сохранить уведомления
              </>
            )}
          </button>
        </div>

        {notifSaved && (
          <div style={styles.success}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#bbf7d0" />
              <path d="M8 12L11 15L16 9" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Настройки уведомлений сохранены.
          </div>
        )}
      </div>
    </div>
  )
}
