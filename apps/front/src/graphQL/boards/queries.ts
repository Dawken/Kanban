import { gql } from '@apollo/client'

const GET_BOARD = gql`
    query Board($boardId: String!) {
        board(boardId: $boardId) {
            boardName
            id
            status {
                statusName
                id
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
            }
        }
    }
`

export { GET_BOARDS, GET_BOARD }
