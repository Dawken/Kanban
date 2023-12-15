import { gql } from '@apollo/client'

const GET_BOARDS = gql`
    query Boards {
        boards {
            boardName
            id
        }
    }
`

export default GET_BOARDS
