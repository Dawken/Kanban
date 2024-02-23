import typeDefs from './graphql/typeDefs'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { UserAccountProps } from './types/userAccount'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { mergeResolvers } from '@graphql-tools/merge'
import authResolvers from './graphql/auth/authResolvers'
import boardResolvers from './graphql/board/boardResolvers'
import statusResolvers from './graphql/status/statusResolvers'
import taskResolvers from './graphql/task/taskResolver'

config()

const corsOptions = {
    credentials: true,
    origin: process.env.ORIGIN,
}

const resolvers = mergeResolvers([
    authResolvers,
    boardResolvers,
    statusResolvers,
    taskResolvers,
])
const server = async () => {
    const app = express()
    app.use(cookieParser())

    const server = new ApolloServer({
        typeDefs,
        resolvers: resolvers,
        context: ({ req, res }) => {
            const { AuthToken } = req.cookies

            jwt.verify(
                AuthToken,
                process.env.TOKEN_SECRET,
                (err: Error, user: UserAccountProps) => {
                    req.user = user
                }
            )

            return {
                req,
                res,
            }
        },
    })
    await server.start()

    server.applyMiddleware({
        app,
        cors: corsOptions,
    })

    app.listen({ port: 4000 }, () => {
        console.log(
            `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
        )
    })
}
server()
