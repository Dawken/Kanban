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

export { GET_BOARD_TASKS }
