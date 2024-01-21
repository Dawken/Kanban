'use client'
import React, { ReactNode, useEffect } from 'react'
import { useAppSelector } from '@src/context/redux/store'
import { useRouter } from 'next/navigation'

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

    const router = useRouter()

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login')
        }
    }, [isLoggedIn, router])

    return <>{children}</>
}

export default AuthProvider
