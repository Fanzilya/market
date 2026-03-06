// src/pages/supplier/SupplierPreviewPage/utils/techSpecsHelper.js
export const getTechSpecs = (kns) => {
  if (!kns) return []

  const specs = []
  const excludedFields = ['contactPerson', 'contactPhone', 'contactEmail', 'govCustomerName']

  Object.entries(kns).forEach(([key, value]) => {
    if (value && !excludedFields.includes(key)) {
      const { label, displayValue } = formatSpecField(key, value)
      specs.push({ label, value: displayValue })
    }
  })

  return specs
}

const formatSpecField = (key, value) => {
  const specMap = {
    capacity: { label: 'Производительность', formatter: (v) => `${v} м³/ч` },
    head: { label: 'Напор', formatter: (v) => `${v} м` },
    workingPumps: { label: 'Рабочих насосов' },
    reservePumps: { label: 'Резервных насосов' },
    stockPumps: { label: 'Насосов на склад' },
    medium: { label: 'Перекачиваемая среда' },
    temperature: { label: 'Температура', formatter: (v) => `${v}°C` },
    explosionProof: { label: 'Взрывозащита', formatter: (v) => v ? 'Да' : 'Нет' },
    inletDepth: { label: 'Глубина входа', formatter: (v) => `${v} м` },
    inletDiameter: { label: 'Диаметр входа', formatter: (v) => `${v} мм` },
    inletMaterial: { label: 'Материал входа' },
    outletDepth: { label: 'Глубина выхода', formatter: (v) => `${v} м` },
    outletDiameter: { label: 'Диаметр выхода', formatter: (v) => `${v} мм` },
    outletMaterial: { label: 'Материал выхода' },
    stationDiameter: { label: 'Диаметр станции', formatter: (v) => `${v} м` },
    stationHeight: { label: 'Высота станции', formatter: (v) => `${v} м` }
  }

  const spec = specMap[key] || { label: key }
  
  return {
    label: spec.label,
    displayValue: spec.formatter ? spec.formatter(value) : value
  }
}