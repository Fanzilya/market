// src/pages/supplier/SupplierBalancePage/index.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSessionUser } from '../../../auth/demoAuth.js'
import Sidebar from '../../../components/Sidebar.jsx'
import AccessDenied from './components/AccessDenied'
import PageHeader from './components/PageHeader'
import BalanceCard from './components/BalanceCard'
import Tabs from './components/Tabs'
import BalanceTab from './components/BalanceTab'
import HistoryTab from './components/HistoryTab'
import StatsTab from './components/StatsTab'
import useBalanceData from './hooks/useBalanceData'
import usePackages from './hooks/usePackages'
import styles from './SupplierBalancePage.module.css'

export default function SupplierBalancePage() {
  const user = getSessionUser()
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('balance')

  const {
    balanceData,
    transactions,
    clicksData,
    refreshData
  } = useBalanceData()

  const {
    packages,
    selectedPackage,
    selectPackage,
    handlePayment
  } = usePackages()

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    setDarkMode(savedTheme === 'dark')
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
    document.body.classList.toggle('dark-mode', darkMode)
  }, [darkMode])

  if (!user) {
    return <AccessDenied onNavigate={navigate} />
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'balance':
        return (
          <BalanceTab
            packages={packages}
            selectedPackage={selectedPackage}
            onSelectPackage={selectPackage}
            onPayment={handlePayment}
          />
        )
      case 'history':
        return <HistoryTab transactions={transactions} />
      case 'stats':
        return (
          <StatsTab
            balanceData={balanceData}
            clicksData={clicksData}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className={`${styles.page} ${darkMode ? styles.dark : ''}`}>
      <Sidebar
        user={user}
        onLogout={() => navigate('/')}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <main className={styles.main}>
        <div className={styles.container}>
          <PageHeader onNavigate={navigate} />

          <BalanceCard balanceData={balanceData} onViewHistory={() => setActiveTab('history')} />

          <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

          <div className={styles.tabContent}>
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  )
}