        // {/* Предложения */}
        // {activeTab === 'offers' && (
        //   <div className={styles.tableContainer}>
        //     <table className={styles.table}>
        //       <thead>
        //         <tr>
        //           <th className={styles.th} style={{ width: '40px' }}>
        //             <input
        //               type="checkbox"
        //               checked={selectedItems.length === filteredOffers.length && filteredOffers.length > 0}
        //               onChange={() => handleSelectAll('offers')}
        //               className={styles.checkbox}
        //             />
        //           </th>
        //           <th className={styles.th}>№</th>
        //           <th className={styles.th}>Поставщик</th>
        //           <th className={styles.th}>Заявка</th>
        //           <th className={styles.th}>Стоимость</th>
        //           <th className={styles.th}>Дата</th>
        //           <th className={styles.th}>Действия</th>
        //         </tr>
        //       </thead>
        //       <tbody>
        //         {filteredOffers.map(offer => (
        //           <tr key={offer.id} className={styles.tr}>
        //             <td className={styles.td}>
        //               <input
        //                 type="checkbox"
        //                 checked={selectedItems.includes(offer.id)}
        //                 onChange={() => handleSelectItem(offer.id)}
        //                 className={styles.checkbox}
        //               />
        //             </td>
        //             <td className={styles.td}>
        //               <span className={styles.idCell}>{offer.id}</span>
        //             </td>
        //             <td className={styles.td}>{offer.supplierCompany || offer.supplierFullName}</td>
        //             <td className={styles.td}>{offer.requestId}</td>
        //             <td className={styles.td}>
        //               <span className={styles.priceCell}>
        //                 {new Intl.NumberFormat('ru-RU').format(offer.price)} ₽
        //               </span>
        //             </td>
        //             <td className={styles.td}>{formatDate(offer.createdAt)}</td>
        //             <td className={styles.td}>
        //               <div className={styles.actions}>
        //                 <button
        //                   className={styles.actionButton}
        //                   onClick={() => navigate(`/admin/offer/${offer.id}`)}
        //                   title="Просмотр"
        //                 >
        //                   <Icon name="view" />
        //                 </button>
        //                 <button
        //                   className={`${styles.actionButton} ${styles.deleteButton}`}
        //                   onClick={() => handleDeleteOffer(offer.id)}
        //                   title="Удалить"
        //                 >
        //                   <Icon name="delete" />
        //                 </button>
        //               </div>
        //             </td>
        //           </tr>
        //         ))}
        //       </tbody>
        //     </table>
        //   </div>
        // )}