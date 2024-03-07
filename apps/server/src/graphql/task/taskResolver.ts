import { PrismaClient } from '@prisma/client'
import checkAuth from '../../middlewares/checkAuth'

const prisma = new PrismaClient()

const taskResolvers = {
    Query: {
        task: checkAuth(async (_parent, { taskId }) => {
            try {
                return await prisma.task.findUnique({
                    where: { id: taskId },
                })
            } catch {
                throw new Error('failed-task-fetch')
            }
        }),
        tasks: checkAuth(async (_parent, { boardId }) => {
            try {
                return await prisma.task.findMany({
                    where: {
                        status: {
                            boardId,
                        },
                    },
                    orderBy: [{ statusId: 'asc' }, { order: 'asc' }],
                })
            } catch {
                throw new Error('failed-tasks-fetch')
            }
        }),
    },
    Mutation: {
        createTask: checkAuth(
            async (_parent, { taskName, description, statusId }) => {
                try {
                    const existingTaskCount = await prisma.task.count({
                        where: { statusId },
                    })
                    return prisma.task.create({
                        data: {
                            taskName,
                            description,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                            status: {
                                connect: {
                                    id: statusId,
                                },
                            },
                            order: existingTaskCount + 1,
                        },
                    })
                } catch {
                    throw new Error('failed-task-create')
                }
            }
        ),
        updateTaskName: checkAuth(async (_parent, { taskName, taskId }) => {
            try {
                const status = await prisma.task.findUnique({
                    where: { id: taskId },
                })
                if (!status) {
                    throw new Error('task-not-found')
                } else {
                    return await prisma.task.update({
                        where: { id: taskId },
                        data: {
                            taskName: taskName,
                        },
                    })
                }
            } catch {
                throw new Error('failed-task-edit')
            }
        }),
        updateDescription: checkAuth(
            async (_parent, { description, taskId }) => {
                try {
                    const status = await prisma.task.findUnique({
                        where: { id: taskId },
                    })
                    if (!status) {
                        throw new Error('task-not-found')
                    } else {
                        return await prisma.task.update({
                            where: { id: taskId },
                            data: {
                                description,
                            },
                        })
                    }
                } catch {
                    throw new Error('failed-description-update')
                }
            }
        ),
        deleteTask: checkAuth(async (_parent, { taskId }) => {
            try {
                const task = await prisma.task.findUnique({
                    where: { id: taskId },
                })
                if (!task) {
                    throw new Error('task-not-found')
                } else {
                    const deletedTask = await prisma.task.delete({
                        where: { id: taskId },
                    })
                    await prisma.task.updateMany({
                        where: {
                            statusId: task.statusId,
                            order: { gt: task.order },
                        },
                        data: {
                            order: {
                                decrement: 1,
                            },
                        },
                    })
                    return deletedTask
                }
            } catch {
                throw new Error('failed-task-delete')
            }
        }),
        pushTask: checkAuth(
            async (_parent, { taskId, newStatusId, order, boardId }) => {
                try {
                    const oldTaskStatus = await prisma.task.findUnique({
                        where: { id: taskId },
                    })

                    const task = await prisma.task.update({
                        where: { id: taskId },
                        data: {
                            statusId: newStatusId,
                            order,
                        },
                        include: {
                            status: true,
                        },
                    })

                    if (!task) {
                        throw new Error('task-not-found')
                    } else {
                        await prisma.task.updateMany({
                            where: {
                                statusId: oldTaskStatus.statusId,
                                order: { gt: oldTaskStatus.order },
                                id: { not: taskId },
                            },
                            data: {
                                order: {
                                    decrement: 1,
                                },
                            },
                        })

                        await prisma.task.updateMany({
                            where: {
                                statusId: newStatusId,
                                order: { gte: order },
                                id: { not: taskId },
                            },
                            data: {
                                order: {
                                    increment: 1,
                                },
                            },
                        })
                        return task
                    }
                } catch {
                    throw new Error('failed-task-push')
                }
            }
        ),
    },
}
export default taskResolvers
