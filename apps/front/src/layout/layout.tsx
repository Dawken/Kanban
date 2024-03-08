import React, { ComponentType } from 'react'
import SidebarMenu from '@src/layout/sidebarMenu/sidebarMenu'
import AuthProvider from '@src/shared/authProvider'

const Layout = (Component: ComponentType) => {
    return function view() {
        return (
            <div className='flex h-full'>
                <AuthProvider>
                    <SidebarMenu />
                    <div className='flex-1 overflow-hidden'>
                        <Component />
                    </div>
                </AuthProvider>
            </div>
        )
    }
}

export default Layout
