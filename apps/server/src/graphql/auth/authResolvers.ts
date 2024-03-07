import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { RegisterDTO } from './registerDTO'
import { bodyValidator } from '../../shared/bodyValidator'
import { UserAccountProps } from '../../types/userAccount'
import { LoginDTO } from './loginDTO'
import { Response, Request } from 'express'
import checkAuth from '../../middlewares/checkAuth'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { LoginProps } from '../../types/loginProps'
import authRefreshTokens from '../../shared/authRefreshTokens'

const prisma = new PrismaClient()

const authResolvers = {
    Query: {
        users: checkAuth(async () => {
            try {
                return await prisma.user.findMany()
            } catch (error) {
                throw new Error('failed-users-fetch')
            }
        }),
    },
    Mutation: {
        loginUser: async (
            _parent: unknown,
            { login, password }: LoginProps,
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
                    const {
                        authToken,
                        refreshToken,
                        expiresAuthToken,
                        expiresRefreshToken,
                        domain,
                    } = authRefreshTokens(user)

                    res.setHeader('Set-Cookie', [
                        `AuthToken=${authToken}; Max-Age=3600; Path=/; Domain=.${domain}; Expires=${expiresAuthToken.toUTCString()}; HttpOnly; Secure; SameSite=None;`,
                        `RefreshToken=${refreshToken}; Max-Age=604800; Path=/; Domain=.${domain}; Expires=${expiresRefreshToken.toUTCString()}; HttpOnly; Secure; SameSite=None;`,
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
        logoutUser: async (
            _parent: unknown,
            _args: unknown,
            { req, res }: { req: Request; res: Response }
        ) => {
            try {
                res.clearCookie('AuthToken', {
                    httpOnly: true,
                })
                res.clearCookie('RefreshToken', {
                    httpOnly: true,
                })
            } catch (error) {
                throw new Error(error.message)
            }
        },
        updateCookie: async (
            _parent: unknown,
            _args: unknown,
            { req, res }: { req: Request; res: Response }
        ) => {
            if (req.cookies.RefreshToken) {
                const decodedToken = jwt.verify(
                    req.cookies.RefreshToken,
                    process.env.TOKEN_SECRET
                )

                const user = await prisma.user.findUnique({
                    where: { id: (decodedToken as JwtPayload).id },
                })

                try {
                    const {
                        authToken,
                        refreshToken,
                        expiresAuthToken,
                        expiresRefreshToken,
                        domain,
                    } = authRefreshTokens(user)

                    res.setHeader('Set-Cookie', [
                        `AuthToken=${authToken}; Max-Age=3600; Path=/; Domain=.${domain}; Expires=${expiresAuthToken.toUTCString()}; HttpOnly; Secure; SameSite=None;`,
                        `RefreshToken=${refreshToken}; Max-Age=604800; Path=/; Domain=.${domain}; Expires=${expiresRefreshToken.toUTCString()}; HttpOnly; Secure; SameSite=None;`,
                    ])
                } catch (error) {
                    throw new Error(error.message)
                }
            } else {
                throw new Error('refresh-token-required')
            }
        },
        createUser: async (
            _parent: unknown,
            { login, password, name, lastName }: UserAccountProps
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

export default authResolvers
