import { Resolver } from '@apollo/client'
import { Request } from 'express'

const checkAuth = (resolver: Resolver) => {
    return async (
        _parent: unknown,
        _args: unknown,
        { req }: { req: Request }
    ) => {
        if (!req.user) {
            throw new Error('Unauthorized')
        }

        return resolver(_parent, _args, req)
    }
}

export default checkAuth
