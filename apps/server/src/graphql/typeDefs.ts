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
        task: [Task]
        order: Int
    }

    type Task {
        id: String!
        taskName: String!
        statusId: String!
        status: Status
        description: String
        createdAt: DateTime!
        updatedAt: DateTime!
        order: Int
    }
    scalar DateTime

    type Query {
        users: [User]
        boards: [Board]
        board(boardId: String!): Board
        tasks(boardId: String!): [Task]
        task(taskId: String!): Task
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
        updateBoardsOrder(boardId: String!, order: Int!): Board

        #Status
        createStatus(statusName: String!, boardId: String!): Status
        updateStatusName(statusId: String!, statusName: String!): Status
        deleteStatus(statusId: String!): Status
        updateStatusOrder(statusId: String!, order: Int!): [Status]

        #Task
        createTask(
            taskName: String!
            description: String
            statusId: String!
        ): Task
        updateTaskName(taskName: String!, taskId: String!): Task
        updateDescription(description: String!, taskId: String!): Task
        deleteTask(taskId: String!): Status
        pushTask(
            taskId: String!
            newStatusId: String!
            order: Int!
            boardId: String!
        ): [Task]
    }
`
export default typeDefs
