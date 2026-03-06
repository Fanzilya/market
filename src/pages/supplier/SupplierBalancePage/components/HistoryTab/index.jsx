// src/pages/supplier/SupplierBalancePage/components/HistoryTab/index.jsx
import { useState } from 'react'
import TransactionItem from './TransactionItem'
import Pagination from './Pagination'
import styles from '../../SupplierBalancePage.module.css'
import { formatDate } from '../../utils/formatters'

const FILTERS = [
  { value: 'all', label: 'Все операции' },
  { value: 'income', label: 'Пополнения' },
  { value: 'expense', label: 'Списания' },
  { value: 'bonus', label: 'Бонусы' }
]

export default function HistoryTab({ transactions }) {
  const [filter, setFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const filteredTransactions = transactions.filter(t => 
    filter === 'all' ? true : t.type === filter
  )

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className={styles.historySection}>
      <div className={styles.historyHeader}>
        <h3 className={styles.sectionTitle}>История операций</h3>
        <div className={styles.historyFilters}>
          <select 
            className={styles.filterSelect}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            {FILTERS.map(f => (
              <option key={f.value} value={f.value}>{f.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.transactionsList}>
        {paginatedTransactions.map(transaction => (
          <TransactionItem 
            key={transaction.id} 
            transaction={transaction} 
            formatDate={formatDate}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}