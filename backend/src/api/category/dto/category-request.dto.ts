import { IsNotEmpty, IsString } from "class-validator";

export class CategoryRequest {
    @IsNotEmpty({message: "Название обязательно!"})
    @IsString({message: "Название должно быть строкой!"})
    name: string

    image?: File
    parentId?:string
}