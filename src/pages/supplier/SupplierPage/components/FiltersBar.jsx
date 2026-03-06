// src/pages/SupplierPage/components/FiltersBar.jsx
import SearchBar from '../../../../components/SearchBar.jsx'
import styles from '../SupplierPage.module.css'

export default function FiltersBar({ filters, onFilterChange, regions, types }) {
  const handleChange = (key, value) => {
    onFilterChange(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className={styles.filtersSection}>
      <div className={styles.searchWrapper}>
        <SearchBar
          value={filters.searchQuery}
          onChange={(value) => handleChange('searchQuery', value)}
          placeholder="Поиск по номеру, названию объекта, заказчику..."
        />
      </div>

      <div className={styles.filterGroup}>
        <select
          className={styles.filterSelect}
          value={filters.region}
          onChange={(e) => handleChange('region', e.target.value)}
        >
          <option value="all">Все регионы</option>
          {regions.filter(r => r !== 'all').map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>

        <select
          className={styles.filterSelect}
          value={filters.type}
          onChange={(e) => handleChange('type', e.target.value)}
        >
          <option value="all">Все типы</option>
          {types.filter(t => t !== 'all').map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <select
          className={styles.filterSelect}
          value={filters.status}
          onChange={(e) => handleChange('status', e.target.value)}
        >
          <option value="all">Все статусы</option>
          <option value="new">Новые</option>
          <option value="responded">Откликнулся</option>
        </select>
      </div>
    </div>
  )
}