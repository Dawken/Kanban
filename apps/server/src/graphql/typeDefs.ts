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
        userId: String!
        user: User
        status: [Status]
        order: Int
    }

    type Status {
        id: String!
        statusName: String!
        boardId: String!
        board: Board
    }

    input StatusInput {
        id: String
        statusName: String
        boardId: String
    }

    input BoardOrderInput {
        id: String!
        boardName: String!
        order: Int!
        status: [StatusInput]
    }
    type Mutation {
        #Auth
        createUser(
            login: String!
            password: String!
            name: String!
            lastName: String!
        ): User
        loginUser(login: String!, password: String!): User
        logoutUser: User
        updateCookie: User

        #Boards
        createBoard(boardName: String!, status: [String]): Board
        editBoard(boardId: String!, boardName: String): Board
        deleteBoard(boardId: String!): Board
        updateBoardsOrder(newBoardOrder: [BoardOrderInput!]!): [Board]
    }
`
export default typeDefs
