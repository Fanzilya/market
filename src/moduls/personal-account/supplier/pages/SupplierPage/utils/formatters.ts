// src/pages/SupplierPage/utils/formatters.ts
export const formatDate = (dateString) => {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('ru-RU')
}

export const getLimitedTechSpecs = (request) => {
  if (!request.kns) return []

  const specs = []

  if (request.kns.capacity) specs.push({
    label: 'Производительность',
    value: `${request.kns.capacity} м³/ч`
  })
  if (request.kns.head) specs.push({
    label: 'Напор',
    value: `${request.kns.head} м`
  })
  if (request.kns.workingPumps) specs.push({
    label: 'Рабочих насосов',
    value: request.kns.workingPumps
  })
  if (request.kns.reservePumps) specs.push({
    label: 'Резервных насосов',
    value: request.kns.reservePumps
  })
  if (request.kns.medium) specs.push({
    label: 'Среда',
    value: request.kns.medium
  })
  if (request.kns.temperature) specs.push({
    label: 'Температура',
    value: `${request.kns.temperature}°C`
  })
  if (request.kns.inletDiameter) specs.push({
    label: 'Диаметр входа',
    value: `${request.kns.inletDiameter} мм`
  })
  if (request.kns.outletDiameter) specs.push({
    label: 'Диаметр выхода',
    value: `${request.kns.outletDiameter} мм`
  })
  if (request.kns.stationDiameter) specs.push({
    label: 'Диаметр станции',
    value: `${request.kns.stationDiameter} м`
  })
  if (request.kns.stationHeight) specs.push({
    label: 'Высота станции',
    value: `${request.kns.stationHeight} м`
  })

  return specs
}