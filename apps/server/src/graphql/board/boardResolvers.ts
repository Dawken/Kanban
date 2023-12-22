import { PrismaClient } from '@prisma/client'
import checkAuth from '../../middlewares/checkAuth'

const prisma = new PrismaClient()

const boardResolvers = {
    Query: {
        boards: checkAuth(async (_parent, _args, req) => {
            try {
                return await prisma.board.findMany({
                    where: {
                        userId: req.user.id,
                    },
                    include: {
                        status: true,
                    },
                })
            } catch (error) {
                throw new Error('failed-boards-fetch')
            }
        }),
    },
    Mutation: {
        createBoard: checkAuth(async (_parent, { boardName, status }, req) => {
            try {
                return await prisma.board.create({
                    data: {
                        boardName,
                        user: {
                            connect: {
                                id: req.user.id,
                            },
                        },
                        status: status
                            ? {
                                  create: status.map((statusName: string) => ({
                                      statusName,
                                  })),
                              }
                            : undefined,
                    },
                })
            } catch {
                throw new Error('failed-board-create')
            }
        }),
        editBoard: checkAuth(async (_parent, { boardId, boardName }) => {
            try {
                const board = await prisma.board.findUnique({
                    where: { id: boardId },
                })
                if (!board) {
                    throw new Error('board-not-found')
                } else {
                    return await prisma.board.update({
                        where: { id: boardId },
                        data: {
                            boardName: boardName ?? board.boardName,
                        },
                    })
                }
            } catch (error) {
                throw new Error('failed-board-edit')
            }
        }),
        deleteBoard: checkAuth(async (_parent, { boardId }) => {
            try {
                const board = await prisma.board.findUnique({
                    where: { id: boardId },
                })
                if (!board) {
                    throw new Error('board-not-found')
                } else {
                    return await prisma.board.delete({
                        where: { id: boardId },
                        include: {
                            status: true,
                        },
                    })
                }
            } catch {
                throw new Error('failed-board-delete')
            }
        }),
    },
}

export default boardResolvers
