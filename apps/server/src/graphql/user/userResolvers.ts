import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { RegisterDTO } from './registerDTO'
import { bodyValidator } from '../../shared/bodyValidator'
import { UserAccount } from '../../types/UserAccount'
import { LoginDTO } from './loginDTO'
import generateAccessToken from '../../accessToken'
import { Response } from 'express'

const prisma = new PrismaClient()

type LoginType = {
    login: string
    password: string
}

const userResolvers = {
    Mutation: {
        loginUser: async (
            _: unknown,
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
                    throw new Error()
                } else if (bcrypt.compareSync(password, user.password)) {
                    const token = generateAccessToken(user)
                    const expires = new Date(Date.now() + 3600 * 1000)
                    res.setHeader(
                        'Set-Cookie',
                        `AuthToken=${token}; Max-Age=3600; Path=/; Expires=${expires.toUTCString()}; HttpOnly; Secure; SameSite=None;`
                    )
                } else {
                    throw new Error('incorrect-password')
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error(error.message)
                }
            }
        },
        createUser: async (
            _: unknown,
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
                    throw new Error('Username already exists')
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
