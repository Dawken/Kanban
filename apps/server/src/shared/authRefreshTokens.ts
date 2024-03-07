import {
    generateAccessToken,
    generateRefreshToken,
} from '../utils/generateToken'
import { UserAccountProps } from '../types/userAccount'

const authRefreshTokens = (user: UserAccountProps) => {
    const authToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    const expiresAuthToken = new Date(Date.now() + 3600 * 1000 * 24) // 1 day
    const expiresRefreshToken = new Date(
        Date.now() + 3600 * 1000 * 24 * 7 // 7 days
    )

    return {
        authToken,
        refreshToken,
        expiresAuthToken,
        expiresRefreshToken,
    }
}
export default authRefreshTokens
