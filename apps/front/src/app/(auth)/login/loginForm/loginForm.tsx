'use client'
import React from 'react'
import FormInput from '@src/components/ui/form/formInput'
import { FormProvider } from 'react-hook-form'
import useLoginForm from '@src/app/(auth)/login/loginForm/useLoginForm'
import FormButton from '@src/components/ui/form/formButton'
import FormInputPassword from '@src/components/ui/form/formInputPassword'
import ErrorIcon from '@mui/icons-material/Error'

const LoginForm = () => {
    const { methods, login, loading, isCredentialsInvalid } = useLoginForm()

    return (
        <FormProvider {...methods}>
            <form
                className='flex flex-col items-center gap-8 m-5 mt-10'
                onSubmit={login()}
            >
                <FormInput
                    name='login'
                    label='Login'
                    color='primary'
                    error={isCredentialsInvalid}
                    required
                />
                <FormInputPassword
                    name='password'
                    label='Password'
                    color='primary'
                    error={isCredentialsInvalid}
                    required
                    helperText={
                        isCredentialsInvalid && (
                            <span className={'flex items-center text-xs gap-1'}>
                                <ErrorIcon className='text-base' /> Incorrect
                                login or password
                            </span>
                        )
                    }
                />
                <FormButton loading={loading} text={'Sign In'} />
            </form>
        </FormProvider>
    )
}

export default LoginForm
