import checkAuth from '../../middlewares/checkAuth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const statusResolvers = {
    Mutation: {
        createStatus: checkAuth(async (_parent, { statusName, boardId }) => {
            try {
                const existingStatusCount = await prisma.status.count({
                    where: { boardId: boardId },
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
        updateStatusOrder: checkAuth(async (_parent, { newStatusOrder }) => {
            try {
                for (const updatedStatus of newStatusOrder) {
                    await prisma.status.update({
                        where: { id: updatedStatus.id },
                        data: { order: updatedStatus.order },
                    })
                }
            } catch (error) {
                throw new Error('failed-status-update')
            }
        }),
    },
}
export default statusResolvers
