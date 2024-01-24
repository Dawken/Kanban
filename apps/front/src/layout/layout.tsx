import React, { ComponentType } from 'react'
import SidebarMenu from '@src/layout/sidebarMenu/sidebarMenu'
import AuthProvider from '@src/shared/authProvider'

const Layout = (Component: ComponentType) => {
    return function view() {
        return (
            <div className='flex'>
                <SidebarMenu />
                <AuthProvider>
                    <div className='overflow-hidden flex-1 mx-10'>
                        <Component />
                    </div>
                </AuthProvider>
            </div>
        )
    }
}

export default Layout
