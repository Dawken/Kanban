import { gql } from '@apollo/client'

const GET_BOARD = gql`
    query Board($boardId: String!) {
        board(boardId: $boardId) {
            boardName
            id
            status {
                id
                statusName
                order
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
                id
                statusName
                order
            }
        }
    }
`

export { GET_BOARDS, GET_BOARD }
