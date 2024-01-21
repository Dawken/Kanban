import { gql } from '@apollo/client'

const DELETE_STATUS = gql`
    mutation DeleteStatus($statusId: String!) {
        deleteStatus(statusId: $statusId) {
            id
        }
    }
`
export { DELETE_STATUS }
