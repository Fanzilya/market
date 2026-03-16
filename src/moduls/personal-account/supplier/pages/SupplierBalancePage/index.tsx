// src/pages/supplier/SupplierBalancePage/index.tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AccessDenied from './components/AccessDenied'
import PageHeader from './components/PageHeader'
import BalanceCard from './components/BalanceCard'
import Tabs from './components/Tabs'
import BalanceTab from './components/BalanceTab'
import HistoryTab from './components/HistoryTab'
import StatsTab from './components/StatsTab'
import useBalanceData from './hooks/useBalanceData'
import usePackages from './hooks/usePackages'
import { useAuth } from '@/features/user/context/context'
import styles from "./SupplierBalancePage.module.css"
import { balancePageModel } from '../../features/balance-page/balance-page-model'
import { AccountHeader } from '@/moduls/personal-account/_layout/widgets/account-header'

export const SupplierBalancePage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)
  const [activeTab, setActiveTab] = useState('balance')

  const {
    balanceData,
    transactions,
    clicksData,
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



  const { model, init } = balancePageModel

  useEffect(() => {
    init(user?.id)
  }, [])


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
    <div className={styles.container}>
      <AccountHeader
        title='Монетный счет'
        breadcrumbs={{
          current: "Монетный счет",
          linksBack: [{ text: 'Главная', link: "/dashboard" }]
        }}
      />

      <BalanceCard balanceData={balanceData} onViewHistory={() => setActiveTab('history')} />

      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      <div className={styles.tabContent}>
        {renderTabContent()}
      </div>
    </div>
  )
}