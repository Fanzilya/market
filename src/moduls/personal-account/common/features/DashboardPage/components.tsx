export const getIcon = (iconName: string) => {
    const icons = {
        requests: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        analysis: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M21 21H4V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M7 15L10 11L13 14L18 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        catalog: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M8 7H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M8 17H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        offers: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        tools: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M14.7 6.3C15.1 5.9 15.5 5.6 16 5.4C16.5 5.1 17 5 17.5 5C18.4 5 19.2 5.3 19.9 5.9L16 9.8L17.5 11.5L21.4 7.6C22 8.3 22.3 9.1 22.3 10C22.3 11.4 21.8 12.5 20.7 13.6C19.6 14.7 18.5 15.2 17.2 15.2C16.4 15.2 15.7 15 14.9 14.7L6.7 22.9C6.1 23.5 5.4 23.8 4.6 23.8C3.8 23.8 3.1 23.5 2.5 22.9C1.9 22.3 1.6 21.6 1.6 20.8C1.6 20 1.9 19.3 2.5 18.7L10.7 10.5C10.3 9.6 10.1 8.7 10.1 7.8C10.1 6.4 10.6 5.2 11.7 4.1C12.8 3 14 2.5 15.4 2.5C16.2 2.5 17 2.7 17.8 3.1L14 6.9L14.7 6.3Z" stroke="currentColor" strokeWidth="2" />
            </svg>
        ),
        profile: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
            </svg>
        ),
        login: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        )
    }
    return icons[iconName] || icons.requests
}