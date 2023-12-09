import React, { useEffect, useState } from 'react'
import { Fade, Paper, Popper, Typography } from '@mui/material'

const PasswordStrength = ({ password }: { password: string }) => {
    const [progress, setProgress] = useState(0)

    const getActiveColor = () => {
        if (progress === 100) {
            return '#00ff82'
        } else if (progress < 100 && progress > 25) {
            return '#ffd600'
        } else {
            return '#ff0000'
        }
    }

    useEffect(() => {
        const strengthCheck = {
            length: password && password.length > 7,
            hasUpperCase: /(?=.*[A-Z])/.test(password), // String must contain at least one uppercase letter
            hasLowerCase: password && /[a-z]+/.test(password), // String must contain at least one lowercase letter
            hasNumber: /(?=.*[0-9])/.test(password), // String must contain at least 1 number
            hasSpecialChar: /(?=.*[^A-Za-z0-9])/.test(password), // String must contain at least one special character
        }

        const verifiedList = Object.values(strengthCheck).filter(
            (value) => value
        )

        setProgress((verifiedList.length / 5) * 100)
    }, [password])

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

    return (
        <div
            className='w-full h-1 text-white rounded-tl-[0] rounded-br-[0.2rem] rounded-tr-[0] rounded-bl-[0.2rem]'
            ref={setAnchorEl}
        >
            <div
                className='h-1 rounded-tl-[0] rounded-br-[0.2rem] rounded-tr-[0] rounded-bl-[0.2rem] [transition:all_0.5s_ease-out]'
                style={{
                    width: `${progress}%`,
                    backgroundColor: getActiveColor(),
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
                            <Typography sx={{ p: 2 }}>
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
