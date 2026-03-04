// src/data/requests.js

const REQUESTS_KEY = 'marketplays_requests_v1'

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
        customerEmail: 'customer@example.com',
        customerFullName: 'Анна Смирнова',
        objectName: 'КНС-25',
        govCustomerName: 'ГУИС',
        configType: 'КНС',
        contactPerson: 'Анна Смирнова',
        contactPhone: '+7 (900) 123-45-67',
        contactEmail: 'customer@example.com',
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
        customerEmail: 'customer@example.com',
        customerFullName: 'Анна Смирнова',
        objectName: 'КНС-40',
        govCustomerName: 'Мосводоканал',
        configType: 'КНС',
        contactPerson: 'Анна Смирнова',
        contactPhone: '+7 (900) 123-45-67',
        contactEmail: 'customer@example.com',
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
    .filter((r) => String(r.customerEmail || '').toLowerCase() === normalized)
    .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
}

// Получить заявку по ID
export function getRequestById(id) {
  const all = loadAll()
  return all.find((r) => r.id === id) ?? null
}

// Создать новую заявку
export function createRequest(request) {
  const all = loadAll()
  
  // Проверяем, что заявка с таким ID еще не существует
  if (all.some(r => r.id === request.id)) {
    console.error('Заявка с таким ID уже существует')
    return null
  }
  
  all.push(request)
  saveAll(all)
  return request
}

// Обновить существующую заявку
export function updateRequest(id, updatedData) {
  const all = loadAll()
  const index = all.findIndex(r => r.id === id)
  
  if (index !== -1) {
    // Сохраняем исходные поля, которые не должны меняться
    const original = all[index]
    
    // Обновляем заявку, сохраняя важные поля
    all[index] = {
      ...original,
      ...updatedData,
      id: original.id, // ID не меняем
      customerEmail: original.customerEmail, // Email заказчика не меняем
      customerFullName: original.customerFullName, // Имя заказчика не меняем
      createdAt: original.createdAt, // Дата создания не меняется
      updatedAt: new Date().toISOString(), // Добавляем дату обновления
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