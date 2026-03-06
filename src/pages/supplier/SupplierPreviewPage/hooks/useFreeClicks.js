// src/pages/supplier/SupplierPreviewPage/hooks/useFreeClicks.js
import { useState, useEffect } from 'react'

const STORAGE_KEY = 'freeClicks'
const INITIAL_CLICKS = 5

export default function useFreeClicks() {
  const [freeClicksLeft, setFreeClicksLeft] = useState(INITIAL_CLICKS)

  useEffect(() => {
    // Загружаем количество бесплатных кликов из localStorage
    const savedClicks = localStorage.getItem(STORAGE_KEY)
    if (savedClicks) {
      setFreeClicksLeft(parseInt(savedClicks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, freeClicksLeft.toString())
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