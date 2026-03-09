// components/DataTable.tsx
import styles from './DataTable.module.css'

export default function DataTable({ columns, data, sortConfig, onSort }) {
  const handleSort = (key) => {
    if (onSort) {
      onSort(key)
    }
  }

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {columns.map(column => (
            <th
              key={column.key}
              className={`${styles.th} ${column.sortable ? styles.sortable : ''}`}
              style={{ width: column.width }}
              onClick={() => column.sortable && handleSort(column.key)}
            >
              <div className={styles.thContent}>
                {column.header}
                {column.sortable && sortConfig.key === column.key && (
                  <span className={styles.sortIcon}>
                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                  </span>
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={row.id || index} className={styles.tr}>
            {columns.map(column => (
              <td key={column.key} className={styles.td}>
                {column.render ? column.render(row) : row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}