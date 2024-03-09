import React, { FC } from 'react'
import FormInput from '@src/components/ui/form/formInput'
import { IconButton, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FormInputProps } from '@src/types/formInputProps'
import useToggleOpen from '@src/hooks/useToggleOpen'

const FormInputPassword: FC<FormInputProps> = ({ name, ...otherProps }) => {
    const { open: showPassword, toggleOpen } = useToggleOpen()

    return (
        <FormInput
            name={name}
            {...otherProps}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
                endAdornment: (
                    <InputAdornment position='start'>
                        <IconButton
                            aria-label='toggle password visibility'
                            onClick={toggleOpen}
                            edge='end'
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    )
}

export default FormInputPassword
