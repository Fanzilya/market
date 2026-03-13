import { OfferFull } from "@/entities/offer/type";
import { RequestStatus } from "@/entities/request/config";
import { getStatusClass, getStatusText } from "@/entities/request/functions";
import { IRequest, RequestRes } from "@/entities/request/type";
import { Role } from "@/entities/user/role";
import { useAuth } from "@/features/user/context/context";
import { PlusIcon, ViewIcon } from "@/moduls/personal-account/supplier/pages/SupplierPage/config/tableColumns";
import Icon from "@/shared/ui-kits/Icon";
import { formatDate } from "@/utils/get-form-data";
import { Link, useNavigate } from "react-router-dom";
import { RequestOffersTableRow } from "./request-offers-table-row";

interface Props {
    number: number,
    styles: any,
    item: {
        data: RequestRes,
        offers: OfferFull
    },
    openArchiveConfirm?: any,
    goToEditRequest?: any,
    handleDeleteRequest?: any,
    handleResubmit?: any,
    gridClass?: any
}


export const RequestTableRow = ({ styles, item, openArchiveConfirm, goToEditRequest, handleDeleteRequest, handleResubmit, number, gridClass }: Props) => {


    // Функция для переключения видимости КП
    const toggleOffers = (itemId: string) => {
        // Находим элемент с КП по id родителя
        const offersElement = document.getElementById(`offers-${itemId}`);

        if (offersElement) {
            if (offersElement.classList.contains('hidden')) {
                // Показываем элемент с анимацией
                offersElement.classList.remove('hidden');
                // Небольшая задержка для срабатывания transition
                setTimeout(() => {
                    offersElement.classList.remove('opacity-0', 'translate-y-[-10px]');
                }, 10);
            } else {
                // Скрываем элемент с анимацией
                offersElement.classList.add('opacity-0', 'translate-y-[-10px]');
                // Ждем окончания анимации перед скрытием
                setTimeout(() => {
                    offersElement.classList.add('hidden');
                }, 300); // Длительность анимации
            }
        }
    }


    const { user } = useAuth()

    const navigate = useNavigate()

    return (
        <div className="relative">
            <div key={number} onClick={() => toggleOffers(item.data.id)} className={`${styles.tr} py-5 px-3 cursor-pointer items-center text-center hover:bg-[rgba(74,_133,_246,_0.05)] border-b border-gray-300 ${gridClass}  ${item.data.isArchived ? styles.trArchived : ''}`}>
                <div className={styles.div}>
                    <span className={styles.idBadge}>{item.innerId || number}</span>
                </div>

                <div className={styles.div}>
                    <span className={styles.requestLink}>
                        {item.data.objectName}
                    </span>
                </div>

                <div className={styles.div}>{item.data.customerName}</div>

                <div className={styles.div}>
                    <span className={styles.typeBadge}>КНС</span>
                </div>
                <div className={styles.div}>
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 rounded-full text-xs font-semibold text-green-600" >

                        <Icon name='check' width={12} />
                        {/* offerCount === 0  */}
                        {/* {offerCount} */}
                        <span className={styles.noOffers}>{item.offers.length}</span>
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
                    <div className={styles.actions + " flex justify-center"}>
                        {
                            user?.role == Role.Customer ?
                                <Link className={styles.actionButton} to={`/customer/request/${item.data.id}`}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" />
                                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                </Link>
                                :
                                <button className={`${styles.actionButton} ${styles.respondButton}`} onClick={(e) => { e.stopPropagation(); navigate(`/supplier/request/${item.data.id}/preview`) }} >
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


                                    {/* if (freeClicksLeft > 0) {
        setFreeClicksLeft(prev => prev - 1)
        navigate(`/supplier/request/${request.id}/preview`, {
          state: { request }
        })
      } else {
        navigate('/supplier/balance', {
          state: {
            message: 'Бесплатные клики закончились. Для просмотра заявок необходимо пополнить счет.'
          }
        })
      } */}


                                </button>
                        }


                        {user?.role == Role.Customer && !item.data.isArchived && (
                            <>
                                {/* Для опубликованных: просмотр КП и архив */}
                                {item.data.status === RequestStatus.Published && (
                                    <>
                                        <button className={styles.actionButton} onClick={(e) => {
                                            e.stopPropagation(); navigate(`/customer/request/${item.data.id}/offers`)
                                        }}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" />
                                            </svg>
                                        </button>

                                        <button
                                            className={`${styles.actionButton} ${styles.actionArchive}`}
                                            onClick={(e) => openArchiveConfirm(item.data.id, e)}
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

                                {/* Для на модерации: редактирование и удаление */}
                                {item.data.status === RequestStatus.Moderation && (
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

                                {/* Для на доработке: редактирование и повторная отправка */}
                                {item.data.status === RequestStatus.New && (
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

                                        <button
                                            className={`${styles.actionButton} ${styles.actionWarning}`}
                                            onClick={(e) => handleResubmit(item.data.id, e)}
                                            title="Отправить на повторную модерацию"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                <path d="M23 12C23 13 22 16 20 18C18 20 15 22 12 22C7 22 3 19 2 15" stroke="currentColor" strokeWidth="2" />
                                                <path d="M1 5L5 9L9 5" stroke="currentColor" strokeWidth="2" />
                                                <path d="M5 9V3C5 2 6 1 7 1H21C22 1 23 2 23 3V9" stroke="currentColor" strokeWidth="2" />
                                            </svg>
                                        </button>
                                    </>
                                )}

                                {/* Для отклоненных: редактирование, удаление, архив */}
                                {item.data.status === RequestStatus.Rejected && (
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

                                        <button
                                            className={`${styles.actionButton} ${styles.actionArchive}`}
                                            onClick={(e) => openArchiveConfirm(item.data.id, e)}
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
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div
                id={`offers-${item.data.id}`}
                className="hidden opacity-0 translate-y-[-10px] transition-all duration-300 ease-in-out border-b border-gray-300 rounded-b-lg overflow-hidden"
            >
                <RequestOffersTableRow item={item} />
            </div>

        </div>
    );
}