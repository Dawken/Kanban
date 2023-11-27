import React, { useCallback, useEffect, useState } from 'react'
import {
    Unstable_Popup as BasePopup,
    PopupChildrenProps,
} from '@mui/base/Unstable_Popup'
import { styled, Theme } from '@mui/system'

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

    const [anchor, setAnchor] = useState<HTMLElement | null>(null)

    return (
        <div
            className='w-full h-1 max-md:mt-2 text-white rounded-tl-[0] rounded-br-[0.2rem] rounded-tr-[0] rounded-bl-[0.2rem]'
            ref={setAnchor}
        >
            <div
                className='h-1 rounded-tl-[0] rounded-br-[0.2rem] rounded-tr-[0] rounded-bl-[0.2rem] [transition:all_0.5s_ease-out]'
                style={{
                    width: `${progress}%`,
                    backgroundColor: getActiveColor(),
                }}
            />
            <BasePopup
                anchor={anchor}
                open={progress === 100 ? false : progress > 0}
                withTransition
                placement={'bottom-end'}
            >
                {(props: PopupChildrenProps) => (
                    <PopAnimation {...props}>
                        <PopupBody>
                            Password require:
                            <br />
                            • 1 capital letter
                            <br />
                            • 1 special symbol(!,@,#,$,%,^,&,*)
                            <br />
                            • 1 number
                            <br />• 8 symbols
                        </PopupBody>
                    </PopAnimation>
                )}
            </BasePopup>
        </div>
    )
}
function Animated(
    props: React.PropsWithChildren<{
        className?: string
        requestOpen: boolean
        onEnter: () => void
        onExited: () => void
    }>
) {
    const { requestOpen, onEnter, onExited, children, className } = props

    useEffect(() => {
        if (requestOpen) {
            onEnter()
        }
    }, [onEnter, requestOpen])

    const handleAnimationEnd = useCallback(() => {
        if (!requestOpen) {
            onExited()
        }
    }, [onExited, requestOpen])

    return (
        <div
            onAnimationEnd={handleAnimationEnd}
            className={className + (requestOpen ? ' open' : ' close')}
        >
            {children}
        </div>
    )
}

const PopAnimation = styled(Animated)`
    @keyframes open-animation {
        0% {
            opacity: 0;
            transform: translateY(-8px) scale(0.95);
        }

        50% {
            opacity: 1;
            transform: translateY(4px) scale(1.05);
        }

        100% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    @keyframes close-animation {
        0% {
            opacity: 1;
            transform: translateY(0) scale(1);
        }

        50% {
            opacity: 1;
            transform: translateY(4px) scale(1.05);
        }

        100% {
            opacity: 0;
            transform: translateY(-8px) scale(0.95);
        }
    }

    &.open {
        animation: open-animation 0.4s ease-in forwards;
    }

    &.close {
        animation: close-animation 0.4s ease-in forwards;
    }
`

const grey = {
    50: '#f6f8fa',
    200: '#d0d7de',
    500: '#6e7781',
    700: '#424a53',
    900: '#24292f',
}

const PopupBody = styled('div')(
    ({ theme }: { theme: Theme }) => `
    width: max-content;
    padding: 0.5rem 1rem;
    margin: 8px;
    white-space: pre-line;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[900] : grey[900]};
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#FFF'};
    color: white;
    border-radius: 8px;
    box-shadow: ${
        theme.palette.mode === 'dark'
            ? '0px 4px 8px rgb(0 0 0 / 0.7)'
            : '0px 4px 8px rgb(0 0 0 / 0.1)'
    };
    min-height: 3rem;
    display: flex;
    align-items: center;
`
)

export default PasswordStrength
