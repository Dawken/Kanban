import React from 'react'
import RegisterForm from '@src/app/(auth)/register/registerForm/registerForm'
import Image from 'next/image'
import SignUpPhoto from '../../../../public/assets/signUpPhoto.png'
import Logo from '../../../../public/assets/logo.png'
import Link from 'next/link'

const Register = () => {
    return (
        <div className='min-h-screen text-white font-raleway flex justify-center items-center bg-black'>
            <Image
                src={Logo}
                alt='Kanban logo'
                className='absolute z-10 left-1 top-1'
                width={60}
                quality={100}
            />
            <div className='md:w-3/4 m-5 bg-gradient-to-br from-[#00dffc] flex to-[#00ff82] items-center rounded-2xl border-[rgba(255,255,255,0)] [box-shadow:0_8px_32px_0_rgba(0,_0,_0,_0.37)] relative'>
                <div className='hidden md:flex justify-center items-start w-1/3'>
                    <div className='text-4xl text-black text-start absolute top-10 m-10'>
                        Memorize your tasks with Kanban
                    </div>
                    <Image
                        src={SignUpPhoto}
                        alt='Register Form Photo'
                        className='absolute w-[30vw] left-10 bottom-5'
                        quality={100}
                    />
                </div>
                <div className='flex flex-col items-end bg-[#141414] w-full md:w-2/3 ml-auto rounded-2xl'>
                    <div className='mx-5 my-10 md:w-4/5'>
                        <div className='text-4xl md:m-5 max-md:text-center m-3'>
                            Create Account
                        </div>
                        <RegisterForm />
                        <div className='m-5 flex justify-around items-center gap-2'>
                            <hr className='my-4 border-t border-white w-full' />
                            or
                            <hr className=' w-full my-4 border-t border-white' />
                        </div>
                        <div className='flex justify-center items-center m-5'>
                            <Link
                                href='/login'
                                className='text-green-300 font-bold underline mr-2'
                            >
                                Login
                            </Link>
                            with an existing account
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
