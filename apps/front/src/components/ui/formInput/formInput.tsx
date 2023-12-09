import {
    IconButton,
    InputAdornment,
    TextField,
    TextFieldProps,
} from '@mui/material'
import React, { FC } from 'react'
import { Controller, get, useFormContext } from 'react-hook-form'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import useFormInput from '@src/components/ui/formInput/useFormInput'

type FormInputProps = {
    name: string
    isPassword?: boolean
} & TextFieldProps

const FormInput: FC<FormInputProps> = ({ name, isPassword, ...otherProps }) => {
    const {
        control,
        formState: { errors },
        trigger,
        setValue,
    } = useFormContext()

    const error = get(errors, name)

    const {
        isFocused,
        setIsFocused,
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
    } = useFormInput()

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <TextField
                    className='h-[7vh]'
                    variant='outlined'
                    fullWidth
                    focused={isFocused}
                    color={field.value && !error ? 'success' : 'primary'}
                    {...otherProps}
                    {...field}
                    value={field.value ?? ''}
                    error={otherProps.error ?? !!errors[name]}
                    helperText={
                        otherProps.helperText ??
                        (error ? error.message : !!errors[name])
                    }
                    onChange={(event) => {
                        setValue(name, event.target.value, {
                            shouldValidate: true,
                        })
                        trigger(name)
                    }}
                    type={showPassword || !isPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='start'>
                                {isPassword && (
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge='end'
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                )}
                            </InputAdornment>
                        ),
                    }}
                    onBlur={() => {
                        trigger(name)
                    }}
                    onFocus={() => {
                        setIsFocused(true)
                    }}
                />
            )}
        />
    )
}

export default FormInput
