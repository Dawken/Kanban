import { TaskProps } from '@src/types/task/taskProps'

export type StatusProps = {
    id: string
    statusName: string
    order: number
    task: TaskProps[]
}
