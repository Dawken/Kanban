'use client'
import React from 'react'
import { FormProvider } from 'react-hook-form'
import { ThemeProvider } from '@mui/material/styles'
import useRegister from '@src/app/(auth)/register/useRegister'
import FormInput from '@src/shared/formInput'
import { darkTheme } from '@src/themes/customMuiThemes'

const RegisterForm = () => {
    const { methods } = useRegister()

    return (
        <FormProvider {...methods}>
            <ThemeProvider theme={darkTheme}>
                <form className='flex justify-center items-center m-16'>
                    <FormInput name='Login' label='Login' />
                </form>
            </ThemeProvider>
        </FormProvider>
    )
}

export default RegisterForm
