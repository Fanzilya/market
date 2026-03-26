import React from "react";

export const FormBtnContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex gap-3 justify-end mt-8 pt-6 border-t border-[#f0f2f5]" >
            {children}
        </div>
    );
}

export const BackButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <button
            type="button"
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold cursor-pointer bg-gray-200 transition-all duration-200 border-none text-slate-500 hover:bg-slate-300 hover:text-slate-800"
            onClick={onClick}
        >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5" stroke="currentColor" strokeWidth="2" />
                <path d="M12 5L5 12L12 19" stroke="currentColor" strokeWidth="2" />
            </svg>
            Назад
        </button>
    );
};



export const NextButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <button
            type="button"
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-200 border-none bg-[#4A85F6] text-white shadow-md shadow-[#4A85F6]/30 hover:enabled:bg-[#3A6BC9] hover:enabled:-translate-y-px hover:enabled:shadow-lg hover:enabled:shadow-[#4A85F6]/40 disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={onClick}
        >
            Далее
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19" stroke="white" strokeWidth="2" />
                <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" />
            </svg>
        </button>
    );
};

export const CancelButton = ({ onClick }: { onClick: () => void }) => {
    return (
        <button
            type="button"
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold cursor-pointer bg-gray-200 transition-all duration-200 border-none text-slate-500 hover:bg-slate-300 hover:text-slate-800"
            onClick={onClick}
        >
            Отмена
        </button>
    );
};

export const SubmitButton = ({ isSubmitting, isEditMode, onClick }: { isSubmitting: boolean; isEditMode: boolean; onClick: () => void; }) => {

    return (
        <button
            type="button"
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-200 border-none bg-[#4A85F6] text-white shadow-md shadow-[#4A85F6]/30 hover:enabled:bg-[#3A6BC9] hover:enabled:-translate-y-px hover:enabled:shadow-lg hover:enabled:shadow-[#4A85F6]/40 disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={onClick}
            disabled={isSubmitting}
        >
            {isSubmitting ? (
                <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {isEditMode ? 'Обновление...' : 'Создание...'}
                </>
            ) : (
                <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M20 14.66V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2H14L20 8V14.66Z" stroke="white" strokeWidth="2" />
                        <path d="M14 2V8H20" stroke="white" strokeWidth="2" />
                        <path d="M12 22V16" stroke="white" strokeWidth="2" />
                    </svg>
                    {isEditMode ? 'Обновить заявку' : 'Создать заявку'}
                </>
            )}
        </button>
    );
};





// <div className={styles.formActions}>
//   {activeStep > 1 && (
//     <button
//       type="button"
//       className={styles.secondaryButton}
//       onClick={handleBack}
//     >
//       <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//         <path d="M19 12H5" stroke="currentColor" strokeWidth="2" />
//         <path d="M12 5L5 12L12 19" stroke="currentColor" strokeWidth="2" />
//       </svg>
//       Назад
//     </button>
//   )}

//   {activeStep < 3 ? (
//     <button
//       type="button"
//       className={styles.primaryButton}
//       onClick={handleNext}
//     >
//       Далее
//       <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//         <path d="M5 12H19" stroke="white" strokeWidth="2" />
//         <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="2" />
//       </svg>
//     </button>
//   ) : (
//     <button
//       type="button"
//       className={styles.primaryButton}
//       onClick={() => handleSubmit(isEditMode, navigate, requestId)}
//       disabled={isSubmitting}
//     >
//       {isSubmitting ? (
//         <>
//           <span className={styles.spinner} />
//           {isEditMode ? 'Обновление...' : 'Создание...'}
//         </>
//       ) : (
//         <>
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//             <path d="M20 14.66V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2H14L20 8V14.66Z" stroke="white" strokeWidth="2" />
//             <path d="M14 2V8H20" stroke="white" strokeWidth="2" />
//             <path d="M12 22V16" stroke="white" strokeWidth="2" />
//           </svg>
//           {isEditMode ? 'Обновить заявку' : 'Создать заявку'}
//         </>
//       )}
//     </button>
//   )}

//   <button
//     type="button"
//     className={styles.tertiaryButton}
//     onClick={() => navigate('/customer')}
//   >
//     Отмена
//   </button>
// </div>
