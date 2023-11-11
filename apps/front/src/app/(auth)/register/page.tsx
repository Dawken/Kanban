import React from 'react'
import RegisterForm from '@src/app/(auth)/register/registerForm'

const Register = () => {
    return (
        <div
            className='bg-cover bg-bottom bg-no-repeat bg-fixed overflow-x-hidden h-screen text-white font-raleway flex justify-center items-center'
            style={{
                backgroundImage: "url('../../../../assets/RegisterImage.jpg')",
            }}
        >
            <div className='h-3/5 bg-[linear-gradient(135deg,_rgba(255,_255,_255,_0.1),_rgba(255,255,255,0))] backdrop-filter backdrop-blur-[10px] rounded-xl border-[1px] border-[rgba(255,255,255,0)] [box-shadow:0_8px_32px_0_rgba(0,_0,_0,_0.37)] relative overflow-hidden'>
                <div className='top-0 absolute w-full h-4'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 1440 320'
                    >
                        <path
                            fill='#5000ca'
                            d='M0,96L30,122.7C60,149,120,203,180,192C240,181,300,107,360,112C420,117,480,203,540,250.7C600,299,660,309,720,282.7C780,256,840,192,900,170.7C960,149,1020,171,1080,170.7C1140,171,1200,149,1260,128C1320,107,1380,85,1410,74.7L1440,64L1440,0L1410,0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z'
                        ></path>
                    </svg>
                </div>
                <div className='text-white text-4xl flex justify-center items-center mt-24'>
                    Sign Up
                </div>
                <RegisterForm />
            </div>
        </div>
    )
}

export default Register
