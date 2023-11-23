import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TypeOf } from 'zod'
import registerSchema from './registerSchema'
import React, { useState } from 'react'

const useRegisterForm = () => {
    type RegisterInput = TypeOf<typeof registerSchema>

    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () =>
        setShowPassword((prevState) => !prevState)

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault()
    }

    const methods = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    })

    const password = methods.watch('password')

    return {
        methods,
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        password,
    }
}

export default useRegisterForm
