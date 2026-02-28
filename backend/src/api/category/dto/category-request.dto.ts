import { IsNotEmpty, IsString } from "class-validator";

export class CategoryRequest {
    @IsNotEmpty({message: "Название обязательно!"})
    @IsString({message: "Название должно быть строкой!"})
    name: string

    // TODO: TEMP STRING VALUE
    image?: string
    parentId?:string
}