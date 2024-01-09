import React, { ComponentType } from 'react'
import SidebarMenu from '@src/layout/sidebarMenu/sidebarMenu'
import AuthProvider from '@src/shared/authProvider'

const Layout = (Component: ComponentType) => {
    return function view() {
        return (
            <AuthProvider>
                <SidebarMenu />
                <Component />
            </AuthProvider>
        )
    }
}

export default Layout
