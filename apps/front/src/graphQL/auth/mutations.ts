import { gql } from '@apollo/client'

export const CREATE_USER = gql`
    mutation createUser(
        $login: String!
        $password: String!
        $name: String!
        $lastName: String!
    ) {
        createUser(
            login: $login
            password: $password
            name: $name
            lastName: $lastName
        ) {
            login
            password
            name
            lastName
            id
        }
    }
`
