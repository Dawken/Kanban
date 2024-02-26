import React from 'react'
import Image from 'next/image'
import NotFoundImage from '../../public/assets/404.png'
import DashboardButton from '@src/app/notFound/dashboardButton'

const NotFoundPage = () => {
    return (
        <div className='w-full h-full flex flex-col items-center justify-center gap-12'>
            <h1 className='text-5xl text-white'>Page not found</h1>
            <Image
                src={NotFoundImage}
                alt={'Not found image'}
                className='w-[70vw] min-w-[200px] max-w-[600px] '
                quality={100}
            />
            <DashboardButton />
        </div>
    )
}

export default NotFoundPage
