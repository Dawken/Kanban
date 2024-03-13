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
                    backgroundImage:
                        'linear-gradient(rgba(25, 25, 25, 1), rgba(25, 25, 25, 1))',
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                FormHelperTextProps: {
                    style: {
                        marginLeft: '0',
                    },
                },
            },
        },
    },
})
export { darkTheme }
