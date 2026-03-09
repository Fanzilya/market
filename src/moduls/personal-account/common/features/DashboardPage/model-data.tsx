import { Role } from "@/entities/user/role"
import { useAuth } from "@/features/user/context/context"
import { listAllRequests, listRequestsForCustomerEmail } from "@/shared/data/requests"
import { useMemo } from "react"


export interface DashboardData {
    activity: Array<{
        icon: string;
        color: string;
        title: string;
        time: string;
    }>;
    countOffersForRequest: (requestId: string) => number;
    customerRequests: any[];
    isCustomer: boolean;
    isSupplier: boolean;
    services: any;
    supplierOffers: any[];
    supplierRequests: any[];
}

export const getDashboardData = (): DashboardData => {
    const { user } = useAuth()

    const countOffersForRequest = (requestId) => {
        return 0
    }

    // Получаем реальные данные для статистики
    const customerRequests = (!user?.email || user.role !== Role.Customer) ? [] : listRequestsForCustomerEmail(user.email)
    const supplierRequests = (user?.role !== Role.Supplier) ? [] : listAllRequests()
    const supplierOffers: any = []


    // Определяем, какой контент показывать в зависимости от роли
    const isCustomer = user?.role === Role.Customer
    const isSupplier = user?.role === Role.Supplier

    // Сервисы для заказчика
    const customerServices = [
        {
            category: 'Заявки',
            title: 'Мои заявки',
            description: 'Создавайте и управляйте заявками на инженерное оборудование. Получайте коммерческие предложения от исполнителей.',
            icon: 'requests',
            color: '#1877F2',
            actions: [
                { label: 'Перейти к заявкам', type: 'primary', link: '/customer' },
                { label: 'Создать заявку', type: 'secondary', link: '/customer/request/new' }
            ],
            stats: {
                'Всего': customerRequests.length,
                'С КП': customerRequests.filter(r => countOffersForRequest(r.id) > 0).length
            }
        },
        {
            category: 'Аналитика',
            title: 'Конъюнктурный анализ',
            description: 'Сравнивайте коммерческие предложения, выбирайте оптимальные решения и формируйте отчёты для экспертизы.',
            icon: 'analysis',
            color: '#10B981',
            actions: [
                { label: 'Перейти к анализу', type: 'secondary', link: '/customer/analysis' }
            ],
            stats: {
                'Предложений': '0',
                'Анализов': '0'
            }
        },
        {
            category: 'Сервисы',
            title: 'Каталог оборудования',
            description: 'Просматривайте каталог производителей, техническую информацию и актуальные цены.',
            icon: 'catalog',
            color: '#F59E0B',
            actions: [
                { label: 'Открыть каталог', type: 'secondary', link: '/catalog' }
            ],
            badges: ['КНС', 'ЛОС', 'Насосы', 'Трубопроводы']
        }
    ]

    // Сервисы для исполнителя
    const supplierServices = [
        {
            category: 'Заявки',
            title: 'Доступные заявки',
            description: 'Просматривайте заявки заказчиков, изучайте технические требования и создавайте коммерческие предложения.',
            icon: 'requests',
            color: '#1877F2',
            actions: [
                { label: 'Перейти к заявкам', type: 'primary', link: '/supplier' }
            ],
            stats: {
                'Новых': supplierRequests.length,
                'Активных': supplierRequests.length
            },
            extraAction: {
                label: 'Бесплатных кликов: 5',
                link: '/billing'
            }
        },
        {
            category: 'Предложения',
            title: 'Мои коммерческие предложения',
            description: 'Отслеживайте статусы отправленных предложений, просматривайте историю откликов.',
            icon: 'offers',
            color: '#10B981',
            actions: [
                { label: 'Мои предложения', type: 'secondary', link: '/supplier/offers' }
            ],
            stats: {
                'Отправлено': supplierOffers.length,
                'Просмотрено': '0'
            }
        },
        {
            category: 'Инструменты',
            title: 'Подбор оборудования',
            description: 'Используйте сервисы для подбора материалов и комплектации инженерного оборудования.',
            icon: 'tools',
            color: '#F59E0B',
            actions: [
                { label: 'Подобрать материалы', type: 'secondary', link: '/supplier/materials' }
            ],
            badges: ['КНС', 'ЛОС', 'Насосные группы']
        }
    ]

    // Общие сервисы для всех
    const commonServices = [
        {
            category: 'Профиль',
            title: 'Настройки аккаунта',
            description: 'Управляйте данными профиля, настройками уведомлений и безопасностью.',
            icon: 'profile',
            color: '#8B5CF6',
            actions: [
                { label: 'Профиль', type: 'secondary', link: user!.role == Role.Customer ? '/customer/profile' : '/supplier/profile' },
                { label: 'Настройки', type: 'secondary', link: user!.role == Role.Customer ? '/customer/settings' : '/supplier/settings' }
            ]
        }
    ]

    // Формируем итоговый список сервисов на основе роли
    const services = isCustomer ? [...customerServices, ...commonServices] : (isSupplier ? [...supplierServices, ...commonServices] : [...commonServices])


    // Активность для заказчика
    const customerActivity = [
        {
            icon: 'requests',
            color: '#1877F2',
            title: customerRequests.length > 0 ? 'Последняя заявка' : 'Заявок пока нет',
            time: customerRequests.length > 0
                ? new Date(customerRequests[0]?.createdAt).toLocaleDateString('ru-RU')
                : 'Создайте первую заявку'
        },
        {
            icon: 'offers',
            color: '#10B981',
            title: 'Коммерческие предложения',
            time: '0 откликов'
        },
        {
            icon: 'login',
            color: '#F59E0B',
            title: 'Последний вход',
            time: 'Только что'
        }
    ]

    // Активность для исполнителя
    const supplierActivity = [
        {
            icon: 'requests',
            color: '#1877F2',
            title: 'Доступно заявок',
            time: `${supplierRequests.length} новых заявок`
        },
        {
            icon: 'offers',
            color: '#10B981',
            title: 'Мои отклики',
            time: `${supplierOffers.length} отправлено`
        },
        {
            icon: 'login',
            color: '#F59E0B',
            title: 'Последний вход',
            time: 'Только что'
        }
    ]

    // Выбираем активность по роли
    const activity = isCustomer ? customerActivity : supplierActivity

    return {
        activity,
        countOffersForRequest,
        customerRequests,
        isCustomer,
        isSupplier,
        services,
        supplierOffers,
        supplierRequests
    };

}