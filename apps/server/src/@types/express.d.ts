import { UserAccountProps } from '../types/userAccount'

declare global {
    export namespace Express {
        export interface Request {
            user?: UserAccountProps
        }
    }
}
