'use client'
import React from 'react'
import { FormProvider } from 'react-hook-form'
import useRegister from '@src/app/(auth)/register/useRegister'
import FormInput from '@src/shared/formInput'

const RegisterForm = () => {
    const { methods } = useRegister()

    return (
        <FormProvider {...methods}>
            <form className='flex justify-center items-center m-16'>
                <FormInput name='login' label='login' />
            </form>
        </FormProvider>
    )
}

export default RegisterForm
