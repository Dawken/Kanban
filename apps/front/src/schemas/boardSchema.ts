import { array, object, string, TypeOf } from 'zod'

const boardSchema = object({
    boardName: string().nonempty('Board name cannot be empty'),
    status: array(
        object({ value: string().nonempty('Status name cannot be empty') })
    ),
})

export type BoardInput = TypeOf<typeof boardSchema>

export default boardSchema
