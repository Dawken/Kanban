'use client'
import React from 'react'
import { FormProvider } from 'react-hook-form'
import useRegister from '@src/app/(auth)/register/registerForm/useRegisterForm'
import FormInput from '@src/components/ui/formInput'
import { IconButton, InputAdornment, CircularProgress } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import ClearIcon from '@mui/icons-material/Clear'
import PasswordStrength from '@src/app/(auth)/register/registerForm/passwordStrength'

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
                onSubmit={methods.handleSubmit((formv) => addUser(formv))}
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
                <button className='w-full m-5 flex justify-center items-center text-black font-bold h-12 border-[none] rounded uppercase [transition:0.5s] [background-size:220%_auto] bg-[linear-gradient(to_right,_#00dffc_0%,_#00ff82_51%,_#00dffc_100%)] hover:bg-[right_center]'>
                    {loading ? (
                        <CircularProgress size={25} />
                    ) : !error ? (
                        'Sign Up'
                    ) : (
                        <ClearIcon />
                    )}
                </button>
            </form>
        </FormProvider>
    )
}

export default RegisterForm
