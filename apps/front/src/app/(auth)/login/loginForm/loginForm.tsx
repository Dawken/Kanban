'use client'
import React from 'react'
import FormInput from '@src/components/ui/formInput/formInput'
import { FormProvider } from 'react-hook-form'
import useLoginForm from '@src/app/(auth)/login/loginForm/useLoginForm'
import FormButton from '@src/components/ui/formButton'

const LoginForm = () => {
    const { methods, login, loading, error, isCredentialsInvalid } =
        useLoginForm()

    return (
        <FormProvider {...methods}>
            <form
                className='flex flex-col items-center space-y-8 m-5 mt-10'
                onSubmit={methods.handleSubmit((loginFormData) =>
                    login(loginFormData)
                )}
            >
                <FormInput
                    name='login'
                    label='Login'
                    color='primary'
                    error={isCredentialsInvalid}
                    required
                />
                <FormInput
                    name='password'
                    label='Password'
                    color='primary'
                    error={isCredentialsInvalid}
                    required
                    helperText={
                        isCredentialsInvalid && 'Incorrect login or password'
                    }
                    isPassword={true}
                />
                <FormButton loading={loading} error={error} text={'Sign In'} />
            </form>
        </FormProvider>
    )
}

export default LoginForm
