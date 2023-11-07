import jwt from 'jsonwebtoken'
import { UserAccount } from './types/UserAccount'

const generateAccessToken = (userAccountData: UserAccount) => {
    return jwt.sign(userAccountData, process.env.TOKEN_SECRET, {
        expiresIn: '1800s',
    })
}
export default generateAccessToken
