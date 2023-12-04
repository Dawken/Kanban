'use client'
import React from 'react'
import { FormProvider } from 'react-hook-form'
import useRegister from '@src/app/(auth)/register/registerForm/useRegisterForm'
import FormInput from '@src/components/ui/formInput'
import { IconButton, InputAdornment, CircularProgress } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import ClearIcon from '@mui/icons-material/Clear'
import PasswordStrength from '@src/app/(auth)/register/registerForm/passwordStrength'
import FormButton from '@src/components/ui/formButton'

const RegisterForm = () => {
    const {
        methods,
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        password,
        addUser,
        loading,
        error,
    } = useRegister()

    return (
        <FormProvider {...methods}>
            <form
                className='flex flex-col items-center space-y-10 m-5 mt-10'
                onSubmit={methods.handleSubmit((registerFormData) =>
                    addUser(registerFormData)
                )}
            >
                <div className='max-md:space-y-10 w-full gap-10 md:flex'>
                    <FormInput name='name' label='Name' />
                    <FormInput name='lastName' label='Last name' />
                </div>
                <FormInput name='login' label='Login' />
                <div className='w-full space-y-5'>
                    <FormInput
                        name='password'
                        label='Password'
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
                    <PasswordStrength password={password} />
                    <FormInput
                        name='repeatPassword'
                        label='Repeat password'
                        type={showPassword ? 'text' : 'password'}
                    />
                </div>
                <FormButton loading={loading} error={error} text={'Sign Up'} />
            </form>
        </FormProvider>
    )
}

export default RegisterForm
