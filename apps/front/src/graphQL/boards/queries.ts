import { gql } from '@apollo/client'

const GET_BOARD = gql`
    query Board($boardId: String!) {
        board(boardId: $boardId) {
            boardName
            id
            status {
                statusName
                id
                order
                task {
                    id
                    taskName
                    statusId
                    order
                }
            }
        }
    }
`

const GET_BOARDS = gql`
    query Boards {
        boards {
            boardName
            id
            order
            status {
                statusName
                id
                order
            }
        }
    }
`

export { GET_BOARDS, GET_BOARD }
