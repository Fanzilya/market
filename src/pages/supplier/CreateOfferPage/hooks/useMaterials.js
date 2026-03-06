// src/pages/supplier/CreateOfferPage/hooks/useMaterials.js
import { useState, useCallback } from 'react'

export default function useMaterials(initialMaterials = []) {
  const [materials, setMaterials] = useState(initialMaterials)
  const [newMaterial, setNewMaterial] = useState({
    name: '',
    quantity: '',
    unit: 'шт',
    price: ''
  })

  const handleMaterialChange = useCallback((e) => {
    const { name, value } = e.target
    setNewMaterial(prev => ({ ...prev, [name]: value }))
  }, [])

  const addMaterial = useCallback(() => {
    if (!newMaterial.name.trim() || !newMaterial.quantity || !newMaterial.price) {
      alert('Заполните все поля материала')
      return false
    }

    setMaterials(prev => [...prev, { 
      ...newMaterial, 
      id: Date.now(),
      quantity: parseFloat(newMaterial.quantity),
      price: parseFloat(newMaterial.price)
    }])

    setNewMaterial({
      name: '',
      quantity: '',
      unit: 'шт',
      price: ''
    })

    return true
  }, [newMaterial])

  const removeMaterial = useCallback((materialId) => {
    setMaterials(prev => prev.filter(m => m.id !== materialId))
  }, [])

  const updateMaterial = useCallback((materialId, updates) => {
    setMaterials(prev => prev.map(m => 
      m.id === materialId ? { ...m, ...updates } : m
    ))
  }, [])

  const getTotalPrice = useCallback(() => {
    return materials.reduce((sum, m) => sum + (m.price * m.quantity), 0)
  }, [materials])

  return {
    materials,
    newMaterial,
    handleMaterialChange,
    addMaterial,
    removeMaterial,
    updateMaterial,
    getTotalPrice,
    setNewMaterial
  }
}