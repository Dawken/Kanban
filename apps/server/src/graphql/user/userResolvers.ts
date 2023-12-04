import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { RegisterDTO } from './registerDTO'
import { bodyValidator } from '../../shared/bodyValidator'
import { UserAccount } from '../../types/UserAccount'
import { LoginDTO } from './loginDTO'
import {
    generateAccessToken,
    generateRefreshToken,
} from '../../utils/generateToken'
import { Response, Request } from 'express'
import checkAuth from '../../middlewares/checkAuth'
import jwt, { JwtPayload } from 'jsonwebtoken'

const prisma = new PrismaClient()

type LoginType = {
    login: string
    password: string
}

const userResolvers = {
    Query: {
        users: checkAuth(async () => {
            try {
                return await prisma.user.findMany()
            } catch (error) {
                throw new Error('Failed to fetch users')
            }
        }),
    },
    Mutation: {
        loginUser: async (
            _parent: unknown,
            { login, password }: LoginType,
            { req, res }: { req: Request; res: Response }
        ) => {
            try {
                await bodyValidator(LoginDTO, { login, password })
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error(`error fields: ${error.message}`)
                }
            }
            try {
                const user = await prisma.user.findUnique({
                    where: { login: login },
                })
                if (!user) {
                    throw new Error('authentication-failed')
                } else if (bcrypt.compareSync(password, user.password)) {
                    const token = generateAccessToken(user)
                    const refreshToken = generateRefreshToken(user)
                    const expires = new Date(Date.now() + 5)
                    const expiresRefreshToken = new Date(
                        Date.now() + 3600 * 1000
                    )
                    res.setHeader('Set-Cookie', [
                        `AuthToken=${token}; Max-Age=5; Path=/; Expires=${expires.toUTCString()}; HttpOnly; Secure; SameSite=None;`,
                        `RefreshToken=${refreshToken}; Max-Age=3600; Path=/; Expires=${expiresRefreshToken.toUTCString()}; HttpOnly; Secure; SameSite=None;`,
                    ])
                } else {
                    throw new Error('authentication-failed')
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error(error.message)
                }
            }
        },
        updateCookie: async (
            _parent: unknown,
            _args: unknown,
            { req, res }: { req: Request; res: Response }
        ) => {
            if (!req.cookies.AuthToken) {
                if (req.cookies.RefreshToken) {
                    const decodedToken = jwt.verify(
                        req.cookies.RefreshToken,
                        process.env.TOKEN_SECRET
                    )

                    const user = await prisma.user.findUnique({
                        where: { id: (decodedToken as JwtPayload).id },
                    })

                    try {
                        const token = generateAccessToken(user)
                        const refreshToken = generateRefreshToken(user)
                        const expires = new Date(Date.now() + 15)
                        const expiresRefreshToken = new Date(
                            Date.now() + 3600 * 1000
                        )
                        res.setHeader('Set-Cookie', [
                            `AuthToken=${token}; Max-Age=15; Path=/; Expires=${expires.toUTCString()}; HttpOnly; Secure; SameSite=None;`,
                            `RefreshToken=${refreshToken}; Max-Age=3600; Path=/; Expires=${expiresRefreshToken.toUTCString()}; HttpOnly; Secure; SameSite=None;`,
                        ])
                    } catch (error) {
                        throw new Error(error.message)
                    }
                } else {
                    throw new Error('refresh-token-required')
                }
            }
        },
        createUser: async (
            _parent: unknown,
            { login, password, name, lastName }: UserAccount
        ) => {
            try {
                await bodyValidator(RegisterDTO, {
                    login,
                    password,
                    name,
                    lastName,
                })
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error(`error fields: ${error.message}`)
                }
            }
            try {
                const existingUser = await prisma.user.findUnique({
                    where: { login: login },
                })

                if (existingUser) {
                    throw new Error('user-exist')
                } else {
                    const hashedPassword = bcrypt.hashSync(password, 10)

                    return prisma.user.create({
                        data: {
                            login,
                            password: hashedPassword,
                            name,
                            lastName,
                        },
                    })
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error(error.message)
                }
            }
        },
    },
}

export default userResolvers
