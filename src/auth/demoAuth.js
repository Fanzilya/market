const STORAGE_KEY = 'marketplays_demo_user_v1'
const PASSWORD_OVERRIDES_KEY = 'marketplays_password_overrides_v1'

export const DEMO_USERS = [
  {
    role: 'customer',
    roleLabel: 'Заказчик (проектировщик)',
    fullName: 'Петров Пётр Петрович',
    email: 'customer@marketplays.ru',
    password: 'Customer123',
    phone: '+7 (900) 000-00-00',
  },
  {
    role: 'supplier',
    roleLabel: 'Исполнитель (поставщик)',
    fullName: 'Иванов Иван Иванович',
    email: 'supplier@marketplays.ru',
    password: 'Supplier123',
    phone: '+7 (900) 111-11-11',
    company: {
      name: 'ООО «СтройИнжПроект»',
      shortName: 'СтройИнжПроект',
      typeId: 1,
      typeName: 'Проектно-поставочная организация',
      inn: '7707083893',
      kpp: '770701001',
      ogrn: '1027700132195',
      legalAddress: '109012, г. Москва, ул. Примерная, д. 1',
      about:
        'Проектирование и поставка инженерных решений для КНС. Опыт 10+ лет, работаем по всей РФ.',
    },
  },
  {
    role: 'supplier',
    roleLabel: 'Исполнитель (поставщик)',
    fullName: 'Иванов Иван Иванович',
    email: 'supplier4@marketplays.ru',
    password: 'Supplier1234',
    phone: '+7 (900) 111-11-11',
    company: {
      name: 'ООО «Название»',
      shortName: 'Название',
      typeId: 1,
      typeName: 'Проектно-поставочная организация',
      inn: '11111111111',
      kpp: '770701001',
      ogrn: '1027700132195',
      legalAddress: '109012, г. Москва, ул. Примерная, д. 1',
      about:
        'Проектирование и поставка инженерных решений для КНС. Опыт 10+ лет, работаем по всей РФ.',
    },
  },
]

function loadPasswordOverrides() {
  try {
    const raw = localStorage.getItem(PASSWORD_OVERRIDES_KEY)
    if (!raw) return {}
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

function savePasswordOverrides(map) {
  localStorage.setItem(PASSWORD_OVERRIDES_KEY, JSON.stringify(map))
}

export function signInDemo({ email, password }) {
  const normalizedEmail = String(email || '')
    .trim()
    .toLowerCase()
  const rawPassword = String(password || '')

  const baseUser = DEMO_USERS.find(
    (u) => u.email.toLowerCase() === normalizedEmail,
  )

  if (!baseUser) return null

  const overrides = loadPasswordOverrides()
  const expectedPassword = overrides[normalizedEmail] || baseUser.password

  if (rawPassword !== expectedPassword) return null

  const sessionUser = {
    role: baseUser.role,
    roleLabel: baseUser.roleLabel,
    fullName: baseUser.fullName,
    email: baseUser.email,
    phone: baseUser.phone ?? '',
    company: baseUser.company ?? null,
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser))
  return sessionUser
}

export function getSessionUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function signOut() {
  localStorage.removeItem(STORAGE_KEY)
}

export function changePasswordDemo({ email, currentPassword, newPassword }) {
  const normalizedEmail = String(email || '')
    .trim()
    .toLowerCase()
  const current = String(currentPassword || '')
  const next = String(newPassword || '')

  const baseUser = DEMO_USERS.find(
    (u) => u.email.toLowerCase() === normalizedEmail,
  )
  if (!baseUser) {
    return { ok: false, message: 'Пользователь не найден' }
  }

  const overrides = loadPasswordOverrides()
  const expectedPassword = overrides[normalizedEmail] || baseUser.password

  if (current !== expectedPassword) {
    return { ok: false, message: 'Текущий пароль указан неверно' }
  }
  if (next.length < 6) {
    return { ok: false, message: 'Новый пароль должен быть не короче 6 символов' }
  }

  overrides[normalizedEmail] = next
  savePasswordOverrides(overrides)

  return { ok: true }
}


