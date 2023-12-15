import React from 'react'
import Logo from '../../../public/assets/logo.png'
import Image from 'next/image'
import Boards from '@src/layout/sidebarMenu/boards/boards'

const SidebarMenu = () => {
    return (
        <aside className='w-1/6 h-screen bg-[#0e0e0e] border-r border-[#00dffc] border-opacity-50 text-gray-400 text-sm'>
            <Image
                src={Logo}
                alt='Kanban logo'
                className='m-5'
                width={60}
                quality={100}
            />
            <Boards />
        </aside>
    )
}

export default SidebarMenu
