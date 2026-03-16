// src/pages/supplier/CreateOfferPage/utils/validators.ts
export const validateOfferForm = (formData) => {
  const errors = {}

  // Проверка основных полей
  if (!formData.fullName?.trim()) {
    errors.fullName = 'Укажите полное наименование организации'
  }

  if (!formData.price?.trim()) {
    errors.price = 'Укажите стоимость'
  } else if (isNaN(parseFloat(formData.price))) {
    errors.price = 'Стоимость должна быть числом'
  }

  if (!formData.offerNumber?.trim()) {
    errors.offerNumber = 'Укажите номер коммерческого предложения'
  }

  if (!formData.offerDate) {
    errors.offerDate = 'Укажите дату коммерческого предложения'
  }

  if (!formData.city?.trim()) {
    errors.city = 'Укажите город расположения склада'
  }

  // Проверка материалов (опционально)
  if (formData.materials?.length > 0) {
    const invalidMaterials = formData.materials.filter(m =>
      !m.name || !m.quantity || !m.price
    )
    if (invalidMaterials.length > 0) {
      errors.materials = 'Заполните все поля материалов'
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

export const validateMaterial = (material) => {
  const errors = {}

  if (!material.name?.trim()) {
    errors.name = 'Укажите наименование материала'
  }

  if (!material.quantity) {
    errors.quantity = 'Укажите количество'
  } else if (isNaN(parseFloat(material.quantity))) {
    errors.quantity = 'Количество должно быть числом'
  }

  if (!material.price) {
    errors.price = 'Укажите цену'
  } else if (isNaN(parseFloat(material.price))) {
    errors.price = 'Цена должна быть числом'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}