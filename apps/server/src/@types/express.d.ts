import { UserAccount } from '../types/userAccount'

declare global {
    export namespace Express {
        export interface Request {
            user?: UserAccount
        }
    }
}
