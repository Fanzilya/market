// src/pages/supplier/SupplierPreviewPage/hooks/useFreeClicks.ts
import { useState, useEffect } from 'react'

const USER_STORAGE_KEY = 'freeClicks'
const INITIAL_CLICKS = 5

export default function useFreeClicks() {
  const [freeClicksLeft, setFreeClicksLeft] = useState(INITIAL_CLICKS)

  useEffect(() => {
    // Загружаем количество бесплатных кликов из localStorage
    const savedClicks = localStorage.getItem(USER_STORAGE_KEY)
    if (savedClicks) {
      setFreeClicksLeft(parseInt(savedClicks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(USER_STORAGE_KEY, freeClicksLeft.toString())
  }, [freeClicksLeft])

  const decrementClicks = () => {
    setFreeClicksLeft(prev => Math.max(0, prev - 1))
  }

  const resetClicks = () => {
    setFreeClicksLeft(INITIAL_CLICKS)
  }

  return {
    freeClicksLeft,
    isClicksAvailable: freeClicksLeft > 0,
    decrementClicks,
    resetClicks
  }
}