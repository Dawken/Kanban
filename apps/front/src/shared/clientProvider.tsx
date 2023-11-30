'use client'
import React, { ReactNode } from 'react'
import { darkTheme } from '@src/themes/customMuiThemes'
import { ThemeProvider } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ApolloProvider } from '@apollo/client'
import createApolloClient from '@src/lib/apolloClientConfig'

const ClientProvider = ({ children }: { children: ReactNode }) => {
    const client = createApolloClient()

    return (
        <ThemeProvider theme={darkTheme}>
            <ApolloProvider client={client}>{children}</ApolloProvider>
            <ToastContainer
                position='top-left'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='dark'
            />
        </ThemeProvider>
    )
}

export default ClientProvider
