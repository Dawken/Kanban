'use client'
import React from 'react'
import FormInput from '@src/components/ui/formInput'
import { CircularProgress, IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FormProvider } from 'react-hook-form'
import useLoginForm from '@src/app/(auth)/login/loginForm/useLoginForm'
import ClearIcon from '@mui/icons-material/Clear'

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
                onSubmit={methods.handleSubmit((formv) => login(formv))}
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
                <button className='w-full m-5 flex justify-center items-center text-black font-bold h-12 border-[none] rounded uppercase [transition:0.5s] [background-size:220%_auto] bg-[linear-gradient(to_right,_#00dffc_0%,_#00ff82_51%,_#00dffc_100%)] hover:bg-[right_center]'>
                    {loading ? (
                        <CircularProgress size={25} />
                    ) : !error ? (
                        'Sign In'
                    ) : (
                        <ClearIcon />
                    )}
                </button>
            </form>
        </FormProvider>
    )
}

export default LoginForm
