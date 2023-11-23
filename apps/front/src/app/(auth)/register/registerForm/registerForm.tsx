'use client'
import React from 'react'
import { FormProvider } from 'react-hook-form'
import { ThemeProvider } from '@mui/material/styles'
import useRegister from '@src/app/(auth)/register/registerForm/useRegisterForm'
import FormInput from '@src/shared/formInput'
import { darkTheme } from '@src/themes/customMuiThemes'
import { IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import PasswordStrength from '@src/app/(auth)/register/registerForm/passwordStrength'

const RegisterForm = () => {
    const {
        methods,
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        password,
    } = useRegister()

    return (
        <FormProvider {...methods}>
            <ThemeProvider theme={darkTheme}>
                <form
                    className='flex flex-col items-center gap-5 m-5 mt-10'
                    onSubmit={methods.handleSubmit((formv) =>
                        console.log(formv)
                    )}
                >
                    <div className='max-md:space-y-10 w-full gap-10 md:flex'>
                        <FormInput
                            name='name'
                            label='Name'
                            className='h-[7vh]'
                        />
                        <FormInput
                            name='lastName'
                            label='Last name'
                            className='h-[7vh]'
                        />
                    </div>
                    <FormInput
                        name='login'
                        label='Login'
                        className='m-5 h-[7vh]'
                    />
                    <FormInput
                        name='password'
                        label='Password'
                        type={showPassword ? 'text' : 'password'}
                        className='h-[7vh]'
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
                        className='h-[7vh]'
                    />
                    <div className='flex justify-center items-center w-full m-5'>
                        <button className='w-full h-12 border-[none] rounded text-center uppercase [transition:0.5s] [background-size:220%_auto] bg-[linear-gradient(to_right,_#6A00FF_0%,_#a64aff_51%,_#ffb1ff_100%)] hover:bg-[right_center]'>
                            Sign up
                        </button>
                    </div>
                </form>
            </ThemeProvider>
        </FormProvider>
    )
}

export default RegisterForm
