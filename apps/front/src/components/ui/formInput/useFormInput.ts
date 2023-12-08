import React, { useState } from 'react'

const useFormInput = () => {
    const [isFocused, setIsFocused] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword((prevState) => !prevState)
    }

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault()
    }

    return {
        isFocused,
        setIsFocused,
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
    }
}

export default useFormInput
