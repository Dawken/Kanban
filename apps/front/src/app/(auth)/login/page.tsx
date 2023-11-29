import React from 'react'
import Image from 'next/image'
import Logo from '../../../../public/assets/logo.png'
import SignInPhoto from '../../../../public/assets/signInPhoto.png'
import Link from 'next/link'
import LoginForm from '@src/app/(auth)/login/loginForm/loginForm'
import TestAccount from '@src/app/(auth)/login/testAccount'

const Login = () => {
    return (
        <div className='min-h-screen text-white font-raleway flex justify-center items-center bg-black'>
            <Image
                src={Logo}
                alt='Kanban logo'
                className='absolute z-10 left-1 top-1'
                width={60}
                quality={100}
            />
            <div className='w-2/3 m-5 bg-gradient-to-br from-[#00dffc] flex to-[#00ff82] items-center rounded-2xl border-[rgba(255,255,255,0)] [box-shadow:0px_0px_31px_9px_rgba(0,_0,_0,_1)] overflow-hidden relative'>
                <div className='flex flex-col items-start bg-[#141414] w-full md:w-2/3 mr-auto rounded-2xl'>
                    <div className='mx-5 my-10 md:w-4/5'>
                        <div className='text-4xl md:m-5 text-center m-3'>
                            Sign In
                        </div>
                        <LoginForm />
                        <div className='flex justify-center items-center m-5'>
                            Create new account
                            <Link
                                href='/register'
                                className='text-green-300 underline ml-2'
                            >
                                Sign up
                            </Link>
                        </div>
                        <div className='m-5 flex justify-around items-center gap-2'>
                            <hr className='my-4 border-t border-white w-full' />
                            or
                            <hr className=' w-full my-4 border-t border-white' />
                        </div>
                        <TestAccount />
                    </div>
                </div>
                <div className='hidden md:flex justify-center items-start w-2/3'>
                    <Image
                        src={SignInPhoto}
                        alt='Sign In Form Photo'
                        className='absolute w-[40vw] right-0 bottom-0'
                        quality={100}
                    />
                </div>
            </div>
        </div>
    )
}

export default Login
