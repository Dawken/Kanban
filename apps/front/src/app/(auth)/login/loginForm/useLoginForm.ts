import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '@src/graphQL/auth/mutations'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { LoginCredentials } from '@src/types/LoginCredentials'
import { useDispatch } from 'react-redux'
import { getClientResponse } from '@src/context/redux/user'

const useLoginForm = () => {
    const router = useRouter()

    const dispatch = useDispatch()

    const [showPassword, setShowPassword] = useState(false)
    const [isCredentialsInvalid, setIsCredentialsInvalid] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword((prevState) => !prevState)
    }

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault()
    }

    const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
        onCompleted: () => {
            dispatch(getClientResponse({ isLoggedIn: true }))
            toast.success('Login succeed')
            router.push('/')
        },
        onError: (error) => {
            if (error.message === 'authentication-failed') {
                setIsCredentialsInvalid(true)
            }
            toast.error('Login failed')
        },
    })

    const login = (formData: LoginCredentials) => {
        loginUser({
            variables: formData,
        })
    }

    const methods = useForm<LoginCredentials>()

    return {
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        methods,
        login,
        loading,
        error,
        isCredentialsInvalid,
    }
}

export default useLoginForm
