import { gql } from 'apollo-server'

const typeDefs = gql`
  type Query {
    users: [User]
  }

  type User {
    id: String!
    login: String!
    password: String!
    name: String!
    lastName: String!
  }

  type Mutation {
    createUser(
      login: String!
      password: String!
      name: String!
      lastName: String!
    ): User
  }
`
export default typeDefs
