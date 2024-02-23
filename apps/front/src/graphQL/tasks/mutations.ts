import { gql } from '@apollo/client'

const PUSH_TASK = gql`
    mutation PushTask($taskId: String!, $newStatusId: String!, $order: Int!) {
        pushTask(taskId: $taskId, newStatusId: $newStatusId, order: $order) {
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

const UPDATE_DESCRIPTION = gql`
    mutation UpdateDescription($description: String!, $taskId: String!) {
        updateDescription(description: $description, taskId: $taskId) {
            description
            updatedAt
        }
    }
`

export {
    PUSH_TASK,
    CREATE_TASK,
    DELETE_TASK,
    UPDATE_TASK_NAME,
    UPDATE_DESCRIPTION,
}
