// src/pages/AdminUsersPage.tsx
import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './ListUsers.module.css'
import { useAuth } from '@/features/user/context/context'
import { Role, RoleIds, RoleName, RoleStyle } from '@/entities/user/role'
import { Search } from '@/shared/ui-kits/Input/input-search'
import { useUsersListData } from '../../features/ListUsers/useUsersListData'
import Loader from '@/shared/ui-kits/loader/loader'
import { useUsersListPageUI } from '../../features/ListUsers/useUsersListPageUI'
import { getObjectKeysList } from '@/utils/get-object-keys-list'

export const AdminUsersPage = () => {
  const navigate = useNavigate()


  const { list, isLoading } = useUsersListData()
  const { searchTerm, setSearchTerm, getFiltered, statusFilter, setStatusFilter } = useUsersListPageUI()

  const filteredList = useMemo(() =>
    getFiltered(list),
    [list, statusFilter, getFiltered, searchTerm]
  )


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
          <Search value={searchTerm} onChange={setSearchTerm} placeholder='Поиск по имени или email...' />
        </div>

        <select className={styles.filterSelect} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option
            key={10}
            value={"all"}
            className="py-2 text-gray-700"
          >
            Все
          </option>

          <option
            key={1}
            value={RoleIds.Admin}
            className="py-2 text-gray-700"
          >
            {RoleName[RoleIds.Admin]}
          </option>
          <option
            key={2}
            value={RoleIds.Customer}
            className="py-2 text-gray-700"
          >
            {RoleName[RoleIds.Customer]}
          </option>
          <option
            key={3}
            value={RoleIds.Supplier}
            className="py-2 text-gray-700"
          >
            {RoleName[RoleIds.Supplier]}
          </option>

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
              <th>Почта</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? <Loader /> :
              filteredList.map((user, index) => (
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
                  <td className='flex justify-center'>
                    <span className={`${styles.roleBadge} ${RoleStyle[user.roleId]}`}>
                      {RoleName[user.roleId]}
                    </span>
                  </td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.email || '—'}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}




// {/* Пользователи */}
// {activeTab === 'users' && (
//   <div className={styles.tableContainer}>
//     <table className={styles.table}>
//       <thead>
//         <tr>
//           <th className={styles.th}>Пользователь</th>
//           <th className={styles.th}>Email</th>
//           <th className={styles.th}>Роль</th>
//           <th className={styles.th}>Телефон</th>
//           <th className={styles.th}>Компания</th>
//         </tr>
//       </thead>
//       <tbody>
//         {users.map((user, index) => (
//           <tr key={index} className={styles.tr}>
//             <td className={styles.td}>
//               <div className={styles.userCell}>
//                 <div className={styles.userAvatar}>
//                   {user.fullName?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
//                 </div>
//                 <span>{user.fullName}</span>
//               </div>
//             </td>
//             <td className={styles.td}>{user.email}</td>
//             <td className={styles.td}>
//               <span className={`${styles.roleBadge} ${user.role === 'admin' ? styles.roleAdmin : user.role === 'customer' ? styles.roleCustomer : styles.roleSupplier}`}>
//                 {user.roleLabel}
//               </span>
//             </td>
//             <td className={styles.td}>{user.phone}</td>
//             <td className={styles.td}>{user.company?.name || '—'}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// )}