import React from 'react'
import Image from 'next/image'
import Logo from '../../../../public/assets/logo.png'
import SignInPhoto from '../../../../public/assets/signInPhoto.png'
import Link from 'next/link'
import LoginForm from '@src/app/(auth)/login/loginForm/loginForm'
import { InputAdornment, TextField } from '@mui/material'
import ClipBoardCopy from '@src/components/ui/copyToClipboard'

const Login = () => {
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <Image
                src={Logo}
                alt='Kanban logo'
                className='absolute z-10 left-1 top-1'
                width={60}
                quality={100}
            />
            <div className='lg:w-2/3 m-5 bg-gradient-to-br from-[#00dffc] flex to-[#00ff82] items-center rounded-2xl border-[rgba(255,255,255,0)] [box-shadow:0px_0px_31px_9px_rgba(0,_0,_0,_1)] overflow-hidden relative'>
                <div className='flex flex-col bg-[#141414] w-full lg:w-2/3 mr-auto rounded-2xl'>
                    <div className='mx-5 my-10 lg:w-3/5'>
                        <div className='text-4xl md:m-5 text-center m-3'>
                            Login
                        </div>
                        <LoginForm />
                        <div className='flex justify-center m-5'>
                            Create new account
                            <Link
                                href='/register'
                                className='text-green-300 underline ml-2'
                            >
                                Sign up
                            </Link>
                        </div>
                        <div className='m-5 flex justify-around items-center gap-2'>
                            <hr className='my-4 border-t border-[#474747] w-full' />
                            or
                            <hr className='my-4 border-t border-[#474747] w-full' />
                        </div>
                        <div className='m-5 space-y-8'>
                            <div className='text-center font-bold'>
                                Try test account
                            </div>
                            <TextField
                                className='h-[7vh]'
                                label='Login'
                                variant='outlined'
                                fullWidth
                                focused
                                value='Test'
                                disabled
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <ClipBoardCopy text={'Test'} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                className='h-[7vh]'
                                label='Password'
                                variant='outlined'
                                fullWidth
                                focused
                                value='Test123!'
                                disabled
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <ClipBoardCopy text={'Test123!'} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className='hidden lg:flex justify-center items-start w-1/3'>
                    <Image
                        src={SignInPhoto}
                        alt='Sign In Form Photo'
                        className='absolute w-[37vw] right-0 bottom-0'
                        quality={100}
                    />
                </div>
            </div>
        </div>
    )
}

export default Login
