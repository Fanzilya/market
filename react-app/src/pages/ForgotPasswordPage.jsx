import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [focusedInput, setFocusedInput] = useState(null)

  const styles = useMemo(
    () => ({
      container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: 20,
      },
      card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        padding: 40,
        width: '100%',
        maxWidth: 420,
      },
      title: {
        fontSize: 28,
        fontWeight: 600,
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
      },
      subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 1.5,
      },
      form: {
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      },
      inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      },
      label: {
        fontSize: 14,
        fontWeight: 500,
        color: '#555',
      },
      input: {
        padding: '12px 16px',
        fontSize: 16,
        border: '2px solid #e0e0e0',
        borderRadius: 8,
        outline: 'none',
        transition: 'border-color 0.2s',
      },
      inputFocus: {
        borderColor: '#007bff',
      },
      primaryButton: {
        padding: 14,
        fontSize: 16,
        fontWeight: 600,
        color: '#ffffff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer',
        transition: 'filter 0.2s',
        marginTop: 10,
      },
      primaryButtonDisabled: {
        backgroundColor: '#ccc',
        cursor: 'not-allowed',
      },
      secondaryButton: {
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 14,
        fontSize: 16,
        fontWeight: 600,
        color: '#007bff',
        backgroundColor: 'transparent',
        border: '2px solid #007bff',
        borderRadius: 8,
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'all 0.2s',
        width: '100%',
        marginTop: 10,
      },
      errorMessage: {
        backgroundColor: '#fee',
        color: '#c33',
        padding: 12,
        borderRadius: 8,
        fontSize: 14,
        marginBottom: 20,
        border: '1px solid #fcc',
      },
      successMessage: {
        backgroundColor: '#efe',
        color: '#2f7a2f',
        padding: 12,
        borderRadius: 8,
        fontSize: 14,
        marginBottom: 20,
        border: '1px solid #cfc',
        lineHeight: 1.5,
      },
      footer: {
        marginTop: 20,
        textAlign: 'center',
      },
      link: {
        color: '#007bff',
        textDecoration: 'none',
        fontSize: 14,
      },
      footerButtons: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        marginTop: 20,
      },
    }),
    [],
  )

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!email) {
      setError('Пожалуйста, введите email адрес')
      return
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Введите корректный email адрес')
      return
    }

    setIsLoading(true)

    try {
      // TODO: заменить на реальный вызов API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess(
        'Инструкции по восстановлению пароля отправлены на указанный email адрес. Проверьте почту.',
      )
      setEmail('')
    } catch {
      setError('Ошибка отправки. Попробуйте снова.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Восстановление пароля</h2>
        <p style={styles.subtitle}>
          Введите email адрес, указанный при регистрации. Мы отправим вам
          инструкции по восстановлению пароля.
        </p>

        {error && <div style={styles.errorMessage}>{error}</div>}
        {success && <div style={styles.successMessage}>{success}</div>}

        <form onSubmit={onSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(null)}
              placeholder="your.email@example.com"
              style={{
                ...styles.input,
                ...(focusedInput === 'email' ? styles.inputFocus : {}),
              }}
              disabled={isLoading || !!success}
            />
          </div>

          <button
            type="submit"
            style={{
              ...styles.primaryButton,
              ...(isLoading ? styles.primaryButtonDisabled : {}),
            }}
            disabled={isLoading || !!success}
          >
            {isLoading ? 'Отправка...' : 'Отправить инструкции'}
          </button>
        </form>

        <div style={styles.footerButtons}>
          <Link to="/" style={styles.secondaryButton}>
            Вернуться к входу
          </Link>
        </div>
      </div>
    </div>
  )
}
