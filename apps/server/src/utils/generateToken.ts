import jwt from 'jsonwebtoken'
import { UserAccount } from '../types/UserAccount'

const generateAccessToken = (userAccountData: UserAccount) => {
    return jwt.sign(userAccountData, process.env.TOKEN_SECRET, {
        expiresIn: '3600s', // 1 hour
    })
}

const generateRefreshToken = (userAccountData: UserAccount) => {
    return jwt.sign(userAccountData, process.env.TOKEN_SECRET, {
        expiresIn: '604800s', // 7 days
    })
}

export { generateAccessToken, generateRefreshToken }
