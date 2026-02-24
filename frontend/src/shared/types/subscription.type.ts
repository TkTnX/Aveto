import { IUser } from "."

export interface ISubscription {
    id: string

    subscribeTo?: IUser
    subscribeToId: string
    subscribeFrom?: IUser
    subscribeFromId: string
}