'use client'
import { ReactNode, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@src/context/redux/store'

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

    const router = useRouter()

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login')
        }
    }, [isLoggedIn, router])

    return isLoggedIn ? children : null
}

export default AuthProvider
