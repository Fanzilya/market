// src/pages/supplier/SupplierBalancePage/components/BalanceTab/PaymentMethods.jsx
import styles from '../../SupplierBalancePage.module.css'

const PAYMENT_METHODS = [
  { id: 'card', icon: '💳', label: 'Банковская карта' },
  { id: 'sbp', icon: '📱', label: 'СБП' },
  { id: 'bank', icon: '🏦', label: 'Безналичный расчет' }
]

export default function PaymentMethods() {
  return (
    <>
      <h3 className={styles.sectionTitle}>Способ оплаты</h3>
      
      <div className={styles.paymentMethods}>
        {PAYMENT_METHODS.map(method => (
          <label key={method.id} className={styles.paymentMethod}>
            <input 
              type="radio" 
              name="payment" 
              defaultChecked={method.id === 'card'} 
            />
            <span className={styles.paymentMethodIcon}>{method.icon}</span>
            <span>{method.label}</span>
          </label>
        ))}
      </div>
    </>
  )
}