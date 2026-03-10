import { IconName } from "@/shared/ui-kits/Icon/src/type";

export const cardsActions: {
    name: string,
    link: string,
    iconName: IconName,
}[] = [
        {
            name: 'Управление заявками',
            link: '/admin/requests',
            iconName: 'requests',
        },
        {
            name: 'Управление предложениями',
            link: '/admin/offers',
            iconName: 'offers',
        },
        {
            name: 'Управление пользователями',
            link: '/admin/users',
            iconName: 'users',
        },
        {
            name: 'Управление компаниями',
            link: '/admin/companies',
            iconName: 'companies',
        },
    ]

