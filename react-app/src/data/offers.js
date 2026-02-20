const OFFERS_KEY = 'marketplays_offers_v1'

function safeParse(raw, fallback) {
  try {
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function loadAll() {
  return safeParse(localStorage.getItem(OFFERS_KEY), [])
}

function saveAll(items) {
  localStorage.setItem(OFFERS_KEY, JSON.stringify(items))
}

export function listOffersByRequestId(requestId) {
  return loadAll()
    .filter((o) => o.requestId === requestId)
    .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''))
}

export function countOffersByRequestId(requestId) {
  return listOffersByRequestId(requestId).length
}

export function createOffer(offer) {
  const all = loadAll()
  all.push(offer)
  saveAll(all)
  return offer
}

