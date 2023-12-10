import { gql } from 'apollo-server'

const typeDefs = gql`
    type Query {
        users: [User]
        boards: [Board]
    }

    type User {
        id: String!
        login: String!
        password: String!
        name: String!
        lastName: String!
        boards: [Board]
    }

    type Board {
        id: String!
        boardName: String!
        user: User
        userId: String!
    }

    type Mutation {
        createUser(
            login: String!
            password: String!
            name: String!
            lastName: String!
        ): User
        loginUser(login: String!, password: String): User
        createBoard(boardName: String!): Board
        updateCookie: User
    }
`
export default typeDefs
