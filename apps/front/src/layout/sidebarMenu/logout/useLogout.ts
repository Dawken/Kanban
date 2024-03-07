import { useMutation } from '@apollo/client'
import { LOGOUT_USER } from '@src/graphQL/auth/mutations'
import { toast } from 'react-toastify'

const useLogout = () => {
    const [logoutUser, { loading }] = useMutation(LOGOUT_USER, {
        onCompleted: () => {
            window.location.href = '/login'
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
