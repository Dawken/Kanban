import jwt from 'jsonwebtoken'
import { UserAccount } from './types/UserAccount'

const generateAccessToken = (userAccountData: UserAccount) => {
    return jwt.sign(userAccountData, process.env.TOKEN_SECRET, {
        expiresIn: '15s',
    })
}

const generateRefreshToken = (userAccountData: UserAccount) => {
    return jwt.sign(userAccountData, process.env.TOKEN_SECRET, {
        expiresIn: '3600s',
    })
}

export { generateAccessToken, generateRefreshToken }
