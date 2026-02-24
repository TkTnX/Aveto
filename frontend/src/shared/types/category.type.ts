export interface ICategory {
    id: string
    name: string
    slug: string
    image?: string

    parentId?: string
    parent?: ICategory
    children: ICategory[]

    
}