export const getIcon = (type: string) => {
    switch (type) {
        case 'new_offer':
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: '#10B981' }}>
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" />
                </svg>
            )
        case 'new_request':
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: '#4A85F6' }}>
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" />
                </svg>
            )
        case 'offer_updated':
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: '#F59E0B' }}>
                    <path d="M20 14.66V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2H14L20 8V14.66Z" stroke="currentColor" strokeWidth="2" />
                    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" />
                </svg>
            )
        case 'request_updated':
            return (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: '#8B5CF6' }}>
                    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" />
                    <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" />
                </svg>
            )
        default:
            return null
    }
}