// pages/DashboardPage.tsx
import { Link, useNavigate } from 'react-router-dom'
import NotificationBell from '@/shared/components/NotificationBell'
import { Role } from '@/entities/user/role'
import styles from './DashboardPage.module.css'
import { useAuth } from '@/features/user/context/context'
import { getIcon } from '../../features/DashboardPage/components'
import { getDashboardData } from '../../features/DashboardPage/model-data'
import Icon from '@/shared/ui-kits/Icon'
import { dashboardModel } from '../../features/DashboardPage/dashboard-model'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

export const DashboardPage = observer(() => {
    const navigate = useNavigate()
    const { user } = useAuth()

    const {
        isCustomer,
        isSupplier,
        services,
        supplierOffers,
        supplierRequests
    } = getDashboardData()

    const { init, count, isLoader } = dashboardModel

    useEffect(() => {
        if (user?.role == Role.Customer) {
            init(user?.id)
        }
    }, [])



    return (
        <>
            {/* Шапка */}
            <div className={styles.header}>
                <div>
                    <h1 className={styles.pageTitle}>Личный кабинет</h1>
                    <div className={styles.userGreeting}>
                        <span className={styles.userName}>{user?.fullName}</span>
                        <span className={styles.userRoleBadge}>
                            {user?.role === Role.Customer ? 'Заказчик' : 'Исполнитель'}
                        </span>
                    </div>
                </div>

                <div className={styles.headerRight}>
                    {/* Статистика в зависимости от роли */}
                    {isCustomer && !isLoader && (
                        <div className={styles.headerStats}>
                            <div className={styles.headerStat}>
                                <span className={styles.headerStatValue}>{count}</span>
                                <span className={styles.headerStatLabel}>Всего заявок</span>
                            </div>
                            <div className={styles.headerStatDivider}></div>
                            {/* <div className={styles.headerStat}>
                                <span className={styles.headerStatValue}>
                                    {customerRequests.filter(r => countOffersForRequest(r.id) > 0).length}
                                </span>
                                <span className={styles.headerStatLabel}>С КП</span>
                            </div> */}
                        </div>
                    )}

                    {isSupplier && (
                        <div className={styles.headerStats}>
                            <div className={styles.headerStat}>
                                <span className={styles.headerStatValue}>{supplierRequests.length}</span>
                                <span className={styles.headerStatLabel}>Доступно заявок</span>
                            </div>
                            <div className={styles.headerStatDivider}></div>
                            <div className={styles.headerStat}>
                                <span className={styles.headerStatValue}>{supplierOffers.length}</span>
                                <span className={styles.headerStatLabel}>Мои отклики</span>
                            </div>
                        </div>
                    )}

                    {/* Уведомления */}
                    <NotificationBell user={user} />
                </div>
            </div>

            {/* Информационный блок для исполнителя о бесплатных кликах */}
            {isSupplier && (
                <div className={styles.infoBanner}>
                    <Icon name='clock' width={24} hanging={24} color='#1877F2' />
                    <div className={styles.infoBannerContent}>
                        <span className={styles.infoBannerTitle}>У вас 5 бесплатных просмотров</span>
                        <span className={styles.infoBannerText}>После использования каждый просмотр заявки будет стоить 100 ₽</span>
                    </div>
                    <button className={styles.infoBannerButton} onClick={() => navigate('/supplier/balance')}>
                        Пополнить счет
                    </button>
                </div>
            )}

            {/* Сетка сервисов */}
            <div className={styles.servicesGrid}>
                {services.map((service, index) => (

                    <div key={index} className={styles.serviceCard} style={{ '--card-accent': service.color }}>

                        <div className={styles.cardHeader}>
                            <div className={styles.cardCategory}>{service.category}</div>
                            <div className={styles.cardIcon} style={{ color: service.color }}>
                                <Icon name={service.icon} height="100%" width="100%" className='p-1.5 max-h-[50px] max-w-[50px]' />
                            </div>
                        </div>

                        <h3 className={styles.cardTitle}>{service.title}</h3>
                        <p className={styles.cardDescription}>{service.description}</p>

                        {service.stats && (
                            <div className={styles.cardStats}>
                                {Object.entries(service.stats).map(([key, value]) => (
                                    <div key={key} className={styles.stat}>
                                        <span className={styles.statNumber}>{value}</span>
                                        <span className={styles.statKey}>{key}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {service.badges && (
                            <div className={styles.cardBadges}>
                                {service.badges.map((badge, i) => (
                                    <span key={i} className={styles.badge}>{badge}</span>
                                ))}
                            </div>
                        )}

                        <div className={styles.cardActions}>
                            {service.actions.map((action, i) => (
                                <button
                                    key={i}
                                    className={`${styles.actionButton} ${styles[action.type]}`}
                                    onClick={() => navigate(action.link)}
                                >
                                    {action.label}
                                    {action.type === 'secondary' && (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                </button>
                            ))}
                        </div>

                        {service.extraAction && (
                            <button
                                className={styles.extraAction}
                                onClick={() => navigate(service.extraAction.link)}
                            >
                                {service.extraAction.label}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </>
    )
})