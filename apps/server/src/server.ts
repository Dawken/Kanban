import typeDefs from './graphql/typeDefs'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import userResolvers from './graphql/user/userResolvers'

const server = async () => {
  const app = express()

  const server = new ApolloServer({
    typeDefs,
    resolvers: userResolvers,
  })
  await server.start()

  server.applyMiddleware({
    app,
  })

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  })
}
server()
