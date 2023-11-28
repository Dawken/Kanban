import { createTheme } from '@mui/material/styles'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#8a8a8a',
        },
        success: {
            main: '#00ff82',
        },
    },
    components: {
        MuiCircularProgress: {
            styleOverrides: {
                colorPrimary: {
                    color: 'black',
                },
            },
        },
    },
})
export { darkTheme }
