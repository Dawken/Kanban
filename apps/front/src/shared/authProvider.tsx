'use client'
import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useLocalStorage from 'use-local-storage'

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn] = useLocalStorage('isLoggedIn', false)

    const router = useRouter()

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login')
        }
    }, [isLoggedIn, router])

    return isLoggedIn ? children : null
}

export default AuthProvider
