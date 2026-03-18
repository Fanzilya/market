import { Button } from "@/shared/ui-kits/button"
import { observer } from "mobx-react-lite"


interface Props {
    styles: any
    isLoading: boolean
    tabFormd: number
    onSubmit: () => void
    setTabForm: (value: number) => void
    isLoadingCompanySearch: boolean,
    getCompanyByInn: () => void
}

export const SuplierButtonForm = observer(({ getCompanyByInn, onSubmit, isLoadingCompanySearch, tabForm, setTabForm, isLoading, styles }: Props) => {
    return tabForm == 1 ?
        <Button onClick={() => { getCompanyByInn(); setTabForm(2) }}
            className={`${isLoadingCompanySearch ? "from-[#4f4f4f] to-[#a2a3a5]" : "from-[#4A85F6] to-[#3A6BC9]"} bg-gradient-to-br p-4 mt-2 hover:shadow-lg`}
            disabled={isLoadingCompanySearch}
        >
            {isLoadingCompanySearch ? "Поиск ..." : "Продолжить"}
        </Button>
        :
        <div className="flex gap-2 mt-2">
            <Button onClick={() => setTabForm(1)}
                className='w-full p-4 hover:shadow-lg focus:outline-none'
                styleColor="gray"
                disabled={isLoading}>
                Назад
            </Button>
            <Button onClick={onSubmit}
                className='w-full p-4 bg-gradient-to-br from-[#4A85F6] to-[#3A6BC9] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#4A85F6] focus:ring-offset-2'
                disabled={isLoading}>
                {isLoading ? (
                    <>
                        <span className={styles.spinner} />
                        Регистрация...
                    </>
                ) : (
                    'Зарегистрироваться'
                )}
            </Button>
        </div>
})