import z from 'zod'

export const editUserSchema = z.object({
    name: z.string('Имя должно быть строкой').min(3, "Минимальная длина имени - 3 символа").max(50, 'Максимальная длина имени - 50 символов'),
})

export type EditUserSchemaType = z.infer<typeof editUserSchema>

export type EditUserWithImageSchemaType = EditUserSchemaType & {image: File}