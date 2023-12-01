import { redirect } from 'next/navigation'
import { useAppSelector } from '@src/context/redux/store'
import { ComponentType } from 'react'

const PrivateRoutes = (Component: ComponentType) => {
    return function IsAuthenticated() {
        const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

        return isLoggedIn ? <Component /> : redirect('/login')
    }
}

export default PrivateRoutes
