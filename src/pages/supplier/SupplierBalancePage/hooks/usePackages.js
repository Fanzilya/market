// src/pages/supplier/SupplierBalancePage/hooks/usePackages.js
import { useState } from 'react'
import { formatPrice } from '../utils/formatters'

// Моковые данные пакетов
const MOCK_PACKAGES = [
  {
    id: 1,
    coins: 500,
    price: 500,
    popular: false,
    bonus: 0
  },
  {
    id: 2,
    coins: 1000,
    price: 950,
    popular: true,
    bonus: 50,
    oldPrice: 1000
  },
  {
    id: 3,
    coins: 2000,
    price: 1800,
    popular: false,
    bonus: 200,
    oldPrice: 2000
  },
  {
    id: 4,
    coins: 5000,
    price: 4250,
    popular: false,
    bonus: 750,
    oldPrice: 5000
  },
  {
    id: 5,
    coins: 10000,
    price: 8000,
    popular: false,
    bonus: 2000,
    oldPrice: 10000
  }
]

export default function usePackages() {
  const [packages] = useState(MOCK_PACKAGES)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('card')

  const selectPackage = (pkg) => {
    setSelectedPackage(pkg)
  }

  const handlePayment = () => {
    if (!selectedPackage) {
      alert('Выберите тарифный пакет')
      return false
    }
    
    // В реальном проекте здесь будет интеграция с платежной системой
    alert(`Оплата пакета ${selectedPackage.coins} монет на сумму ${formatPrice(selectedPackage.price)}`)
    return true
  }

  return {
    packages,
    selectedPackage,
    paymentMethod,
    setPaymentMethod,
    selectPackage,
    handlePayment
  }
}