// src/pages/SettingsPage.tsx
import { useAuth } from '@/features/user/context/context'
import { getUserSettings, updateUserSettings } from '@/shared/data/settings'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from "./SettingsPage.module.css"
import Icon from '@/shared/ui-kits/Icon'
import { Role } from '@/entities/user/role'

export const SettingsPage = () => {
    const { user, signOut, changePassword } = useAuth()
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
            const res = changePassword({
                email: user!.email,
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

    return (
        <>
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
                        <Icon name='profile' />
                        Аккаунт
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'security' ? styles.active : ''}`}
                        onClick={() => setActiveTab('security')}
                    >
                        <Icon name='shield' width={23} />
                        Безопасность
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'notification' ? styles.active : ''}`}
                        onClick={() => setActiveTab('notification')}
                    >
                        <Icon name='notifications' />

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
                            <Link className={styles.primaryButton} to={user?.role == Role.Admin ? "/admin/profile" : (user?.role == Role.Customer ? "/customer/profile" : "/supplier/profile")}>
                                <Icon name='profile' />
                                Редактировать в профиле
                            </Link>
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
                                    <circle cx="12" cy="12" r="10" fill="#FECACA" />
                                    <path d="M12 7V13" stroke="#DC2626" strokeWidth="2" />
                                    <circle cx="12" cy="17" r="1.5" fill="#DC2626" />
                                </svg>
                                {passwordError}
                            </div>
                        )}

                        {passwordSuccess && (
                            <div className={styles.successBox}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" fill="#BBF7D0" />
                                    <path d="M8 12L11 15L16 9" stroke="#16A34A" strokeWidth="2" />
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
                                                <path d="M2 12C2 12 5 6 12 6C19 6 22 12 22 12C22 12 19 18 12 18C5 18 2 12 2 12Z" stroke="currentColor" strokeWidth="2" />
                                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                                            </svg>
                                        ) : (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                                <path d="M1 1L23 23" stroke="currentColor" strokeWidth="2" />
                                                <path d="M16.51 16.51C15.29 17.53 13.73 18.17 12 18.17C5 18.17 2 12.17 2 12.17C2 12.17 2.53 11.09 3.58 10.04" stroke="currentColor" strokeWidth="2" />
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
                                                <path d="M2 12C2 12 5 6 12 6C19 6 22 12 22 12C22 12 19 18 12 18C5 18 2 12 2 12Z" stroke="currentColor" strokeWidth="2" />
                                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                                            </svg>
                                        ) : (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                                <path d="M1 1L23 23" stroke="currentColor" strokeWidth="2" />
                                                <path d="M16.51 16.51C15.29 17.53 13.73 18.17 12 18.17C5 18.17 2 12.17 2 12.17C2 12.17 2.53 11.09 3.58 10.04" stroke="currentColor" strokeWidth="2" />
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
                                                <path d="M2 12C2 12 5 6 12 6C19 6 22 12 22 12C22 12 19 18 12 18C5 18 2 12 2 12Z" stroke="currentColor" strokeWidth="2" />
                                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                                            </svg>
                                        ) : (
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                                <path d="M1 1L23 23" stroke="currentColor" strokeWidth="2" />
                                                <path d="M16.51 16.51C15.29 17.53 13.73 18.17 12 18.17C5 18.17 2 12.17 2 12.17C2 12.17 2.53 11.09 3.58 10.04" stroke="currentColor" strokeWidth="2" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className={styles.passwordRequirements}>
                                <div className={`${styles.requirementItem} ${requirements.hasMinLength ? styles.requirementMet : ''}`}>
                                    <Icon name="info" width={18} />
                                    Минимум 8 символов
                                </div>
                                <div className={`${styles.requirementItem} ${requirements.hasMixedCase ? styles.requirementMet : ''}`}>
                                    <Icon name="info" width={18} />
                                    Заглавные и строчные буквы
                                </div>
                                <div className={`${styles.requirementItem} ${requirements.hasSpecialChar ? styles.requirementMet : ''}`}>
                                    <Icon name="info" width={18} />

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
                                            <Icon name="edit" height={15} width={15} />

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
                                    <circle cx="12" cy="12" r="10" fill="#BBF7D0" />
                                    <path d="M8 12L11 15L16 9" stroke="#16A34A" strokeWidth="2" />
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
                                        <Icon name='email' />
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
                                        <Icon name='phone' />
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
                                        <Icon name='notifications' />
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
                                        <Icon name="edit" height={15} width={15} />
                                        Сохранить настройки
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>

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
        </>

    )
}