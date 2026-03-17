import { Button } from "@/shared/ui-kits/button"


interface Props {
    styles: any
    isLoading: boolean
    tabForm: number
    onSubmit: () => void
    setTabForm: (value: number) => void
}

export const SuplierButtonForm = ({ onSubmit, tabForm, setTabForm, isLoading, styles }: Props) => {
    return tabForm == 1 ?
        <Button onClick={() => setTabForm(2)}
            className='p-4 bg-gradient-to-br from-[#4A85F6] to-[#3A6BC9] mt-2 hover:shadow-lg'
            disabled={isLoading}>
            Продолжить
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

}