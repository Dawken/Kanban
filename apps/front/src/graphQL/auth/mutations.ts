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

const LOGOUT_USER = gql`
    mutation logoutUser {
        logoutUser {
            id
        }
    }
`

const UPDATE_COOKIE = gql`
    mutation UpdateCookie {
        updateCookie {
            id
        }
    }
`

export { CREATE_USER, LOGIN_USER, LOGOUT_USER, UPDATE_COOKIE }
