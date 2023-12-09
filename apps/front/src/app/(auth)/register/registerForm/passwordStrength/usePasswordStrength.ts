import { useEffect, useState } from 'react'

const usePasswordStrength = (password: string) => {
    const [progress, setProgress] = useState(0)

    const getActiveColor = () => {
        if (progress === 100) {
            return '#00ff82'
        } else if (progress < 100 && progress > 25) {
            return '#ffd600'
        } else {
            return '#ff0000'
        }
    }

    useEffect(() => {
        const strengthCheck = {
            length: password && password.length > 7,
            hasUpperCase: /(?=.*[A-Z])/.test(password), // String must contain at least one uppercase letter
            hasLowerCase: password && /[a-z]+/.test(password), // String must contain at least one lowercase letter
            hasNumber: /(?=.*[0-9])/.test(password), // String must contain at least 1 number
            hasSpecialChar: /(?=.*[^A-Za-z0-9])/.test(password), // String must contain at least one special character
        }

        const verifiedList = Object.values(strengthCheck).filter(
            (value) => value
        )

        setProgress((verifiedList.length / 5) * 100)
    }, [password])

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

    return {
        progress,
        getActiveColor,
        anchorEl,
        setAnchorEl,
    }
}

export default usePasswordStrength
