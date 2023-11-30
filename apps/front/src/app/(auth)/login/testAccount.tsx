'use client'
import React, { useState } from 'react'
import { darkTheme } from '@src/themes/customMuiThemes'
import { ThemeProvider } from '@mui/material/styles'
import { InputAdornment, TextField } from '@mui/material'
import ClipBoardCopy from '@src/components/ui/copyToClipboard'

const TestAccount = () => {
    const [account] = useState({
        login: 'Test',
        password: 'Test123!',
    })

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
                    value={account.login}
                    disabled
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <ClipBoardCopy text={account.login} />
                            </InputAdornment>
                        ),
                    }}
                />
                <TextField
                    className='h-[7vh]'
                    label='Password'
                    variant='outlined'
                    fullWidth
                    focused
                    value={account.password}
                    disabled
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <ClipBoardCopy text={account.password} />
                            </InputAdornment>
                        ),
                    }}
                />
            </ThemeProvider>
        </div>
    )
}

export default TestAccount
