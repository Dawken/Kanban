'use client'
import React from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { useRouter } from 'next/navigation'

const DashboardButton = () => {
    const router = useRouter()

    const changeRoute = () => {
        router.push('/')
    }

    return (
        <div className='flex justify-center lg:justify-start items-center gap-2 text-sm text-white font-sans font-medium'>
            <button
                className='h-10 px-3 hover:bg-blue-500 bg-blue-600 transition-all duration-500 rounded flex items-center justify-center gap-2'
                onClick={changeRoute}
            >
                <KeyboardBackspaceIcon />
                Take me to Dashboard
            </button>
        </div>
    )
}

export default DashboardButton
