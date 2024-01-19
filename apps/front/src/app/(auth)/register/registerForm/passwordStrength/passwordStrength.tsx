import { Fade, Paper, Popper, Typography } from '@mui/material'
import usePasswordStrength from '@src/app/(auth)/register/registerForm/passwordStrength/usePasswordStrength'

const PasswordStrength = ({ password }: { password: string }) => {
    const { progress, activeColor, anchorEl, setAnchorEl } =
        usePasswordStrength(password)

    return (
        <div
            className='w-full h-1 text-white rounded-tl-[0] rounded-br-[0.2rem] rounded-tr-[0] rounded-bl-[0.2rem]'
            ref={setAnchorEl}
        >
            <div
                className='h-1 rounded-tl-[0] rounded-br-[0.2rem] rounded-tr-[0] rounded-bl-[0.2rem] [transition:all_0.5s_ease-out]'
                style={{
                    width: `${progress}%`,
                    backgroundColor: activeColor,
                }}
            />

            <Popper
                open={progress === 100 ? false : progress > 0}
                anchorEl={anchorEl}
                placement={'bottom-end'}
                transition
                className='z-10'
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                            <Typography className='p-3'>
                                Password requires:
                                <br />
                                • 1 Capital letter
                                <br />
                                • 1 Lowercase letter
                                <br />
                                • 1 Special symbol(!,@,#,$,%,^,&,*)
                                <br />
                                • 1 Number
                                <br />• 8 Symbols
                            </Typography>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </div>
    )
}

export default PasswordStrength
