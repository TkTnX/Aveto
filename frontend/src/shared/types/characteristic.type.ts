import { IAd } from "."

export interface ICharacteristic {
    id: string
    name: string
    value: string

    ads: IAd[]
}