// src/pages/AdminUsersPage.tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './AdminUsersPage.module.css'
import { useAuth } from '@/features/user/context/context'
import { Role } from '@/entities/user/role'

export const AdminUsersPage = () => {
  const { user, getAllUsers } = useAuth()
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(false)
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    setDarkMode(savedTheme === 'dark')
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  useEffect(() => {
    setUsers(getAllUsers())
  }, [])

  const filteredUsers = users.filter(u => {
    const matchesSearch =
      u.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase())

    if (roleFilter === 'all') return matchesSearch
    return matchesSearch && u.role === roleFilter
  })

  if (!user || user.role !== Role.Admin) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <h2>Доступ запрещен</h2>
          <button onClick={() => navigate('/')}>На главную</button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Пользователи</h1>
        <div className={styles.breadcrumbs}>
          <span className={styles.breadcrumb} onClick={() => navigate('/admin')}>Главная</span>
          <span className={styles.separator}>›</span>
          <span className={styles.current}>Пользователи</span>
        </div>
      </div>

      <div className={styles.actionBar}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Поиск по имени или email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <select
          className={styles.filterSelect}
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">Все роли</option>
          <option value="admin">Администраторы</option>
          <option value="customer">Заказчики</option>
          <option value="supplier">Поставщики</option>
        </select>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Пользователь</th>
              <th>Email</th>
              <th>Роль</th>
              <th>Телефон</th>
              <th>Компания</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>
                  <div className={styles.userCell}>
                    <div className={styles.userAvatar}>
                      {user.fullName?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                    </div>
                    <span>{user.fullName}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`${styles.roleBadge} ${styles[`role${user.role}`]}`}>
                    {user.roleLabel}
                  </span>
                </td>
                <td>{user.phone}</td>
                <td>{user.company?.name || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}