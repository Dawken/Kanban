import { gql } from '@apollo/client'

const CREATE_BOARD = gql`
    mutation CreateBoard($boardName: String!, $status: [String]) {
        createBoard(boardName: $boardName, status: $status) {
            boardName
        }
    }
`
const EDIT_BOARD = gql`
    mutation EditBoard($boardId: String!, $boardName: String) {
        editBoard(boardId: $boardId, boardName: $boardName) {
            boardName
            id
        }
    }
`

export { CREATE_BOARD, EDIT_BOARD }
