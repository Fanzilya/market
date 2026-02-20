const REQUESTS_KEY = 'marketplays_requests_v1'

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

export function listRequestsForCustomerEmail(email) {
  const normalized = String(email || '')
    .trim()
    .toLowerCase()
  return loadAll()
    .filter((r) => String(r.customerEmail || '').toLowerCase() === normalized)
    .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
}

export function listAllRequests() {
  return loadAll().sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
}

export function getRequestById(id) {
  const all = loadAll()
  return all.find((r) => r.id === id) ?? null
}

export function createRequest(request) {
  const all = loadAll()
  all.push(request)
  saveAll(all)
  return request
}

