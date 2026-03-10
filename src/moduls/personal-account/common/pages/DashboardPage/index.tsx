// pages/DashboardPage.tsx
import { Link, useNavigate } from 'react-router-dom'
import NotificationBell from '@/shared/components/NotificationBell'
import { Role } from '@/entities/user/role'
import styles from './DashboardPage.module.css'
import { useAuth } from '@/features/user/context/context'
import { getIcon } from '../../features/DashboardPage/components'
import { getDashboardData } from '../../features/DashboardPage/model-data'
import Icon from '@/shared/ui-kits/Icon'





export const DashboardPage = () => {
    const navigate = useNavigate()
    const { user } = useAuth()

    const { activity, countOffersForRequest, customerRequests, isCustomer, isSupplier, services, supplierOffers, supplierRequests } = getDashboardData()


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

                {/* Правый блок со статистикой и уведомлениями */}
                <div className={styles.headerRight}>
                    {/* Статистика в зависимости от роли */}
                    {isCustomer && (
                        <div className={styles.headerStats}>
                            <div className={styles.headerStat}>
                                <span className={styles.headerStatValue}>{customerRequests.length}</span>
                                <span className={styles.headerStatLabel}>Всего заявок</span>
                            </div>
                            <div className={styles.headerStatDivider}></div>
                            <div className={styles.headerStat}>
                                <span className={styles.headerStatValue}>
                                    {customerRequests.filter(r => countOffersForRequest(r.id) > 0).length}
                                </span>
                                <span className={styles.headerStatLabel}>С КП</span>
                            </div>
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
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#1877F2" strokeWidth="2" />
                        <path d="M12 6V12L16 14" stroke="#1877F2" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <div className={styles.infoBannerContent}>
                        <span className={styles.infoBannerTitle}>У вас 5 бесплатных просмотров</span>
                        <span className={styles.infoBannerText}>После использования каждый просмотр заявки будет стоить 100 ₽</span>
                    </div>
                    <button className={styles.infoBannerButton} onClick={() => navigate('/billing')}>
                        Пополнить счет
                    </button>
                </div>
            )}

            {/* Сетка сервисов */}
            <div className={styles.servicesGrid}>
                {services.map((service, index) => (
                    <div
                        key={index}
                        className={styles.serviceCard}
                        style={{ '--card-accent': service.color }}
                    >
                        <div className={styles.cardHeader}>
                            <div className={styles.cardCategory}>{service.category}</div>
                            <div className={styles.cardIcon} style={{ color: service.color }}>
                                {getIcon(service.icon)}
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

            {/* Блок с активностью */}
            <div className={styles.activitySection}>
                <h2 className={styles.sectionTitle}>Недавняя активность</h2>
                <div className={styles.activityGrid}>
                    {activity.map((item, index) => (
                        <div key={index} className={styles.activityCard}>
                            <div className={styles.activityIcon} style={{ background: item.color }}>
                                <Icon name={item.icon} color='white' width={20} height={20} />
                            </div>
                            <div className={styles.activityContent}>
                                <span className={styles.activityTitle}>{item.title}</span>
                                <span className={styles.activityTime}>{item.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Рекомендации в зависимости от роли */}
            {isCustomer && customerRequests.length === 0 && (
                <div className={styles.recommendationCard}>
                    <h3 className={styles.recommendationTitle}>Начните работу с платформой</h3>
                    <p className={styles.recommendationText}>
                        Создайте первую заявку на инженерное оборудование и получите коммерческие предложения от проверенных исполнителей.
                    </p>
                    <Link
                        className={styles.recommendationButton}
                        to={'/customer/request/new'}
                    >
                        Создать заявку
                    </Link>
                </div>
            )}

            {isSupplier && supplierRequests.length === 0 && (
                <div className={styles.recommendationCard}>
                    <h3 className={styles.recommendationTitle}>Начните получать заказы</h3>
                    <p className={styles.recommendationText}>
                        Просматривайте актуальные заявки заказчиков и создавайте коммерческие предложения. Используйте бесплатные просмотры.
                    </p>
                    <button
                        className={styles.recommendationButton}
                        onClick={() => navigate('/supplier')}
                    >
                        Перейти к заявкам
                    </button>
                </div>
            )}
        </>
    )
}