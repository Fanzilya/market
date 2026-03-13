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
            <div
                onClick={() => toggleOffers(item.data.id)}
                key={number}
                className={`${styles.tr} py-5 px-3 cursor-pointer items-center text-center hover:bg-[rgba(74,_133,_246,_0.05)] border-b border-gray-300 ${gridClass}  ${item.data.isArchived ? styles.trArchived : ''}`}
            >
                <div className={styles.div}>
                    <span className={styles.idBadge}>{number}</span>
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
                {item.offers && item.offers.length > 0 ? (
                    <div className="p-4">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">
                            Коммерческие предложения ({item.offers.length})
                        </h3>

                        {/* Сетка с КП */}
                        <div className="space-y-3">
                            {item.offers.map((offer: any) => (
                                <Link to={`/customer/offer/${offer.id}`}
                                    key={offer.id}
                                    className="bg-white rounded-xl block border border-gray-200 hover:border-blue-200 hover:shadow-lg transition-all duration-200 overflow-hidden"
                                >
                                    {/* Верхняя цветная полоса с индикатором */}

                                    <div className="p-5">
                                        {/* Заголовок с номером КП и статусом */}
                                        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <div className="text-xs text-gray-500">Коммерческое предложение</div>
                                                    <div className="font-semibold text-gray-900">
                                                        № {offer.offersNumber || 'б/н'}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Бейдж с датой */}
                                            <div className="flex items-center gap-2 text-sm bg-gray-100 px-3 py-1.5 rounded-lg">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span className="text-gray-600">{formatDate(offer.supportingDocumentDate)}</span>
                                            </div>
                                        </div>

                                        {/* Основная информация в сетке */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                            {/* Поставщик */}
                                            <div className="bg-gray-100 rounded-lg p-3">
                                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    Поставщик
                                                </div>
                                                <div className="font-medium text-gray-900 truncate" title={offer.nameBySupplier}>
                                                    {offer.nameBySupplier || '—'}
                                                </div>
                                            </div>

                                            {/* Цена с НДС */}
                                            <div className="bg-green-50 rounded-lg p-3">
                                                <div className="flex items-center gap-2 text-xs text-green-600 mb-1">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    Цена с НДС
                                                </div>
                                                <div className="font-bold text-green-700">
                                                    {new Intl.NumberFormat('ru-RU').format(offer.currentPriceNDS || 0)} ₽
                                                </div>
                                            </div>

                                            {/* Цена без НДС */}
                                            <div className="bg-gray-100 rounded-lg p-3">
                                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                                    </svg>
                                                    Цена без НДС
                                                </div>
                                                <div className="font-medium text-gray-900">
                                                    {new Intl.NumberFormat('ru-RU').format(offer.currentPriceNoNDS || 0)} ₽
                                                </div>
                                            </div>

                                            {/* Местоположение */}
                                            <div className="bg-gray-100 rounded-lg p-3">
                                                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    Производитель / Склад
                                                </div>
                                                <div className="font-medium text-gray-900">
                                                    {offer.manufacturerCountry || '—'} {offer.warehouseLocation ? `/ ${offer.warehouseLocation}` : ''}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Дополнительная информация в компактном виде */}
                                        <div className="flex flex-wrap items-center gap-3 text-sm border-t border-gray-100 pt-4">
                                            {offer.supplierSiteURL && (
                                                <a
                                                    href={offer.supplierSiteURL}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                    Сайт поставщика
                                                </a>
                                            )}

                                            {/* Файлы в виде иконок */}
                                            <div className="flex items-center gap-2 ml-auto">
                                                {offer.offerFileId && (
                                                    <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group relative">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                        </svg>
                                                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                            КП
                                                        </span>
                                                    </button>
                                                )}
                                                {offer.passportFileId && (
                                                    <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors group relative">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
                                                        </svg>
                                                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                            Паспорт
                                                        </span>
                                                    </button>
                                                )}
                                                {offer.certificateFileId && (
                                                    <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors group relative">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                                        </svg>
                                                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                            Сертификат
                                                        </span>
                                                    </button>
                                                )}
                                                {offer.planFileId && (
                                                    <button className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors group relative">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                        </svg>
                                                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-900 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                            План
                                                        </span>
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="p-4 text-center text-gray-500">
                        Нет коммерческих предложений
                    </div>
                )}
            </div>

        </div>
    );
}