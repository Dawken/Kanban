'use client'
import React from 'react'
import { FormProvider } from 'react-hook-form'
import useRegister from '@src/app/(auth)/register/registerForm/useRegisterForm'
import FormInput from '@src/components/ui/form/formInput'
import PasswordStrength from '@src/app/(auth)/register/registerForm/passwordStrength/passwordStrength'
import FormButton from '@src/components/ui/form/formButton'
import FormInputPassword from '@src/components/ui/form/formInputPassword'

const RegisterForm = () => {
    const { methods, password, addUser, loading } = useRegister()

    return (
        <FormProvider {...methods}>
            <form
                className='flex flex-col items-center gap-10 m-5 mt-10'
                onSubmit={addUser()}
            >
                <div className='max-md:flex max-md:flex-col w-full gap-10 md:flex'>
                    <FormInput name='name' label='Name' />
                    <FormInput name='lastName' label='Last name' />
                </div>
                <FormInput name='login' label='Login' />
                <div className='w-full flex flex-col gap-5'>
                    <FormInputPassword name='password' label='Password' />
                    <PasswordStrength password={password} />
                    <FormInputPassword
                        name='repeatPassword'
                        label='Repeat password'
                    />
                </div>
                <FormButton loading={loading} text={'Sign Up'} />
            </form>
        </FormProvider>
    )
}

export default RegisterForm
