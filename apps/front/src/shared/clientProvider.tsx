'use client'
import React, { ReactNode } from 'react'
import { darkTheme } from '@src/themes/customMuiThemes'
import { ThemeProvider } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ApolloProvider } from '@apollo/client'
import { Provider } from 'react-redux'
import { store } from '@src/context/redux/store'
import client from '@src/lib/apolloClientConfig'

const ClientProvider = ({ children }: { children: ReactNode }) => {
    return (
        <Provider store={store}>
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
        </Provider>
    )
}

export default ClientProvider
