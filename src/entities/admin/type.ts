import { RequestStatus } from "../request/config"

export interface IArhiveChange {
    id: string
}
export interface IStatusChange {
    requestId: string
    newStatus: RequestStatus
}
export interface IType { }
export interface IType { }