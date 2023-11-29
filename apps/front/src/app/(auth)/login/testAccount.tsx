'use client'
import React from 'react'
import { darkTheme } from '@src/themes/customMuiThemes'
import { ThemeProvider } from '@mui/material/styles'
import { TextField } from '@mui/material'

const TestAccount = () => {
    return (
        <div className='m-5 space-y-10'>
            <ThemeProvider theme={darkTheme}>
                <div className='text-center font-bold'>Try test account</div>
                <TextField
                    className='h-[7vh]'
                    label='Login'
                    variant='outlined'
                    fullWidth
                    focused
                    value={'Test'}
                />
                <TextField
                    className='h-[7vh]'
                    label='Password'
                    variant='outlined'
                    fullWidth
                    focused
                    value={'Test123!'}
                />
            </ThemeProvider>
        </div>
    )
}

export default TestAccount
