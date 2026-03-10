import Icon from "@/shared/ui-kits/Icon"

export const IconAdminDashboard = (name: string) => {
    switch (name) {
        case 'applicationManagement':
            return (
                <Icon name="requests"/>
            )
        case 'offerManagement':
            return (
                <Icon name="requests"/>
            )
        case 'userManagement':
            return (
                <Icon name="profile"/>
            )
        case 'companyManagement':
            return (
                <Icon name="companies"/>
            )
    }
}




