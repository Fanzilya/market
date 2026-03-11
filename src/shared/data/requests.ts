// src/data/requests.ts

import { REQUESTS_KEY } from "@/entities/request/config"
import { Role } from "@/entities/user/role"

// Вспомогательные функции
function safeParse(raw, fallback) {
  try {
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function loadAll() {
  return safeParse(localStorage.getItem(REQUESTS_KEY), [])
}

function saveAll(items) {
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(items))
}

// Инициализация начальными данными, если localStorage пуст
function initializeRequests() {
  const existing = loadAll()
  if (existing.length === 0) {
    // Начальные демо-данные
    const initialRequests = [
      {
        id: 'REQ-2024-001',
        createdAt: '2024-01-15T10:30:00.000Z',
        customerEmail: 'customer@marketplays.ru',
        customerFullName: 'Петров Пётр Петрович',
        objectName: 'КНС-25',
        govCustomerName: 'ГУИС',
        configType: 'КНС',
        contactPerson: 'Петров Пётр Петрович',
        contactPhone: '+7 (900) 123-45-67',
        contactEmail: 'customer@marketplays.ru',
        status: 'published', // Опубликована
        moderationStatus: 'approved', // Одобрена модератором
        publishedAt: '2024-01-16T10:30:00.000Z',
        kns: {
          capacity: '25',
          head: '15',
          workingPumps: '2',
          reservePumps: '1',
          stockPumps: '0',
          medium: 'Хоз-бытовые сточные воды',
          temperature: '20',
          explosionProof: false,
          inletDepth: '3.5',
          inletDiameter: '150',
          inletMaterial: 'ПНД',
          inletDirection: '12',
          outletDepth: '2.0',
          outletDiameter: '100',
          outletMaterial: 'ПНД',
          outletDirection: '3',
          outletCount: '1',
          stationDiameter: '2.5',
          stationHeight: '4.0',
          insulation: '1.5',
          motorStartMethod: 'direct',
          powerInputs: '1',
          cabinetLocation: 'УХЛ1',
        },
        knsExtras: {
          'Канальный измельчитель': true,
          'Шиберный затвор на подводящей трубе': false,
          'Расходомер на напорном трубопроводе': true,
          'Газоанализатор': false,
          'Диспетчеризация': true,
          'Наземный павильон': false,
          'Грузоподъемное устройство': false,
          'Колодец с задвижкой перед КНС': false,
          'Колодец с запорной арматурой после КНС': false,
        }
      },
      {
        id: 'REQ-2024-002',
        createdAt: '2024-01-14T14:20:00.000Z',
        customerEmail: 'customer@marketplays.ru',
        customerFullName: 'Петров Пётр Петрович',
        objectName: 'КНС-40',
        govCustomerName: 'Мосводоканал',
        configType: 'КНС',
        contactPerson: 'Петров Пётр Петрович',
        contactPhone: '+7 (900) 123-45-67',
        contactEmail: 'customer@marketplays.ru',
        status: 'published',
        moderationStatus: 'approved',
        publishedAt: '2024-01-15T14:20:00.000Z',
        kns: {
          capacity: '40',
          head: '20',
          workingPumps: '3',
          reservePumps: '1',
          stockPumps: '1',
          medium: 'Ливневые сточные воды',
          temperature: '15',
          explosionProof: false,
          inletDepth: '4.0',
          inletDiameter: '200',
          inletMaterial: 'сталь',
          inletDirection: '3',
          outletDepth: '2.5',
          outletDiameter: '150',
          outletMaterial: 'сталь',
          outletDirection: '6',
          outletCount: '2',
          stationDiameter: '3.0',
          stationHeight: '4.5',
          insulation: '1.5',
          motorStartMethod: 'soft',
          powerInputs: '2',
          cabinetLocation: 'УХЛ4',
        },
        knsExtras: {
          'Канальный измельчитель': true,
          'Шиберный затвор на подводящей трубе': true,
          'Расходомер на напорном трубопроводе': true,
          'Газоанализатор': true,
          'Диспетчеризация': true,
          'Наземный павильон': false,
          'Грузоподъемное устройство': true,
          'Колодец с задвижкой перед КНС': true,
          'Колодец с запорной арматурой после КНС': true,
        }
      },
      {
        id: 'REQ-2024-003',
        createdAt: '2024-03-05T09:15:00.000Z',
        customerEmail: 'customer@marketplays.ru',
        customerFullName: 'Петров Пётр Петрович',
        objectName: 'КНС-60',
        govCustomerName: 'Водоканал СПб',
        configType: 'КНС',
        contactPerson: 'Петров Пётр Петрович',
        contactPhone: '+7 (900) 123-45-67',
        contactEmail: 'customer@marketplays.ru',
        status: 'moderation', // На модерации
        moderationStatus: 'pending', // Ожидает проверки
        kns: {
          capacity: '60',
          head: '25',
          workingPumps: '2',
          reservePumps: '2',
          stockPumps: '0',
          medium: 'Хоз-бытовые сточные воды',
          temperature: '20',
          explosionProof: true,
          inletDepth: '4.5',
          inletDiameter: '250',
          inletMaterial: 'сталь',
          inletDirection: '6',
          outletDepth: '3.0',
          outletDiameter: '200',
          outletMaterial: 'сталь',
          outletDirection: '9',
          outletCount: '2',
          stationDiameter: '3.5',
          stationHeight: '5.0',
          insulation: '2.0',
          motorStartMethod: 'soft',
          powerInputs: '2',
          cabinetLocation: 'УХЛ1',
        },
        knsExtras: {
          'Канальный измельчитель': true,
          'Шиберный затвор на подводящей трубе': true,
          'Расходомер на напорном трубопроводе': true,
          'Газоанализатор': true,
          'Диспетчеризация': true,
          'Наземный павильон': true,
          'Грузоподъемное устройство': true,
          'Колодец с задвижкой перед КНС': true,
          'Колодец с запорной арматурой после КНС': true,
        }
      }
    ]
    saveAll(initialRequests)
    return initialRequests
  }
  return existing
}

// Инициализируем при первом импорте
initializeRequests()

// Получить все заявки
export function listAllRequests() {
  return loadAll().sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
}

// Получить заявки для конкретного заказчика
export function listRequestsForCustomerEmail(email) {
  const normalized = String(email || '')
    .trim()
    .toLowerCase()
  return loadAll()
    .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
  // .filter((r) => String(r.customerEmail || '').toLowerCase() === normalized)
}

// Получить заявки для поставщиков (только опубликованные)
export function listPublishedRequestsForSuppliers() {
  return loadAll()
    .filter((r) => r.status === 'published' && !r.archived)
    .sort((a, b) => (b.publishedAt || b.createdAt || '').localeCompare(a.publishedAt || a.createdAt || ''))
}

// Получить заявки на модерацию (для администратора)
export function listRequestsForModeration() {
  return loadAll()
    .filter((r) => r.status === 'moderation' && !r.archived)
    .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
}

// Получить заявку по ID
export function getRequestById(id) {
  const all = loadAll()
  return all.find((r) => r.id === id) ?? null
}

// Создать новую заявку (статус - на модерации)
export function createRequest(request) {
  const all = loadAll()

  // Проверяем, что заявка с таким ID еще не существует
  if (all.some(r => r.id === request.id)) {
    console.error('Заявка с таким ID уже существует')
    return null
  }

  // Устанавливаем статусы для новой заявки
  const newRequest = {
    ...request,
    status: 'moderation', // На модерации
    moderationStatus: 'pending', // Ожидает проверки
    createdAt: new Date().toISOString(),
    archived: false
  }

  all.push(newRequest)
  saveAll(all)
  return newRequest
}

// Обновить существующую заявку
export function updateRequest(id: string | number, updatedData: any) {
  const all = loadAll()
  const index = all.findIndex(r => r.id === id)

  if (index !== -1) {
    // Сохраняем исходные поля, которые не должны меняться
    const original = all[index]

    // Обновляем заявку, сохраняя важные поля
    all[index] = updatedData

    saveAll(all)
    return all[index]
  }

  console.error('Заявка с ID', id, 'не найдена')
  return null
}

// Опубликовать заявку (администратор)
export function publishRequest(id) {
  const all = loadAll()
  const index = all.findIndex(r => r.id === id)

  if (index !== -1) {
    all[index] = {
      ...all[index],
      status: 'published',
      moderationStatus: 'approved',
      publishedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    saveAll(all)
    return all[index]
  }

  console.error('Заявка с ID', id, 'не найдена')
  return null
}

// Отклонить заявку (администратор)
export function rejectRequest(id, reason) {
  const all = loadAll()
  const index = all.findIndex(r => r.id === id)

  if (index !== -1) {
    all[index] = {
      ...all[index],
      status: 'rejected',
      moderationStatus: 'rejected',
      rejectionReason: reason || 'Заявка отклонена',
      rejectedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    saveAll(all)
    return all[index]
  }

  console.error('Заявка с ID', id, 'не найдена')
  return null
}

// Отправить заявку на доработку (администратор)
export function requestRevision(id, comment) {
  const all = loadAll()
  const index = all.findIndex(r => r.id === id)

  if (index !== -1) {
    all[index] = {
      ...all[index],
      status: 'revision',
      moderationStatus: 'revision',
      revisionComment: comment || 'Требуется доработка',
      updatedAt: new Date().toISOString()
    }
    saveAll(all)
    return all[index]
  }

  console.error('Заявка с ID', id, 'не найдена')
  return null
}

// Отправить заявку на повторную модерацию (после доработки)
export function resubmitRequest(id) {
  const all = loadAll()
  const index = all.findIndex(r => r.id === id)

  if (index !== -1) {
    all[index] = {
      ...all[index],
      status: 'moderation',
      moderationStatus: 'pending',
      revisionComment: undefined,
      updatedAt: new Date().toISOString()
    }
    saveAll(all)
    return all[index]
  }

  console.error('Заявка с ID', id, 'не найдена')
  return null
}

// Удалить заявку
export function deleteRequest(id) {
  const all = loadAll()
  const index = all.findIndex(r => r.id === id)

  if (index !== -1) {
    const deleted = all[index]
    all.splice(index, 1)
    saveAll(all)
    return deleted
  }

  console.error('Заявка с ID', id, 'не найдена')
  return null
}

// Отправить заявку в архив
export function archiveRequest(id) {
  const all = loadAll()
  const index = all.findIndex(r => r.id === id)

  if (index !== -1) {
    all[index] = {
      ...all[index],
      archived: true,
      archivedAt: new Date().toISOString()
    }
    saveAll(all)
    return all[index]
  }

  console.error('Заявка с ID', id, 'не найдена')
  return null
}

// Восстановить заявку из архива
export function unarchiveRequest(id) {
  const all = loadAll()
  const index = all.findIndex(r => r.id === id)

  if (index !== -1) {
    all[index] = {
      ...all[index],
      archived: false,
      archivedAt: undefined
    }
    saveAll(all)
    return all[index]
  }

  console.error('Заявка с ID', id, 'не найдена')
  return null
}

// Получить статус заявки для отображения
export function getRequestStatusDisplay(request: any, userRole: Role | null = null) {
  if (request.archived) {
    return { text: 'В архиве', color: 'gray' }
  }

  // Для администратора
  if (userRole === Role.Admin) {
    switch (request.status) {
      case 'moderation':
        return { text: 'На модерации', color: 'orange' }
      case 'revision':
        return { text: 'На доработке', color: 'purple' }
      case 'rejected':
        return { text: 'Отклонена', color: 'red' }
      case 'published':
        return { text: 'Опубликована', color: 'green' }
      default:
        return { text: 'Черновик', color: 'gray' }
    }
  }

  // Для заказчика
  if (userRole === Role.Customer) {
    switch (request.status) {
      case 'moderation':
        return { text: 'На модерации', color: 'orange' }
      case 'revision':
        return { text: 'Требуется доработка', color: 'purple' }
      case 'rejected':
        return { text: 'Отклонена', color: 'red' }
      case 'published':
        return { text: 'Опубликована', color: 'green' }
      default:
        return { text: 'Черновик', color: 'gray' }
    }
  }

  // Для поставщика (видит только опубликованные)
  if (request.status === 'published') {
    return { text: 'Новая', color: 'blue' }
  }

  return { text: 'В архиве', color: 'gray' }
}