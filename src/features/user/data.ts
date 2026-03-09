import { Role } from "@/entities/user/role";
import { DemoUser } from "../../entities/user/type";

export const DEMO_USERS: DemoUser[] = [
    {
        role: Role.Customer,
        roleLabel: 'Заказчик (проектировщик)',
        fullName: 'Петров Пётр Петрович',
        email: 'customer@marketplays.ru',
        password: 'Customer123',
        phone: '+7 (900) 000-00-00',
    },
    {
        role: Role.Supplier,
        roleLabel: 'Исполнитель (поставщик)',
        fullName: 'Иванов Иван Иванович',
        email: 'supplier@marketplays.ru',
        password: 'Supplier123',
        phone: '+7 (900) 111-11-11',
        company: {
            name: 'ООО «СтройИнжПроект»',
            shortName: 'СтройИнжПроект',
            typeId: 1,
            typeName: 'Проектно-поставочная организация',
            inn: '7707083893',
            kpp: '770701001',
            ogrn: '1027700132195',
            legalAddress: '109012, г. Москва, ул. Примерная, д. 1',
            about:
                'Проектирование и поставка инженерных решений для КНС. Опыт 10+ лет, работаем по всей РФ.',
        },
    },
    {
        role: Role.Supplier,
        roleLabel: 'Исполнитель (поставщик)',
        fullName: 'Иванов Иван Иванович',
        email: 'supplier4@marketplays.ru',
        password: 'Supplier1234',
        phone: '+7 (900) 111-11-11',
        company: {
            name: 'ООО «Название»',
            shortName: 'Название',
            typeId: 1,
            typeName: 'Проектно-поставочная организация',
            inn: '11111111111',
            kpp: '770701001',
            ogrn: '1027700132195',
            legalAddress: '109012, г. Москва, ул. Примерная, д. 1',
            about:
                'Проектирование и поставка инженерных решений для КНС. Опыт 10+ лет, работаем по всей РФ.',
        },
    },
    {
        role: Role.Admin,
        roleLabel: 'Администратор системы',
        fullName: 'Администратор Системы',
        email: 'admin@marketplays.ru',
        password: 'Admin123',
        phone: '+7 (900) 999-99-99',
    },
]