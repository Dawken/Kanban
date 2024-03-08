import { useMutation } from '@apollo/client'
import { LOGOUT_USER } from '@src/graphQL/auth/mutations'
import { toast } from 'react-toastify'
import useLocalStorage from 'use-local-storage'

const useLogout = () => {
    const [, setIsLoggedId] = useLocalStorage('isLoggedIn', false)
    const [logoutUser, { loading }] = useMutation(LOGOUT_USER, {
        onCompleted: () => {
            setIsLoggedId(false)
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
