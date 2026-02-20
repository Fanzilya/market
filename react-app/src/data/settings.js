const SETTINGS_KEY = 'marketplays_user_settings_v1'

function safeParse(raw, fallback) {
  try {
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function loadAll() {
  return safeParse(localStorage.getItem(SETTINGS_KEY), {})
}

function saveAll(map) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(map))
}

const DEFAULT_SETTINGS = {
  notifications: {
    email: true,
    sms: false,
    inApp: true,
  },
}

export function getUserSettings(email) {
  const normalized = String(email || '')
    .trim()
    .toLowerCase()
  const all = loadAll()
  const existing = all[normalized]
  if (!existing) return { ...DEFAULT_SETTINGS }
  return {
    ...DEFAULT_SETTINGS,
    ...existing,
    notifications: {
      ...DEFAULT_SETTINGS.notifications,
      ...(existing.notifications || {}),
    },
  }
}

export function updateUserSettings(email, partial) {
  const normalized = String(email || '')
    .trim()
    .toLowerCase()
  const all = loadAll()
  const current = getUserSettings(email)
  const next = {
    ...current,
    ...partial,
    notifications: {
      ...current.notifications,
      ...(partial.notifications || {}),
    },
  }
  all[normalized] = next
  saveAll(all)
  return next
}

