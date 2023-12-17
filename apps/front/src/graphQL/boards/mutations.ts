import { gql } from '@apollo/client'

const CREATE_BOARD = gql`
    mutation CreateBoard($boardName: String!, $status: [String]) {
        createBoard(boardName: $boardName, status: $status) {
            boardName
        }
    }
`

export { CREATE_BOARD }
