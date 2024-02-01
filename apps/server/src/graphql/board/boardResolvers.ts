import { PrismaClient } from '@prisma/client'
import checkAuth from '../../middlewares/checkAuth'

const prisma = new PrismaClient()

const boardResolvers = {
    Query: {
        board: checkAuth(async (_parent, { boardId }) => {
            try {
                return await prisma.board.findUnique({
                    where: { id: boardId },
                    include: {
                        status: {
                            include: {
                                task: true,
                            },
                        },
                    },
                })
            } catch {
                throw new Error('failed-board-fetch')
            }
        }),
        boards: checkAuth(async (_parent, _args, req) => {
            try {
                return await prisma.board.findMany({
                    where: {
                        userId: req.user.id,
                    },
                    include: {
                        status: true,
                    },
                    orderBy: {
                        order: 'asc',
                    },
                })
            } catch {
                throw new Error('failed-boards-fetch')
            }
        }),
    },
    Mutation: {
        createBoard: checkAuth(async (_parent, { boardName, status }, req) => {
            try {
                const existingBoardsCount = await prisma.board.count({
                    where: { userId: req.user.id },
                })
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
                        order: existingBoardsCount + 1,
                    },
                })
            } catch {
                throw new Error('failed-board-create')
            }
        }),
        updateBoardName: checkAuth(async (_parent, { boardId, boardName }) => {
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
                            boardName: boardName,
                        },
                    })
                }
            } catch {
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
                    const deletedBoard = await prisma.board.delete({
                        where: { id: boardId },
                        include: {
                            status: true,
                        },
                    })
                    await prisma.board.updateMany({
                        where: {
                            userId: board.userId,
                            order: { gt: board.order },
                        },
                        data: {
                            order: {
                                decrement: 1,
                            },
                        },
                    })
                    return deletedBoard
                }
            } catch {
                throw new Error('failed-board-delete')
            }
        }),
        updateBoardsOrder: checkAuth(async (_parent, { newBoardOrder }) => {
            try {
                for (const updatedBoard of newBoardOrder) {
                    await prisma.board.update({
                        where: { id: updatedBoard.id },
                        data: { order: updatedBoard.order },
                    })
                }
            } catch {
                throw new Error('failed-board-update')
            }
        }),
    },
}

export default boardResolvers
