import { PrismaClient } from '@prisma/client'
import checkAuth from '../../middlewares/checkAuth'

const prisma = new PrismaClient()

const authResolvers = {
    Query: {
        boards: checkAuth(async (_parent, _args, req) => {
            try {
                return await prisma.board.findMany({
                    where: { userId: req.user.id },
                })
            } catch (error) {
                throw new Error('failed-boards-fetch')
            }
        }),
    },
    Mutation: {
        createBoard: checkAuth(async (_parent, { boardName }, req) => {
            try {
                return await prisma.board.create({
                    data: {
                        boardName,
                        user: {
                            connect: {
                                id: req.user.id,
                            },
                        },
                    },
                })
            } catch (error) {
                throw new Error('failed-board-create')
            }
        }),
    },
}

export default authResolvers
