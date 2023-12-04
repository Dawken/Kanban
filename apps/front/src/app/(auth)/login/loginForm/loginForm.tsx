'use client'
import React from 'react'
import FormInput from '@src/components/ui/formInput'
import { CircularProgress, IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FormProvider } from 'react-hook-form'
import useLoginForm from '@src/app/(auth)/login/loginForm/useLoginForm'
import ClearIcon from '@mui/icons-material/Clear'
import FormButton from '@src/components/ui/formButton'

const LoginForm = () => {
    const {
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        methods,
        login,
        loading,
        error,
        isCredentialsInvalid,
    } = useLoginForm()

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
                        isCredentialsInvalid && 'Invalid login or password'
                    }
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='start'>
                                <IconButton
                                    aria-label='toggle password visibility'
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge='end'
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <FormButton loading={loading} error={error} text={'Sign In'} />
            </form>
        </FormProvider>
    )
}

export default LoginForm
