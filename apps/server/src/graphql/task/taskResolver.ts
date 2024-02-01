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
                } catch (error) {
                    console.log(error)
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
    },
}
export default taskResolvers
