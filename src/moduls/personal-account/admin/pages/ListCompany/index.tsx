// src/pages/AdminUsersPage.tsx
import { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './ListUsers.module.css'
import { useAuth } from '@/features/user/context/context'
import { Role } from '@/entities/user/role'
import { Search } from '@/shared/ui-kits/Input/input-search'
import { useUsersListData } from '../../features/ListUsers/useUsersListData'
import Loader from '@/shared/ui-kits/loader/loader'
import { useListCompanyData } from '../../features/ListCompany/useListCompanyData'
import { useListCompanyPageUI } from '../../features/ListCompany/useListCompanyPageUI'

export const ListCompany = () => {
  const navigate = useNavigate()


  const { list, isLoading, isError, errors, refetchAll } = useListCompanyData()
  const { searchTerm, setSearchTerm, getFiltered, statusFilter, setStatusFilter } = useListCompanyPageUI()


  const filteredList = useMemo(() => getFiltered(list), [list, statusFilter, getFiltered, searchTerm])


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

        {/* <select
          className={styles.filterSelect}
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">Все роли</option>
          <option value="admin">Администраторы</option>
          <option value="customer">Заказчики</option>
          <option value="supplier">Поставщики</option>
        </select> */}
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>

            {/* "fullCompanyName": "Тестик компания 2",
        "shortCompanyName": "Тестик компания 2",
        "inn": "321321",
        "kpp": "321321",
        "jurAdress": "123123",
        "logoFileId": null,
        "logoImage": null,
        "companyTypeId": "019cdd76-a865-737a-a415-e9256c66b9b7",
        "companyType": null,
        "companyUsersLinks": null,
        "companyOffers": null,
        "id": "019cf221-3daf-7dd0-b5aa-ecde683972a0" */}

            <tr>
              <th>№</th>
              <th>Наименование</th>
              <th>ИНН</th>
              <th>КПП</th>
              <th>Адрес</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? <Loader /> :
              filteredList.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.shortCompanyName}</td>
                  <td>{item.inn}</td>
                  <td>{item.kpp}</td>
                  <td>{item.jurAdress}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}