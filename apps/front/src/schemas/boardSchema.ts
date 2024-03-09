import { array, object, string, TypeOf } from 'zod'

const boardSchema = object({
    boardName: string()
        .trim()
        .min(1, { message: 'Board name cannot be empty' }),
    status: array(
        object({
            value: string()
                .trim()
                .min(1, { message: 'Status name cannot be empty' }),
        })
    ),
})

export type BoardInput = TypeOf<typeof boardSchema>

export default boardSchema
