import type { Metadata } from 'next'
import '@src/styles/global.css'
import { ReactNode } from 'react'
import ClientProvider from '@src/shared/clientProvider'

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang='en'>
            <body className='text-white font-raleway bg-black'>
                <ClientProvider>{children}</ClientProvider>
            </body>
        </html>
    )
}
export default RootLayout
