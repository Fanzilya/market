// src/pages/SupplierPage/types/index.ts
export interface Request {
  id: string
  objectName?: string
  customerName?: string
  configTypeId?: string
  offers?: any[]
  createdAt?: string
  status?: string
  statusDisplay?: string
  region?: string
  description?: string
  [key: string]: any
}

export interface RequestsGridProps {
  requests: Request[]
  favoriteRequests: Set<string>
  onToggleFavorite: (requestId: string) => void
  onRequestClick: (requestId: string) => void
  freeClicksLeft?: number
}