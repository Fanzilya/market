export const IconAdminDashboard = (name: string) => {
    switch (name) {
        case 'applicationManagement':
            return (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#4A85F6" strokeWidth="2" />
                </svg>
            )
        case 'offerManagement':
            return (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path d="M20 14.66V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2H14L20 8V14.66Z" stroke="#4A85F6" strokeWidth="2" />
                </svg>
            )
        case 'userManagement':
            return (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <circle cx="9" cy="9" r="4" stroke="#4A85F6" strokeWidth="2" />
                    <path d="M3 18V17C3 13.7 5.7 11 9 11C12.3 11 15 13.7 15 17V18" stroke="#4A85F6" strokeWidth="2" />
                </svg>
            )
        case 'companyManagement':
            return (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="6" width="20" height="14" rx="2" stroke="#4A85F6" strokeWidth="2" />
                </svg>
            )
    }
}




