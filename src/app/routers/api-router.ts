export const Auth = {
    register: "/Auth/register",
    login: "/Auth/login",
    refresh: "/Auth/refresh",
    createRole: "/Auth/inner/createRole",
    logout: "/Auth/logout",
    me: "/Auth/me",
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
    allByUser: "/Request/user/requests/all"
}


export const OfferRouter = {
    create: "/Offers/create",
    offersByUser: "/Offers/users/offers",
    businessacc: "/Offers/businessacc/offers",
    offersByRequests: "/Offers/requests/offers",
    single: "/Offers/single/offer/fullinfo",
}


