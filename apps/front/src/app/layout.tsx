import type { Metadata, Viewport } from 'next'
import '@src/styles/global.css'
import { ReactNode } from 'react'
import ClientProvider from '@src/shared/clientProvider'
import NextTopLoader from 'nextjs-toploader'

export const metadata: Metadata = {
    title: 'Kanban board',
}
export const viewport: Viewport = {
    maximumScale: 1,
    userScalable: false,
}

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang='en'>
            <body className='bg-black w-screen h-[100dvh] font-raleway overflow-x-hidden overflow-y-hidden'>
                <link rel='icon' href='/images/favicon.ico' />
                <NextTopLoader color={'#00ff82'} showSpinner={false} />
                <ClientProvider>{children}</ClientProvider>
            </body>
        </html>
    )
}
export default RootLayout
