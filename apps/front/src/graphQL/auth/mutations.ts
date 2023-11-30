import { gql } from '@apollo/client'

const CREATE_USER = gql`
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

const LOGIN_USER = gql`
    mutation loginUser($login: String!, $password: String!) {
        loginUser(login: $login, password: $password) {
            login
            password
        }
    }
`

export { CREATE_USER, LOGIN_USER }
