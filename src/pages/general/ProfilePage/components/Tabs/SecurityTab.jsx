// src/pages/ProfilePage/components/Tabs/SecurityTab.jsx
import { useState } from 'react'
import styles from '../../ProfilePage.module.css'

export default function SecurityTab() {
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  })

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Здесь будет логика смены пароля
    console.log('Password change:', passwordData)
  }

  return (
    <div className={styles.securitySection}>
      <ChangePasswordCard
        passwordData={passwordData}
        onChange={handlePasswordChange}
        onSubmit={handleSubmit}
      />
      
      <TwoFactorCard />
      
      <DangerZoneCard />
    </div>
  )
}

const ChangePasswordCard = ({ passwordData, onChange, onSubmit }) => (
  <div className={styles.securityCard}>
    <h3 className={styles.securityTitle}>Смена пароля</h3>
    <form className={styles.securityForm} onSubmit={onSubmit}>
      <FormGroup
        label="Текущий пароль"
        name="current"
        type="password"
        value={passwordData.current}
        onChange={onChange}
        placeholder="••••••••"
      />
      <FormGroup
        label="Новый пароль"
        name="new"
        type="password"
        value={passwordData.new}
        onChange={onChange}
        placeholder="••••••••"
      />
      <FormGroup
        label="Подтверждение пароля"
        name="confirm"
        type="password"
        value={passwordData.confirm}
        onChange={onChange}
        placeholder="••••••••"
      />
      <button type="submit" className={styles.submitButton}>
        Обновить пароль
      </button>
    </form>
  </div>
)

const TwoFactorCard = () => (
  <div className={styles.securityCard}>
    <h3 className={styles.securityTitle}>Двухфакторная аутентификация</h3>
    <p className={styles.securityDescription}>
      Добавьте дополнительный уровень защиты к вашему аккаунту
    </p>
    <button className={styles.enableButton}>
      Включить 2FA
    </button>
  </div>
)

const DangerZoneCard = () => (
  <div className={styles.dangerZone}>
    <h3 className={styles.dangerTitle}>Опасная зона</h3>
    <p className={styles.dangerDescription}>
      Удаление аккаунта приведет к потере всех данных
    </p>
    <button className={styles.deleteButton}>
      Удалить аккаунт
    </button>
  </div>
)

const FormGroup = ({ label, name, type, value, onChange, placeholder }) => (
  <div className={styles.formGroup}>
    <label className={styles.label}>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={styles.input}
    />
  </div>
)