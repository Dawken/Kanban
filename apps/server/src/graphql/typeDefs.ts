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
        #Auth
        createUser(
            login: String!
            password: String!
            name: String!
            lastName: String!
        ): User
        loginUser(login: String!, password: String): User
        updateCookie: User

        #Boards
        createBoard(boardName: String!): Board
        deleteBoard(boardId: String!): Board
    }
`
export default typeDefs
