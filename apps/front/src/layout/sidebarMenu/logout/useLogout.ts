import { useMutation } from '@apollo/client'
import { LOGOUT_USER } from '@src/graphQL/auth/mutations'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const useLogout = () => {
    const router = useRouter()

    const [logoutUser, { loading }] = useMutation(LOGOUT_USER, {
        onCompleted: () => {
            router.push('/login')
            toast.success('Your session has expired')
        },
        onError: () => {
            toast.error('Logout failed')
        },
    })

    return {
        logoutUser,
        loading,
    }
}

export default useLogout
