import jwt from 'jsonwebtoken'
import { UserAccountProps } from '../types/userAccount'

const generateAccessToken = (userAccountData: UserAccountProps) => {
    return jwt.sign(userAccountData, process.env.TOKEN_SECRET, {
        expiresIn: '3600s', // 1 hour
    })
}

const generateRefreshToken = (userAccountData: UserAccountProps) => {
    return jwt.sign(userAccountData, process.env.TOKEN_SECRET, {
        expiresIn: '604800s', // 7 days
    })
}

export { generateAccessToken, generateRefreshToken }
