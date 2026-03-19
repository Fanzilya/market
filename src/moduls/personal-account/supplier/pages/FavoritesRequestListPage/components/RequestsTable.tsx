// src/pages/SupplierPage/components/RequestsTable.tsx
import DataTable from '@/shared/components/DataTable'
import { createColumns } from '../config/tableColumns'
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


  return (
    <DataTable
      columns={columns}
      data={requests}
      sortConfig={sortConfig}
      onSort={onSort}
    />
  )
}