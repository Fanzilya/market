// src/pages/ForgotPasswordPage.tsx
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './ForgotPasswordPage.module.css'
import { AuthLayout } from '../../widgets/layout/layout'
import { Input } from '@/shared/ui-kits/Input'
import { forgotPasswordModel } from '../../features/ForgotPassword/forgot-password-model'
import { Button } from '@/shared/ui-kits/button'
import { observer } from 'mobx-react-lite'

export const ForgotPasswordPage = observer(() => {

  const { email, setFormData, clearFormsData, onSubmit, isLoader, errors, success } = forgotPasswordModel

  useEffect(() => {
    clearFormsData()
  }, [])

  return (
    <AuthLayout
      title='Восстановление пароля'
      subtitle='Введите email адрес, указанный при регистрации. Мы отправим вам инструкцию по восстановлению пароля.'
      formBlock={
        <>
          {success && (
            <div className={styles.successMessage}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#BBF7D0" />
                <path d="M8 12L11 15L16 9" stroke="#16A34A" strokeWidth="2" />
              </svg>
              <span>Новый пароль отправлен на указанную вами почту</span>
            </div>
          )}

          <div className={styles.form}>
            <Input
              type="email"
              value={email}
              onChange={(e) => setFormData(e)}
              placeholder="@mail.ru"
              classNames={{ input: styles.input }}
              disabled={isLoader}
              required
              label="Email"
              error={errors}
            />

            <Button
              type="submit"
              className="w-full p-4 bg-gradient-to-br from-[#4A85F6] to-[#3A6BC9] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:ring-offset-2"
              disabled={isLoader}
              onClick={onSubmit}
            >
              {isLoader ? (
                <>
                  <span className={styles.spinner} />
                  Отправка...
                </>
              ) : (
                'Отправить'
              )}
            </Button>
          </div>

          <Link to="/login" className={styles.backLink}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5" stroke="#4A85F6" strokeWidth="2" />
              <path d="M12 19L5 12L12 5" stroke="#4A85F6" strokeWidth="2" />
            </svg>
            Вернуться к входу
          </Link>

        </>
      }
      informationBlock={
        <><div className={styles.promoBadge}>Платформа для бизнеса</div>

          <h2 className={styles.promoTitle}>
            Безопасное восстановление доступа
          </h2>

          <p className={styles.promoDescription}>
            Мы заботимся о безопасности ваших данных. Восстановление пароля происходит через подтверждение email адреса.
          </p>

          <div className={styles.promoFeatures}>
            <div className={styles.promoFeature}>
              <span>Мгновенная отправка инструкций</span>
            </div>
            <div className={styles.promoFeature}>
              <span>Безопасная ссылка для сброса</span>
            </div>
            <div className={styles.promoFeature}>
              <span>Поддержка 24/7</span>
            </div>
            <div className={styles.promoFeature}>
              <span>Защита персональных данных</span>
            </div>
          </div>
        </>
      }
    />
  )
}
)