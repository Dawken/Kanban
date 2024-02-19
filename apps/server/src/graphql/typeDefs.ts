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

    input StatusInput {
        id: String
        statusName: String
        boardId: String
        order: Int
    }

    input TaskInput {
        id: String
        taskName: String
        statusId: String
        description: String
        createdAt: DateTime
        updatedAt: DateTime
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
        task: [TaskInput]
    }

    input TaskOrderInput {
        id: String!
        taskName: String!
        statusId: String!
        description: String
        createdAt: DateTime
        updatedAt: DateTime
        order: Int!
    }

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
        updateBoardsOrder(newBoardOrder: [BoardOrderInput!]!): [Board]

        #Status
        createStatus(statusName: String!, boardId: String!): Status
        updateStatusName(statusId: String!, statusName: String!): Status
        deleteStatus(statusId: String!): Status
        updateStatusOrder(newStatusOrder: [StatusOrderInput!]!): [Status]

        #Task
        createTask(
            taskName: String!
            description: String
            statusId: String!
        ): Task
        updateTaskName(taskName: String!, taskId: String!): Task
        updateDescription(description: String!, taskId: String!): Task
        deleteTask(taskId: String!): Status
        updateTaskOrder(newTaskOrder: [TaskOrderInput!]!): [Task]
        pushTask(taskId: String!, newStatusId: String!, order: Int!): Task
    }
`
export default typeDefs
