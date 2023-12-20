import { UserAccount } from '../types/UserAccount'

declare global {
    export namespace Express {
        export interface Request {
            user?: UserAccount
        }
    }
}
