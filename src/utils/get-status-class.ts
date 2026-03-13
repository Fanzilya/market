// src/utils/get-status-class.ts
export const getStatusClass = (status: string): string => {
  const statusMap: Record<string, string> = {
    'moderation': 'statusModeration',
    'revision': 'statusRevision',
    'rejected': 'statusRejected',
    'published': 'statusPublished',
    'success': 'statusSuccess',
    'draft': 'statusDraft',
    'archived': 'statusArchived',
  }
  
  return statusMap[status] || ''
}