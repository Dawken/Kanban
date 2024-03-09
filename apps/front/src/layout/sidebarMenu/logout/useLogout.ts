import { useMutation } from '@apollo/client'
import { LOGOUT_USER } from '@src/graphQL/auth/mutations'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { getClientResponse } from '@src/context/redux/user'

const useLogout = () => {
    const dispatch = useDispatch()

    const [logoutUser, { loading }] = useMutation(LOGOUT_USER, {
        onCompleted: () => {
            dispatch(getClientResponse({ isLoggedIn: false }))
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
