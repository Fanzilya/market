// src/pages/supplier/SupplierBalancePage/components/HistoryTab/TransactionItem.jsx
import styles from '../../SupplierBalancePage.module.css'

const TYPE_ICONS = {
  income: '💰',
  expense: '📤',
  bonus: '🎁'
}

export default function TransactionItem({ transaction, formatDate }) {
  return (
    <div className={styles.transactionItem}>
      <div className={styles.transactionIcon}>
        {TYPE_ICONS[transaction.type]}
      </div>
      <div className={styles.transactionInfo}>
        <div className={styles.transactionDesc}>{transaction.description}</div>
        <div className={styles.transactionDate}>{formatDate(transaction.date)}</div>
      </div>
      <div className={styles.transactionAmount}>
        <span className={transaction.amount > 0 ? styles.positive : styles.negative}>
          {transaction.amount > 0 ? '+' : ''}{transaction.amount} 🪙
        </span>
      </div>
      <div className={styles.transactionBalance}>
        {transaction.balance} 🪙
      </div>
    </div>
  )
}