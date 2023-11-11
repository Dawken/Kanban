import typeDefs from './graphql/typeDefs'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import userResolvers from './graphql/user/userResolvers'
import { UserAccount } from './types/UserAccount'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'

config()

const corsOptions = {
    credentials: true,
    origin: process.env.ORIGIN,
}
const server = async () => {
    const app = express()
    app.use(cookieParser())

    const server = new ApolloServer({
        typeDefs,
        resolvers: userResolvers,
        context: ({ req, res }) => {
            const { AuthToken } = req.cookies

            jwt.verify(
                AuthToken,
                process.env.TOKEN_SECRET,
                (err: Error, user: UserAccount) => {
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
