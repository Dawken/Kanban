import { gql } from '@apollo/client'

const PUSH_TASK = gql`
    mutation PushTask($taskId: String!, $newStatusId: String!, $order: Int!) {
        pushTask(taskId: $taskId, newStatusId: $newStatusId, order: $order) {
            id
        }
    }
`

const UPDATE_TASK_ORDER = gql`
    mutation UpdateTaskOrder($newTaskOrder: [TaskOrderInput!]!) {
        updateTaskOrder(newTaskOrder: $newTaskOrder) {
            id
        }
    }
`

export { PUSH_TASK, UPDATE_TASK_ORDER }
