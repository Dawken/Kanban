import checkAuth from '../../middlewares/checkAuth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const statusResolvers = {
    Mutation: {
        createStatus: checkAuth(async (_parent, { statusName, boardId }) => {
            try {
                const existingStatusCount = await prisma.status.count({
                    where: { boardId },
                })

                return prisma.status.create({
                    data: {
                        statusName,
                        board: {
                            connect: {
                                id: boardId,
                            },
                        },
                        order: existingStatusCount + 1,
                    },
                })
            } catch {
                throw new Error('failed-status-create')
            }
        }),
        updateStatusName: checkAuth(
            async (_parent, { statusId, statusName }) => {
                try {
                    const status = await prisma.status.findUnique({
                        where: { id: statusId },
                    })
                    if (!status) {
                        throw new Error('status-not-found')
                    } else {
                        return await prisma.status.update({
                            where: { id: statusId },
                            data: {
                                statusName,
                            },
                        })
                    }
                } catch {
                    throw new Error('failed-status-edit')
                }
            }
        ),
        deleteStatus: checkAuth(async (_parent, { statusId }) => {
            try {
                const status = await prisma.status.findUnique({
                    where: { id: statusId },
                })
                if (!status) {
                    throw new Error('status-not-found')
                } else {
                    const deletedStatus = await prisma.status.delete({
                        where: { id: statusId },
                    })
                    await prisma.status.updateMany({
                        where: {
                            boardId: status.boardId,
                            order: { gt: status.order },
                        },
                        data: {
                            order: {
                                decrement: 1,
                            },
                        },
                    })
                    return deletedStatus
                }
            } catch {
                throw new Error('failed-status-delete')
            }
        }),
        updateStatusOrder: checkAuth(async (_parent, { statusId, order }) => {
            return prisma
                .$transaction(async (transaction) => {
                    const oldStatus = await transaction.status.findUnique({
                        where: { id: statusId },
                    })

                    const status = await transaction.status.update({
                        where: { id: statusId },
                        data: {
                            order,
                        },
                    })

                    if (!status) {
                        throw new Error('status-not-found')
                    } else {
                        await transaction.status.updateMany({
                            where: {
                                boardId: oldStatus.boardId,
                                id: { not: statusId },
                                order:
                                    oldStatus.order < order
                                        ? { gte: oldStatus.order, lte: order }
                                        : {
                                              gte: order,
                                              lte: oldStatus.order,
                                          },
                            },
                            data: {
                                order:
                                    oldStatus.order < order
                                        ? { decrement: 1 }
                                        : { increment: 1 },
                            },
                        })

                        const updatedStatusList =
                            await transaction.status.findMany({
                                where: { boardId: oldStatus.boardId },
                                orderBy: [{ order: 'asc' }],
                            })

                        return updatedStatusList
                    }
                })
                .catch(() => {
                    throw new Error('failed-status-update')
                })
        }),
    },
}
export default statusResolvers
