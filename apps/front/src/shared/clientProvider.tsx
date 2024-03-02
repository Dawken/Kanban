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
import { StyledEngineProvider } from '@mui/material'

const ClientProvider = ({ children }: { children: ReactNode }) => {
    return (
        <Provider store={store}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={darkTheme}>
                    <ApolloProvider client={client}>{children}</ApolloProvider>
                    <ToastContainer
                        position='bottom-left'
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
            </StyledEngineProvider>
        </Provider>
    )
}

export default ClientProvider
