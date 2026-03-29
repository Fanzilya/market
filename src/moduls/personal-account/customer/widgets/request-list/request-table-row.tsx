import { OfferFull } from "@/entities/offer/type";
import { RequestStatus, RequestStatusTranslations } from "@/entities/request/config";
import { getStatusClass, getStatusText } from "@/entities/request/functions";
import { IRequest, RequestRes } from "@/entities/request/type";
import { Role } from "@/entities/user/role";
import { useAuth } from "@/features/user/context/context";
import { PlusIcon, ViewIcon } from "@/moduls/personal-account/supplier/pages/RequestListPage/config/tableColumns";
import Icon from "@/shared/ui-kits/Icon";
import { formatDate } from "@/utils/get-form-data";
import { Link, useNavigate } from "react-router-dom";
import { RequestOffersTableRow } from "./request-offers-table-row";
import { Selector } from "@/shared/ui-kits/select";
import { useEffect, useState } from "react";
import { ArchiveConfirmModal } from "./archive-confirm-modal";

interface Props {
    number: number,
    styles: any,
    item: {
        data: RequestRes,
        offers: OfferFull
    },
    goToEditRequest?: any,
    handleDeleteRequest?: any,
    handleResubmit?: any,
    gridClass?: any

    onFavoriteAdd?: any
    onFavoriteRemove?: any
    onArhiv?: any
    onChangeStatus?: any
}


export const RequestTableRow = ({ styles, item, goToEditRequest, handleDeleteRequest, handleResubmit, number, gridClass, onArhiv, onChangeStatus, onFavoriteAdd, onFavoriteRemove }: Props) => {

    const [isOpen, setIsOpen] = useState(false);
    const toggleOffers = () => {
        setIsOpen(prev => !prev);
    };


    const { user } = useAuth()

    const navigate = useNavigate()

    const [selectedStatus, setSelectedStatus] = useState('')

    const [showArchiveConfirm, setShowArchiveConfirm] = useState<boolean>(false)

    const openArchiveConfirm = (e: Event, value: boolean) => {
        e.stopPropagation();
        setShowArchiveConfirm(value)
    }

    useEffect(() => {
        console.log(item)
    }, [])

    const handleArhive = () => {
        onArhiv(item.data.id)
        setShowArchiveConfirm(false)
    }

    return (
        <>
            {showArchiveConfirm && (
                <ArchiveConfirmModal
                    styles={styles}
                    setShowArchiveConfirm={setShowArchiveConfirm}
                    handleArchiveRequest={handleArhive}
                />
            )}

            <div className="relative">
                <div key={number} onClick={() => user?.role != Role.Supplier && toggleOffers()} className={`${styles.tr} py-5 px-3 cursor-pointer items-center text-center hover:bg-[rgba(74,_133,_246,_0.05)] border-b border-gray-300 ${gridClass}`}>
                    <div className={styles.div}>
                        <span className={styles.idBadge}>{item.data.innerId || number}</span>
                    </div>

                    <div className={styles.div}>
                        <span className={styles.requestLink}>
                            {item.data.objectName}
                        </span>
                    </div>

                    <div className={styles.div}>{item.data.customerName}</div>

                    <div className={styles.div}>
                        <span className={styles.typeBadge}>{item.data.requestConfigType?.configTypeName}</span>
                    </div>

                    <div className={styles.div}>
                        <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 rounded-full text-xs font-semibold text-green-600" >
                            <ViewIcon />
                            {item.data.businessOffersCount}
                        </div>
                    </div>

                    <div className={`${styles.div} `}>
                        <span className={styles.date + " block w-full text-center"}>
                            {new Date(item.data.createdAt).toLocaleDateString('ru-RU')}
                        </span>
                    </div>
                    <div className={`${styles.div} flex justify-center items-center`}>
                        <span className={`${styles.statusBadge} ${getStatusClass(item.data)}`}>
                            {getStatusText(item.data)}
                        </span>
                    </div>
                    <div className={styles.div}>
                        {user?.role == Role.Admin &&
                            <div className="flex gap-3 justify-center items-center">
                                <button className={`${styles.actionButton} gap-1`} onClick={(e) => { e.stopPropagation(); navigate(`${user?.role == Role.Supplier ? "/supplier" : "/admin"}/request/${item.data.id}`) }} >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" />
                                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </button>

                                <button
                                    className={`${styles.actionButton} ${styles.actionArchive}`}
                                    onClick={(e) => { e.stopPropagation(); onArhiv!(item.data.id) }}
                                    title="Отправить в архив"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M4 8H20V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V8Z" stroke="currentColor" strokeWidth="2" />
                                        <path d="M2 4H22V8H2V4Z" stroke="currentColor" strokeWidth="2" />
                                        <path d="M10 12H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                </button>

                                <button
                                    className={`${styles.actionButton} ${styles.actionDelete}`}
                                    onClick={(e) => handleDeleteRequest(item.data.id, e)}
                                    title="Удалить"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" />
                                        <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </button>
                            </div>
                        }

                        {user?.role == Role.Customer &&
                            <div className={styles.actions + " flex justify-center"}>
                                <Link className={styles.actionButton} to={`/customer/request/${item.data.id}`}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" />
                                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </Link>

                                {item.data.isArchived ? (
                                    item.data.status &&
                                    <>
                                        {/* Разархивировать */}
                                    </>
                                ) : ((item.data.status === RequestStatus.Published || item.data.status === RequestStatus.New || item.data.status === RequestStatus.Rejected) &&
                                    <>
                                        <button
                                            className={`${styles.actionButton} ${styles.actionArchive}`}
                                            onClick={(e) => openArchiveConfirm(e, true)}
                                            title="Отправить в архив"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                <path d="M4 8H20V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V8Z" stroke="currentColor" strokeWidth="2" />
                                                <path d="M2 4H22V8H2V4Z" stroke="currentColor" strokeWidth="2" />
                                                <path d="M10 12H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                            </svg>
                                        </button>
                                    </>
                                )}

                                {/* Для опубликованных: просмотр КП и архив */}

                                {!item.data.isArchived && item.data.status === RequestStatus.Rejected && (
                                    <>
                                        <button className={styles.actionButton}
                                            onClick={(e) => { e.stopPropagation(); navigate(`/customer/request/${item.data.id}/offers`) }}
                                            title="Повторное модерация"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" />
                                            </svg>
                                        </button>
                                    </>
                                )}

                                {!item.data.isArchived && item.data.status === RequestStatus.Moderation && (
                                    <>
                                        <button
                                            className={`${styles.actionButton} ${styles.actionDelete}`}
                                            onClick={(e) => handleDeleteRequest(item.data.id, e)}
                                            title="Удалить"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" />
                                                <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" />
                                            </svg>
                                        </button>
                                    </>
                                )}

                                {!item.data.isArchived && item.data.status === RequestStatus.New && (
                                    <>
                                        <button
                                            className={`${styles.actionButton} ${styles.actionEdit}`}
                                            onClick={(e) => goToEditRequest(item.data.id, e)}
                                            title="Редактировать"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" />
                                                <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" />
                                            </svg>
                                        </button>
                                    </>
                                )}
                            </div>
                        }

                        {user?.role == Role.Supplier &&
                            <div className="flex gap-3 justify-center items-center">
                                <button className={`${styles.actionButton} px-[10px] !w-min gap-1`} onClick={(e) => { e.stopPropagation(); navigate(`${user?.role == Role.Supplier ? "/supplier" : "/admin"}/request/${item.data.id}`) }} >
                                    {true ? (
                                        <>
                                            <ViewIcon />
                                            Просмотр
                                        </>
                                    ) : (
                                        <>
                                            <PlusIcon />
                                            Предпросмотр
                                        </>
                                    )}
                                </button>

                                {onFavoriteAdd &&
                                    <div>
                                        <button
                                            className={`${styles.actionButton} ${styles.actionArchive}`}
                                            onClick={(e) => { e.stopPropagation(); onFavoriteAdd(item.data.id); console.log("asd") }}
                                            title="Отправить в архив"
                                        >
                                            <Icon name="star-outline" width={18} />
                                        </button>
                                    </div>
                                }

                                {onFavoriteRemove &&
                                    <div>
                                        <button
                                            className={`${styles.favoriteButton} ${styles.favoriteActive}`}
                                            onClick={(e) => { e.stopPropagation(); onFavoriteRemove(item.data.id); console.log("asd") }}
                                            title="Отправить в архив"
                                        >
                                            <Icon name="star-outline" width={18} />
                                        </button>
                                    </div>
                                }

                            </div>
                        }
                    </div>

                    {user?.role == Role.Admin &&
                        <div className="flex items-center gap-2">
                            {/* Стилизованный select */}
                            <select
                                onClick={(e) => e.stopPropagation()}
                                className="px-4 py-2 pr-4 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 transition-all duration-200 bg-no-repeat bg-[center_right_0.5rem] bg-[length:16px]"
                                onChange={(e) => { setSelectedStatus(e.target.value) }}
                            >
                                {Object.keys(RequestStatus)
                                    .filter(item => !isNaN(Number(item)))
                                    .map((item, key) => (
                                        <option
                                            key={key}
                                            value={item}
                                            className="py-2 text-gray-700"
                                        >
                                            {RequestStatusTranslations[item]}
                                        </option>
                                    ))}
                            </select>

                            {/* Стилизованная кнопка подтверждения */}
                            <button
                                className="flex items-center justify-center p-1 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-all duration-200 cursor-pointer"
                                title="Сохранить изменение статуса"
                                onClick={(e) => { e.stopPropagation(); onChangeStatus({ requestId: item.data.id, newStatus: selectedStatus }) }}
                            >
                                <Icon name="check" color="#10b981" width={20} />
                            </button>
                        </div>
                    }
                </div>
                {isOpen &&
                    <div id={`offers-${item.data.id}`}
                        className={`bg-gray-50  ease-in-out border-b border-gray-300 transition-all duration-300 
                        ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 hidden translate-y-[-10px] pointer-events-none'}`
                        }>

                        <RequestOffersTableRow item={item} user={user} />
                    </div>
                }
            </div>
        </>
    );
}