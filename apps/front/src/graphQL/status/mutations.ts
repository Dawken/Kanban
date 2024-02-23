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

const UPDATE_STATUS_NAME = gql`
    mutation UpdateStatusName($statusId: String!, $statusName: String!) {
        updateStatusName(statusId: $statusId, statusName: $statusName) {
            statusName
            id
        }
    }
`

const UPDATE_STATUS_ORDER = gql`
    mutation UpdateStatusOrder($statusId: String!, $order: Int!) {
        updateStatusOrder(statusId: $statusId, order: $order) {
            id
        }
    }
`

export { DELETE_STATUS, CREATE_STATUS, UPDATE_STATUS_NAME, UPDATE_STATUS_ORDER }
