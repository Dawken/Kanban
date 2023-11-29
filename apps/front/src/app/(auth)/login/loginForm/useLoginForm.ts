import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const useLoginForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () =>
        setShowPassword((prevState) => !prevState)

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault()
    }

    const methods = useForm()

    return {
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        methods,
    }
}

export default useLoginForm
