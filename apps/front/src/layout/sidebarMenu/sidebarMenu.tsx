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
            } transition-all duration-500 bg-[#0e0e0e] border-r border-[#00dffc] border-opacity-50 text-gray-400 text-sm`}
        >
            <div
                className={`flex-1 ${
                    expanded ? 'max-lg:w-11/12' : 'w-full'
                } h-full flex flex-col justify-between`}
            >
                <LogoSection expanded={expanded} />
                <Boards expanded={expanded} />
                <Logout expanded={expanded} />
            </div>
        </aside>
    )
}

export default SidebarMenu
