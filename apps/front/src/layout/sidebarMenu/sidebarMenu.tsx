import React from 'react'
import Boards from '@src/layout/sidebarMenu/boards/boards'
import Logout from '@src/layout/sidebarMenu/logout/logout'
import useSidebarMenu from '@src/layout/sidebarMenu/useSidebarMenu'
import LogoSection from '@src/layout/sidebarMenu/logoSection/logoSection'

const SidebarMenu = () => {
    const { expanded } = useSidebarMenu()

    return (
        <aside
            className={`${
                expanded ? 'w-72' : 'w-24'
            } transition-all duration-500 h-screen bg-[#0e0e0e] border-r border-[#00dffc] border-opacity-50 text-gray-400 text-sm relative`}
        >
            <div className='w-full flex place-content-around items-center h-24 gap-32'>
                <LogoSection expanded={expanded} />
            </div>
            <Boards expanded={expanded} />
            <Logout expanded={expanded} />
        </aside>
    )
}

export default SidebarMenu
