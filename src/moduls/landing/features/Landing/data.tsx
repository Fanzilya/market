import aco from "@/moduls/shop/assets/images/aco-logo.svg";
import smk from "@/moduls/shop/assets/images/cmk-logo.png";
import compozit from "@/moduls/shop/assets/images/compozit-logo.png";
import npp from "@/moduls/shop/assets/images/npp.png";
import ascent from "@/moduls/shop/assets/images/ascent-logo.png";
import Icon from "@/shared/ui-kits/Icon";

export const partners = [
    { id: 1, name: 'СМК-Гидрикс', logo: smk,   slug: 'gidrig' },
    { id: 2, name: 'НПП Гидрикс', logo: npp,  slug: 'npp' },
    { id: 3, name: 'Волжский композит', logo: compozit, slug: 'compozit' },
    { id: 4, name: 'Эколайн', logo: aco,  slug: 'ecolain' },
    { id: 5, name: 'Акцент-Саба', logo: ascent,   slug: 'acsent' },
]

export const features = [
    {
        icon: (<Icon name='requests' />),
        title: 'Управление заявками',
        description: 'Создавайте и управляйте заявками в единой системе. Полная прозрачность и контроль.',
    },
    {
        icon: ( <Icon name='profile' />),
        title: 'Работа с исполнителями',
        description: 'Получайте предложения от проверенных исполнителей. Сравнивайте цены.',
    },
    {
        icon: (<Icon name='dashboard' />),
        title: 'Аналитика и отчёты',
        description: 'Детальная аналитика по процессам. Конъюнктурный анализ цен.',
    },
    {
        icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" /><path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" /></svg>),
        title: 'Контроль сроков',
        description: 'Автоматические уведомления о дедлайнах. Никогда не пропускайте важные сроки.',
    },
    {
        icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2" /><path d="M7 11V7C7 4.79086 8.79086 3 11 3H13C15.2091 3 17 4.79086 17 7V11" stroke="currentColor" strokeWidth="2" /></svg>),
        title: 'Безопасность данных',
        description: 'Современные методы шифрования. Регулярное резервное копирование.',
    },
    {
        icon: (<svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M21 15C21 15.5523 20.5523 16 20 16H7L3 21V5C3 4.44772 3.44772 4 4 4H20C20.5523 4 21 4.44772 21 5V15Z" stroke="currentColor" strokeWidth="2" /></svg>),
        title: 'Поддержка 24/7',
        description: 'Наша команда готова помочь в любое время. Быстрые ответы.',
    },
]

export const stats = [
    { value: '500+', label: 'Активных пользователей' },
    { value: '1000+', label: 'Созданных заявок' },
    { value: '98%', label: 'Довольных клиентов' },
    { value: '24/7', label: 'Поддержка' },
]

export const customerFeatures = [
    { icon: '📋', text: 'Создание заявок через удобный опросный лист' },
    { icon: '💰', text: 'Сравнение коммерческих предложений' },
    { icon: '📊', text: 'Конъюнктурный анализ цен' },
    { icon: '✅', text: 'Выбор оптимального исполнителя' },
    { icon: '📈', text: 'Контроль выполнения работ' },
]

export const supplierFeatures = [
    { icon: '📥', text: 'Просмотр заявок от заказчиков' },
    { icon: '📤', text: 'Отправка коммерческих предложений' },
    { icon: '🔧', text: 'Подбор оборудования под требования' },
    { icon: '📱', text: 'Уведомления о новых заявках' },
    { icon: '📊', text: 'Статистика и аналитика предложений' },
]

export const testimonials = [
    { name: 'Алексей Иванов', role: 'Главный инженер', text: 'Платформа значительно упростила процесс сбора коммерческих предложений. Раньше уходили недели, теперь всё автоматизировано.', rating: 5 },
    { name: 'Елена Петрова', role: 'Руководитель отдела закупок', text: 'Удобный интерфейс, понятные формы. Конъюнктурный анализ цен теперь занимает минуты, а не дни.', rating: 5 },
    { name: 'Сергей Смирнов', role: 'Директор по развитию', text: 'Как поставщик, я вижу все актуальные заявки и могу быстро реагировать. Отличный инструмент для бизнеса.', rating: 5 },
]