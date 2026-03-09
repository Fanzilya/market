// src/pages/supplier/SupplierBalancePage/hooks/useBalanceData.ts
import { useState, useEffect } from 'react'

// Моковые данные - в реальном проекте здесь будет API call
const MOCK_BALANCE_DATA = {
  coins: 2450,
  freeClicks: 3,
  totalClicks: 156,
  totalSpent: 45600,
  registrationDate: '2024-01-15',
  lastTransaction: '2025-03-04'
}

const MOCK_TRANSACTIONS = [
  {
    id: 1,
    date: '2025-03-04',
    type: 'expense',
    description: 'Отклик на заявку №REQ-2025-001',
    amount: -50,
    balance: 2450
  },
  {
    id: 2,
    date: '2025-03-01',
    type: 'income',
    description: 'Пополнение баланса',
    amount: 1000,
    balance: 2500
  },
  {
    id: 3,
    date: '2025-02-28',
    type: 'expense',
    description: 'Отклик на заявку №REQ-2025-045',
    amount: -50,
    balance: 1500
  },
  {
    id: 4,
    date: '2025-02-25',
    type: 'expense',
    description: 'Отклик на заявку №REQ-2025-032',
    amount: -50,
    balance: 1550
  },
  {
    id: 5,
    date: '2025-02-20',
    type: 'income',
    description: 'Пополнение баланса',
    amount: 500,
    balance: 1600
  },
  {
    id: 6,
    date: '2025-02-15',
    type: 'bonus',
    description: 'Бонус за регистрацию',
    amount: 100,
    balance: 1100
  }
]

const MOCK_CLICKS_DATA = [
  { month: 'Янв', clicks: 12 },
  { month: 'Фев', clicks: 18 },
  { month: 'Мар', clicks: 15 },
  { month: 'Апр', clicks: 22 },
  { month: 'Май', clicks: 25 },
  { month: 'Июн', clicks: 20 },
  { month: 'Июл', clicks: 28 },
  { month: 'Авг', clicks: 30 },
  { month: 'Сен', clicks: 24 },
  { month: 'Окт', clicks: 19 },
  { month: 'Ноя', clicks: 16 },
  { month: 'Дек', clicks: 21 }
]

export default function useBalanceData() {
  const [balanceData, setBalanceData] = useState(MOCK_BALANCE_DATA)
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS)
  const [clicksData, setClicksData] = useState(MOCK_CLICKS_DATA)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const refreshData = async () => {
    setIsLoading(true)
    try {
      // В реальном проекте здесь будет API call
      // const response = await api.get('/balance')
      // setBalanceData(response.data.balance)
      // setTransactions(response.data.transactions)
      // setClicksData(response.data.clicks)

      // Пока используем моковые данные
      setBalanceData(MOCK_BALANCE_DATA)
      setTransactions(MOCK_TRANSACTIONS)
      setClicksData(MOCK_CLICKS_DATA)
      setError(null)
    } catch (err) {
      setError('Ошибка при загрузке данных')
    } finally {
      setIsLoading(false)
    }
  }

  return {
    balanceData,
    transactions,
    clicksData,
    isLoading,
    error,
    refreshData
  }
}