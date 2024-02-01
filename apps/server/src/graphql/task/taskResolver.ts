import { PrismaClient } from '@prisma/client'
import checkAuth from '../../middlewares/checkAuth'

const prisma = new PrismaClient()

const taskResolvers = {
    Mutation: {
        createTask: checkAuth(
            async (_parent, { taskName, description, statusId }) => {
                try {
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
                        },
                    })
                } catch {
                    throw new Error('failed-task-create')
                }
            }
        ),
    },
}
export default taskResolvers
