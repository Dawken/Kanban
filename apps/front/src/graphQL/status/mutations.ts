import { gql } from '@apollo/client'

const DELETE_STATUS = gql`
    mutation DeleteStatus($statusId: String!) {
        deleteStatus(statusId: $statusId) {
            id
        }
    }
`
const CREATE_STATUS = gql`
    mutation CreateStatus($statusName: String!, $boardId: String!) {
        createStatus(statusName: $statusName, boardId: $boardId) {
            id
        }
    }
`
export { DELETE_STATUS, CREATE_STATUS }
