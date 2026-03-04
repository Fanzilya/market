// src/pages/SettingsPage.jsx
import { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSessionUser, signOut, changePasswordDemo } from '../auth/demoAuth.js'
import { getUserSettings, updateUserSettings } from '../data/settings.js'
import Sidebar from '../components/Sidebar.jsx'
import styles from './SettingsPage.module.css'

export const SettingsPage = ()=> {
  const user = getSessionUser()
  const navigate = useNavigate()
  const [isMounted, setIsMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('security')
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  // Password state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Notification settings
  const [settings, setSettings] = useState(() => getUserSettings(user?.email || ''))
  const [notifSaved, setNotifSaved] = useState(false)
  const [isSavingNotif, setIsSavingNotif] = useState(false)
  const [hoveredNotification, setHoveredNotification] = useState(null)

  useEffect(() => {
    setIsMounted(true)
    const savedTheme = localStorage.getItem('theme')
    setDarkMode(savedTheme === 'dark')
    
    if (user?.email) {
      setSettings(getUserSettings(user.email))
    }
  }, [user?.email])

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  const onLogout = () => {
    setShowLogoutConfirm(true)
  }

  const confirmLogout = () => {
    signOut()
    navigate('/login', { replace: true })
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setPasswordError('')
    setPasswordSuccess('')

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Заполните все поля')
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Новый пароль и подтверждение не совпадают')
      return
    }
    if (newPassword.length < 8) {
      setPasswordError('Пароль должен содержать минимум 8 символов')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      const res = changePasswordDemo({
        email: user.email,
        currentPassword,
        newPassword,
      })

      if (!res.ok) {
        setPasswordError(res.message || 'Не удалось сменить пароль')
        setIsSubmitting(false)
        return
      }

      setPasswordSuccess('Пароль успешно изменён')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setIsSubmitting(false)
    }, 600)
  }

  const toggleNotification = (field) => {
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
      const next = updateUserSettings(user.email, { notifications: settings.notifications })
      setSettings(next)
      setNotifSaved(true)
      setIsSavingNotif(false)
    }, 400)
  }

  const getPasswordRequirements = () => {
    const hasMinLength = newPassword.length >= 8
    const hasMixedCase = /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
    return { hasMinLength, hasMixedCase, hasSpecialChar }
  }

  const requirements = getPasswordRequirements()

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

  return (
    <div className={`${styles.page} ${darkMode ? styles.dark : ''}`}>
      <Sidebar 
        user={user}
        onLogout={onLogout}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <main className={styles.main}>
        {/* Шапка страницы */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>Настройки</h1>
            <div className={styles.breadcrumbs}>
              <span className={styles.breadcrumb} onClick={() => navigate('/dashboard')}>Главная</span>
              <span className={styles.separator}>/</span>
              <span className={styles.breadcrumb} onClick={() => navigate('/profile')}>Профиль</span>
              <span className={styles.separator}>/</span>
              <span className={styles.current}>Настройки</span>
            </div>
          </div>
        </div>

        {/* Карточка настроек */}
        <div className={styles.settingsCard}>
          {/* Табы */}
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${activeTab === 'account' ? styles.active : ''}`}
              onClick={() => setActiveTab('account')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="2"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Аккаунт
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'security' ? styles.active : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Безопасность
            </button>
            <button 
              className={`${styles.tab} ${activeTab === 'notification' ? styles.active : ''}`}
              onClick={() => setActiveTab('notification')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M18 8C19.6569 8 21 9.34315 21 11C21 12.6569 19.6569 14 18 14C16.3431 14 15 12.6569 15 11C15 9.34315 16.3431 8 18 8Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M6 15C7.65685 15 9 16.3431 9 18C9 19.6569 7.65685 21 6 21C4.34315 21 3 19.6569 3 18C3 16.3431 4.34315 15 6 15Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M2 2L22 22" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Уведомления
            </button>
          </div>

          {/* Account Tab */}
          {activeTab === 'account' && (
            <div className={styles.tabContent}>
              <h2 className={styles.sectionTitle}>Настройки аккаунта</h2>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Email</label>
                <input 
                  type="email" 
                  value={user.email} 
                  disabled 
                  className={`${styles.input} ${styles.inputDisabled}`}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>ФИО</label>
                <input 
                  type="text" 
                  value={user.fullName} 
                  disabled 
                  className={`${styles.input} ${styles.inputDisabled}`}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Телефон</label>
                <input 
                  type="tel" 
                  value={user.phone || ''} 
                  disabled 
                  className={`${styles.input} ${styles.inputDisabled}`}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Роль</label>
                <input 
                  type="text" 
                  value={user.roleLabel} 
                  disabled 
                  className={`${styles.input} ${styles.inputDisabled}`}
                />
              </div>

              {user.company && (
                <>
                  <h3 className={styles.subsectionTitle}>Информация о компании</h3>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Наименование компании</label>
                    <input 
                      type="text" 
                      value={user.company.name || ''} 
                      disabled 
                      className={`${styles.input} ${styles.inputDisabled}`}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>ИНН</label>
                    <input 
                      type="text" 
                      value={user.company.inn || ''} 
                      disabled 
                      className={`${styles.input} ${styles.inputDisabled}`}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>КПП</label>
                    <input 
                      type="text" 
                      value={user.company.kpp || ''} 
                      disabled 
                      className={`${styles.input} ${styles.inputDisabled}`}
                    />
                  </div>
                </>
              )}

              <div className={styles.formActions}>
                <button className={styles.primaryButton} onClick={() => navigate('/profile')}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  Редактировать в профиле
                </button>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className={styles.tabContent}>
              <h2 className={styles.sectionTitle}>Смена пароля</h2>
              
              {passwordError && (
                <div className={styles.errorBox}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#FECACA"/>
                    <path d="M12 7V13" stroke="#DC2626" strokeWidth="2"/>
                    <circle cx="12" cy="17" r="1.5" fill="#DC2626"/>
                  </svg>
                  {passwordError}
                </div>
              )}
              
              {passwordSuccess && (
                <div className={styles.successBox}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#BBF7D0"/>
                    <path d="M8 12L11 15L16 9" stroke="#16A34A" strokeWidth="2"/>
                  </svg>
                  {passwordSuccess}
                </div>
              )}

              <form onSubmit={handlePasswordSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Текущий пароль</label>
                  <div className={styles.inputWrapper}>
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="••••••••"
                      className={styles.input}
                    />
                    <button 
                      type="button" 
                      className={styles.passwordToggle} 
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M2 12C2 12 5 6 12 6C19 6 22 12 22 12C22 12 19 18 12 18C5 18 2 12 2 12Z" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M1 1L23 23" stroke="currentColor" strokeWidth="2"/>
                          <path d="M16.51 16.51C15.29 17.53 13.73 18.17 12 18.17C5 18.17 2 12.17 2 12.17C2 12.17 2.53 11.09 3.58 10.04" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Новый пароль</label>
                  <div className={styles.inputWrapper}>
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="••••••••"
                      className={styles.input}
                    />
                    <button 
                      type="button" 
                      className={styles.passwordToggle} 
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M2 12C2 12 5 6 12 6C19 6 22 12 22 12C22 12 19 18 12 18C5 18 2 12 2 12Z" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M1 1L23 23" stroke="currentColor" strokeWidth="2"/>
                          <path d="M16.51 16.51C15.29 17.53 13.73 18.17 12 18.17C5 18.17 2 12.17 2 12.17C2 12.17 2.53 11.09 3.58 10.04" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Подтверждение пароля</label>
                  <div className={styles.inputWrapper}>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className={styles.input}
                    />
                    <button 
                      type="button" 
                      className={styles.passwordToggle} 
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M2 12C2 12 5 6 12 6C19 6 22 12 22 12C22 12 19 18 12 18C5 18 2 12 2 12Z" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M1 1L23 23" stroke="currentColor" strokeWidth="2"/>
                          <path d="M16.51 16.51C15.29 17.53 13.73 18.17 12 18.17C5 18.17 2 12.17 2 12.17C2 12.17 2.53 11.09 3.58 10.04" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className={styles.passwordRequirements}>
                  <div className={`${styles.requirementItem} ${requirements.hasMinLength ? styles.requirementMet : ''}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      {requirements.hasMinLength ? (
                        <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2"/>
                      ) : (
                        <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2"/>
                      )}
                    </svg>
                    Минимум 8 символов
                  </div>
                  <div className={`${styles.requirementItem} ${requirements.hasMixedCase ? styles.requirementMet : ''}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      {requirements.hasMixedCase ? (
                        <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2"/>
                      ) : (
                        <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2"/>
                      )}
                    </svg>
                    Заглавные и строчные буквы
                  </div>
                  <div className={`${styles.requirementItem} ${requirements.hasSpecialChar ? styles.requirementMet : ''}`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      {requirements.hasSpecialChar ? (
                        <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2"/>
                      ) : (
                        <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2"/>
                      )}
                    </svg>
                    Специальные символы (!@#$%)
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button type="submit" className={styles.primaryButton} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <span className={styles.spinner} />
                        Обновление...
                      </>
                    ) : (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M20 14.66V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2H14L20 8V14.66Z" stroke="currentColor" strokeWidth="2"/>
                          <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2"/>
                          <path d="M12 22V16" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Изменить пароль
                      </>
                    )}
                  </button>
                  <button 
                    type="button" 
                    className={styles.secondaryButton} 
                    onClick={() => { 
                      setCurrentPassword(''); 
                      setNewPassword(''); 
                      setConfirmPassword(''); 
                      setPasswordError(''); 
                      setPasswordSuccess(''); 
                    }}
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Notification Tab */}
          {activeTab === 'notification' && (
            <div className={styles.tabContent}>
              <h2 className={styles.sectionTitle}>Настройки уведомлений</h2>
              
              {notifSaved && (
                <div className={styles.successBox}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#BBF7D0"/>
                    <path d="M8 12L11 15L16 9" stroke="#16A34A" strokeWidth="2"/>
                  </svg>
                  Настройки уведомлений сохранены
                </div>
              )}

              <div className={styles.notificationsList}>
                <div 
                  className={`${styles.notificationItem} ${hoveredNotification === 'email' ? styles.notificationItemHover : ''}`}
                  onMouseEnter={() => setHoveredNotification('email')}
                  onMouseLeave={() => setHoveredNotification(null)}
                >
                  <div className={styles.notificationInfo}>
                    <div className={styles.notificationIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div className={styles.notificationText}>
                      <div className={styles.notificationTitle}>Email-уведомления</div>
                      <div className={styles.notificationDesc}>Получать уведомления на электронную почту</div>
                    </div>
                  </div>
                  <button
                    className={`${styles.toggle} ${settings.notifications.email ? styles.toggleOn : styles.toggleOff}`}
                    onClick={() => toggleNotification('email')}
                  >
                    <div className={styles.toggleKnob} style={{ left: settings.notifications.email ? '22px' : '2px' }} />
                  </button>
                </div>

                <div 
                  className={`${styles.notificationItem} ${hoveredNotification === 'sms' ? styles.notificationItemHover : ''}`}
                  onMouseEnter={() => setHoveredNotification('sms')}
                  onMouseLeave={() => setHoveredNotification(null)}
                >
                  <div className={styles.notificationInfo}>
                    <div className={styles.notificationIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M22 16.92V19.92C22 20.48 21.56 20.93 21 20.99C20.83 21 20.67 21 20.5 21C10.62 21 2.5 12.88 2.5 3C2.5 2.83 2.5 2.67 2.51 2.5C2.57 1.94 3.02 1.5 3.58 1.5H6.58C7.17 1.5 7.68 1.91 7.78 2.49L8.28 5.36C8.38 5.92 8.14 6.49 7.67 6.81L5.94 8.01C7.34 10.79 9.64 13.09 12.42 14.49L13.62 12.76C13.94 12.29 14.51 12.05 15.07 12.15L17.94 12.65C18.52 12.75 18.93 13.26 18.93 13.85V16.92Z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div className={styles.notificationText}>
                      <div className={styles.notificationTitle}>SMS-уведомления</div>
                      <div className={styles.notificationDesc}>Получать уведомления по SMS</div>
                    </div>
                  </div>
                  <button
                    className={`${styles.toggle} ${settings.notifications.sms ? styles.toggleOn : styles.toggleOff}`}
                    onClick={() => toggleNotification('sms')}
                  >
                    <div className={styles.toggleKnob} style={{ left: settings.notifications.sms ? '22px' : '2px' }} />
                  </button>
                </div>

                <div 
                  className={`${styles.notificationItem} ${hoveredNotification === 'inApp' ? styles.notificationItemHover : ''}`}
                  onMouseEnter={() => setHoveredNotification('inApp')}
                  onMouseLeave={() => setHoveredNotification(null)}
                >
                  <div className={styles.notificationInfo}>
                    <div className={styles.notificationIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M18 8C19.6569 8 21 9.34315 21 11C21 12.6569 19.6569 14 18 14C16.3431 14 15 12.6569 15 11C15 9.34315 16.3431 8 18 8Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M6 15C7.65685 15 9 16.3431 9 18C9 19.6569 7.65685 21 6 21C4.34315 21 3 19.6569 3 18C3 16.3431 4.34315 15 6 15Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M2 2L22 22" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div className={styles.notificationText}>
                      <div className={styles.notificationTitle}>Уведомления в системе</div>
                      <div className={styles.notificationDesc}>Получать уведомления в личном кабинете</div>
                    </div>
                  </div>
                  <button
                    className={`${styles.toggle} ${settings.notifications.inApp ? styles.toggleOn : styles.toggleOff}`}
                    onClick={() => toggleNotification('inApp')}
                  >
                    <div className={styles.toggleKnob} style={{ left: settings.notifications.inApp ? '22px' : '2px' }} />
                  </button>
                </div>
              </div>

              <div className={styles.formActions}>
                <button className={styles.primaryButton} onClick={saveNotifications} disabled={isSavingNotif}>
                  {isSavingNotif ? (
                    <>
                      <span className={styles.spinner} />
                      Сохранение...
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M16 21V14H8V21" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      Сохранить настройки
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Модальное окно подтверждения выхода */}
      {showLogoutConfirm && (
        <div className={styles.modalOverlay} onClick={() => setShowLogoutConfirm(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalIcon}>👋</div>
            <h3 className={styles.modalTitle}>Выйти из аккаунта?</h3>
            <p className={styles.modalMessage}>Вы будете перенаправлены на страницу входа</p>
            <div className={styles.modalActions}>
              <button className={styles.modalCancel} onClick={() => setShowLogoutConfirm(false)}>
                Отмена
              </button>
              <button className={styles.modalConfirm} onClick={confirmLogout}>
                Выйти
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}