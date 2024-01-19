import { createTheme } from '@mui/material/styles'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#00dffc',
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
        MuiDialog: {
            styleOverrides: {
                paper: {
                    backgroundColor: 'black',
                },
            },
        },
    },
})
export { darkTheme }
