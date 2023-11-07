import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { RegisterDTO } from './registerDTO'
import { bodyValidator } from '../../shared/bodyValidator'

const prisma = new PrismaClient()

type AccountType = {
  login: string
  password: string
  name: string
  lastName: string
}

const userResolvers = {
  Mutation: {
    createUser: async (
      _: unknown,
      { login, password, name, lastName }: AccountType
    ) => {
      try {
        await bodyValidator(RegisterDTO, { login, password, name, lastName })
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
