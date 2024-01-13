import React, { ComponentType } from 'react'
import SidebarMenu from '@src/layout/sidebarMenu/sidebarMenu'
import AuthProvider from '@src/shared/authProvider'

const Layout = (Component: ComponentType) => {
    return function view() {
        return (
            <div className='flex'>
                <SidebarMenu />
                <AuthProvider>
                    <Component />
                </AuthProvider>
            </div>
        )
    }
}

export default Layout
