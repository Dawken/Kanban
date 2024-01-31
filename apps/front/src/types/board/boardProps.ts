import { StatusProps } from '@src/types/status/statusProps'

export type BoardProps = {
    boardName: string
    status: StatusProps[]
    id: string
    order: number
}
