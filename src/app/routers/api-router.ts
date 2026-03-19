export const Auth = {
    register: "/Auth/register",
    login: "/Auth/login",
    refresh: "/Auth/refresh",
    createRole: "/Auth/inner/createRole",
    logout: "/Auth/logout",
    me: "/Auth/me",
    accountMany: "/Auth/employer/account",
    employeRegister: "/Auth/employe/register",
}


export const KnsRequest = {
    equipments: "/KnsRequest/knsConfig/equipments",
    current: '/KnsRequest/knsConfig/current',
    equipmentCurrent: '/KnsRequest/knsConfig/equipment/current',
    create: "/KnsRequest/create/new",
}


export const RequestRouter = {
    allPublic: "/Request/actual/published/all",
    single: "/Request/single",
    allByUser: "/Request/user/requests/all",
    favouritesByUser: "/Request/user/favourites",
    favouritesAdd: "/Request/favourites/add",
    favouriteRemove: "/Request/favourites/remove",
    requestArhiv: "/Request/archive",
    viewAccount: "/Request/supplier/view/request",
    clickAccount: "/Request/supplier/click/request",
}


export const OfferRouter = {
    create: "/Offers/create",
    offersByUser: "/Offers/users/offers",
    businessacc: "/Offers/businessacc/offers",
    offersByRequests: "/Offers/requests/offers",
    single: "/Offers/single/offer/fullinfo",

    offerFileUpload: "/Offers/offerFile/upload",
    passportFileUpload: "/Offers/passportFile/upload",
    certificateFileUpload: "/Offers/certificateFile/upload",
    schemeFileUpload: "/Offers/schemeFile/upload",

    // name: "/Offers/offerFile/download/{id}",
    // name: "/Offe rs/equipPassport/download/{id}",
    // name: "/Offers/equipCertificate/download/{id}",
    // name: "/Offers/scemeFile/download/{id}",
}

export const CompanyRouter = {
    inn: "/Companies/company/inn",
    cerate: "/Companies/create",
    companyTypes: "/Companies/types/all",
}

export const FSNRouter = {
    innCompany: "/egr/"
}

export const AdminRouter = {
    usersAll: "/Admin/users/all",
    companiesAll: "/Admin/companies/all",
    requestsAll: "/Admin/requests/all",
    requestArhiv: "/Admin/request/archive/change",
    requestStatusChange: "/Admin/request/statusChange",
}

