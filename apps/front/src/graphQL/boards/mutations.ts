import { gql } from '@apollo/client'

const CREATE_BOARD = gql`
    mutation CreateBoard($boardName: String!, $status: [String]) {
        createBoard(boardName: $boardName, status: $status) {
            boardName
            id
        }
    }
`
const UPDATE_BOARD_NAME = gql`
    mutation UpdateBoardName($boardId: String!, $boardName: String!) {
        updateBoardName(boardId: $boardId, boardName: $boardName) {
            boardName
            id
        }
    }
`

const DELETE_BOARD = gql`
    mutation DeleteBoard($boardId: String!) {
        deleteBoard(boardId: $boardId) {
            id
        }
    }
`

const UPDATE_BOARDS_ORDER = gql`
    mutation UpdateBoardsOrder($boardId: String!, $order: Int!) {
        updateBoardsOrder(boardId: $boardId, order: $order) {
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

export { CREATE_BOARD, UPDATE_BOARD_NAME, DELETE_BOARD, UPDATE_BOARDS_ORDER }
