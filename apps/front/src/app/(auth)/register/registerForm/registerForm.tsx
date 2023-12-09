'use client'
import React from 'react'
import { FormProvider } from 'react-hook-form'
import useRegister from '@src/app/(auth)/register/registerForm/useRegisterForm'
import FormInput from '@src/components/ui/formInput/formInput'
import PasswordStrength from '@src/app/(auth)/register/registerForm/passwordStrength'
import FormButton from '@src/components/ui/formButton'

const RegisterForm = () => {
    const { methods, password, addUser, loading, error } = useRegister()

    return (
        <FormProvider {...methods}>
            <form
                className='max-sm:space-y-14 flex flex-col items-center space-y-10 m-5 mt-10'
                onSubmit={methods.handleSubmit((registerFormData) =>
                    addUser(registerFormData)
                )}
            >
                <div className='max-sm:space-y-14 w-full gap-10 md:flex'>
                    <FormInput name='name' label='Name' />
                    <FormInput name='lastName' label='Last name' />
                </div>
                <FormInput name='login' label='Login' />
                <div className='max-sm:space-y-7 w-full space-y-5'>
                    <FormInput
                        name='password'
                        label='Password'
                        isPassword={true}
                    />
                    <PasswordStrength password={password} />
                    <FormInput
                        name='repeatPassword'
                        label='Repeat password'
                        isPassword={true}
                    />
                </div>
                <FormButton loading={loading} error={error} text={'Sign Up'} />
            </form>
        </FormProvider>
    )
}

export default RegisterForm
