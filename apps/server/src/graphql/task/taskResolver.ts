import { PrismaClient } from '@prisma/client'
import checkAuth from '../../middlewares/checkAuth'

const prisma = new PrismaClient()

const taskResolvers = {
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
    },
}
export default taskResolvers
