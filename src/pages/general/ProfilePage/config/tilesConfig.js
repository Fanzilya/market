// src/pages/ProfilePage/config/tilesConfig.js
export const getUserTiles = (user) => [
  {
    id: 'fullName',
    icon: 'user',
    label: 'ФИО',
    value: user.fullName,
    empty: !user.fullName
  },
  {
    id: 'email',
    icon: 'email',
    label: 'Email',
    value: user.email,
    empty: !user.email
  },
  {
    id: 'phone',
    icon: 'phone',
    label: 'Телефон',
    value: user.phone || '—',
    empty: !user.phone
  },
  {
    id: 'role',
    icon: 'role',
    label: 'Роль',
    value: user.roleLabel,
    empty: !user.roleLabel
  }
]

export const getCompanyTiles = (company) => [
  {
    id: 'companyName',
    icon: 'building',
    label: 'Наименование',
    value: company?.name || '—',
    empty: !company?.name
  },
  {
    id: 'shortName',
    icon: 'building',
    label: 'Краткое наименование',
    value: company?.shortName || '—',
    empty: !company?.shortName
  },
  {
    id: 'companyType',
    icon: 'building',
    label: 'Тип компании',
    value: company?.typeName || '—',
    empty: !company?.typeName
  },
  {
    id: 'inn',
    icon: 'document',
    label: 'ИНН',
    value: company?.inn || '—',
    empty: !company?.inn
  },
  {
    id: 'kpp',
    icon: 'document',
    label: 'КПП',
    value: company?.kpp || '—',
    empty: !company?.kpp
  },
  {
    id: 'ogrn',
    icon: 'document',
    label: 'ОГРН',
    value: company?.ogrn || '—',
    empty: !company?.ogrn
  },
  {
    id: 'legalAddress',
    icon: 'location',
    label: 'Юридический адрес',
    value: company?.legalAddress || '—',
    empty: !company?.legalAddress
  },
  {
    id: 'about',
    icon: 'info',
    label: 'О компании',
    value: company?.about || '—',
    empty: !company?.about
  }
]