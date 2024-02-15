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

const CREATE_TASK = gql`
    mutation CreateTask(
        $taskName: String!
        $statusId: String!
        $description: String
    ) {
        createTask(
            taskName: $taskName
            statusId: $statusId
            description: $description
        ) {
            taskName
            statusId
            description
            id
        }
    }
`

const DELETE_TASK = gql`
    mutation DeleteTask($taskId: String!) {
        deleteTask(taskId: $taskId) {
            id
        }
    }
`

const UPDATE_TASK_NAME = gql`
    mutation UpdateTaskName($taskName: String!, $taskId: String!) {
        updateTaskName(taskName: $taskName, taskId: $taskId) {
            id
        }
    }
`

export {
    PUSH_TASK,
    UPDATE_TASK_ORDER,
    CREATE_TASK,
    DELETE_TASK,
    UPDATE_TASK_NAME,
}
