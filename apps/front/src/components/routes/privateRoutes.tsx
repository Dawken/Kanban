import { useRouter } from 'next/navigation'
import { useAppSelector } from '@src/context/redux/store'
import React, { ComponentType } from 'react'
import SidebarMenu from '@src/layout/sidebarMenu/sidebarMenu'

const PrivateRoutes = (Component: ComponentType) => {
    return function IsAuthenticated() {
        const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

        const router = useRouter()

        if (!isLoggedIn) {
            router.push('/login')
            return null
        }

        return (
            <div className='flex'>
                <SidebarMenu />
                <Component />
            </div>
        )
    }
}

export default PrivateRoutes
