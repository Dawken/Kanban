import { gql } from 'apollo-server'

const typeDefs = gql`
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
        order: Int
    }

    input StatusInput {
        id: String
        statusName: String
        boardId: String
        order: Int
    }

    input BoardOrderInput {
        id: String!
        boardName: String!
        order: Int!
        status: [StatusInput]
    }

    input StatusOrderInput {
        id: String!
        statusName: String!
        order: Int!
    }

    type Query {
        users: [User]
        boards: [Board]
        board(boardId: String!): Board
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
        updateBoardName(boardId: String!, boardName: String!): Board
        deleteBoard(boardId: String!): Board
        updateBoardsOrder(newBoardOrder: [BoardOrderInput!]!): [Board]

        #Status
        createStatus(statusName: String!, boardId: String!): Status
        updateStatusName(statusId: String!, statusName: String!): Status
        deleteStatus(statusId: String!): Status
        updateStatusOrder(newStatusOrder: [StatusOrderInput!]!): [Status]
    }
`
export default typeDefs
