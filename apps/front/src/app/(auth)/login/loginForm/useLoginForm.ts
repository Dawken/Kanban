import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '@src/graphQL/auth/mutations'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { LoginCredentials } from '@src/types/LoginCredentials'

const useLoginForm = () => {
    const router = useRouter()

    const [showPassword, setShowPassword] = useState(false)

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
            toast.success('Login succeed')
            router.push('/')
        },
        onError: (error) => {
            console.log(error)
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
    }
}

export default useLoginForm
