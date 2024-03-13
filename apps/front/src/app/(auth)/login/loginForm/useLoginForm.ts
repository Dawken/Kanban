import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '@src/graphQL/auth/mutations'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { getClientResponse } from '@src/context/redux/user'

type LoginCredentialsProps = {
    login: string
    password: string
}
const useLoginForm = () => {
    const router = useRouter()

    const [isCredentialsInvalid, setIsCredentialsInvalid] = useState(false)

    const dispatch = useDispatch()

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        onCompleted: () => {
            dispatch(getClientResponse({ isLoggedIn: true }))
            router.push('/')
            toast.success('Login succeed')
        },
        onError: (error) => {
            if (error.message === 'authentication-failed') {
                setIsCredentialsInvalid(true)
            }
            toast.error('Login failed')
        },
    })

    const login = () => {
        return methods.handleSubmit((loginFormData) =>
            loginUser({
                variables: loginFormData,
            })
        )
    }

    const methods = useForm<LoginCredentialsProps>()

    return {
        methods,
        login,
        loading,
        isCredentialsInvalid,
    }
}

export default useLoginForm
