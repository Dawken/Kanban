import React, { ComponentType } from 'react'
import SidebarMenu from '@src/layout/sidebarMenu/sidebarMenu'

const Layout = (Component: ComponentType) => {
    return function view() {
        return (
            <div className='flex h-full'>
                <SidebarMenu />
                <div className='flex-1 overflow-hidden'>
                    <Component />
                </div>
            </div>
        )
    }
}

export default Layout
