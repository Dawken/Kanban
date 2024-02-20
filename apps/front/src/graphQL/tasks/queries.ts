import { gql } from '@apollo/client'

const GET_BOARD_TASKS = gql`
    query Tasks($boardId: String!) {
        tasks(boardId: $boardId) {
            id
            taskName
            statusId
            order
        }
    }
`

const GET_TASK = gql`
    query Task($taskId: String!) {
        task(taskId: $taskId) {
            id
            taskName
            description
            createdAt
            updatedAt
        }
    }
`

export { GET_BOARD_TASKS, GET_TASK }
