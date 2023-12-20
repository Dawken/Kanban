import { useRouter } from 'next/navigation'
import { useAppSelector } from '@src/context/redux/store'
import { ComponentType } from 'react'

const PrivateRoutes = (Component: ComponentType) => {
    return function IsAuthenticated() {
        const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

        const router = useRouter()

        if (!isLoggedIn) {
            router.push('/login')
            return null
        }

        return <Component />
    }
}

export default PrivateRoutes
