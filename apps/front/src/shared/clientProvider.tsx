'use client'
import React, { ReactNode } from 'react'
import { darkTheme } from '@src/themes/customMuiThemes'
import { ThemeProvider } from '@mui/material/styles'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ApolloProvider } from '@apollo/client'
import createApolloClient from '@src/lib/apolloClientConfig'
import { Provider } from 'react-redux'
import { store } from '@src/context/redux/store'

const ClientProvider = ({ children }: { children: ReactNode }) => {
    const client = createApolloClient()

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
