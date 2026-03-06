// src/pages/SupplierPage/components/RequestsTable.jsx
import DataTable from '../../../../components/DataTable.jsx'
import { createColumns } from '../config/tableColumns.jsx'
import styles from '../SupplierPage.module.css'

export default function RequestsTable({
  requests,
  myOffers,
  favoriteRequests,
  sortConfig,
  onSort,
  onToggleFavorite,
  onViewRequest
}) {
  const columns = createColumns({
    myOffers,
    favoriteRequests,
    onToggleFavorite,
    onViewRequest
  })

  return (
    <DataTable
      columns={columns}
      data={requests}
      sortConfig={sortConfig}
      onSort={onSort}
    />
  )
}