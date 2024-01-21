import checkAuth from '../../middlewares/checkAuth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const statusResolvers = {
    Mutation: {
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
                    return deletedStatus
                }
            } catch {
                throw new Error('failed-status-delete')
            }
        }),
    },
}
export default statusResolvers
