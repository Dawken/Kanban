import { gql } from '@apollo/client'

const CREATE_BOARD = gql`
    mutation CreateBoard($boardName: String!, $status: [String]) {
        createBoard(boardName: $boardName, status: $status) {
            boardName
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
    mutation UpdateBoardsOrder($newBoardOrder: [BoardOrderInput!]!) {
        updateBoardsOrder(newBoardOrder: $newBoardOrder) {
            id
        }
    }
`

export { CREATE_BOARD, UPDATE_BOARD_NAME, DELETE_BOARD, UPDATE_BOARDS_ORDER }
