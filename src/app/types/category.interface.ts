import { ITransaction } from "./transaction.interface"

export interface ICategory {
    id: number
    name: string
    createdAt:Date
    updatedAt: Date
    transactions:ITransaction[]
}