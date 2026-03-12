import { IRequest } from "@/entities/request/type"

// src/pages/SupplierPage/utils/formatters.ts
export const formatDate = (dateString) => {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('ru-RU')
}

export const getLimitedTechSpecs = (request: IRequest) => {
  const specs = []

  // if (request.perfomance) specs.push({
  //   label: 'Производительность',
  //   value: `${request.perfomance} м³/ч`
  // })
  // if (request.requiredPumpPressure) specs.push({
  //   label: 'Напор',
  //   value: `${request.requiredPumpPressure} м`
  // })
  // if (request.activePumpsCount) specs.push({
  //   label: 'Рабочих насосов',
  //   value: request.activePumpsCount
  // })
  // if (request.reservePumpsCount) specs.push({
  //   label: 'Резервных насосов',
  //   value: request.reservePumpsCount
  // })
  // if (request.pType) specs.push({
  //   label: 'Среда',
  //   value: request.pType
  // })
  // if (request.kns.temperature) specs.push({
  //   label: 'Температура',
  //   value: `${request.kns.temperature}°C`
  // })
  // if (request.kns.inletDiameter) specs.push({
  //   label: 'Диаметр входа',
  //   value: `${request.kns.inletDiameter} мм`
  // })
  // if (request.kns.outletDiameter) specs.push({
  //   label: 'Диаметр выхода',
  //   value: `${request.kns.outletDiameter} мм`
  // })
  // if (request.kns.stationDiameter) specs.push({
  //   label: 'Диаметр станции',
  //   value: `${request.kns.stationDiameter} м`
  // })
  // if (request.kns.stationHeight) specs.push({
  //   label: 'Высота станции',
  //   value: `${request.kns.stationHeight} м`
  // })

  return specs
}