import { TextField, TextFieldProps } from '@mui/material'
import React, { FC } from 'react'
import { Controller, useFormContext, get } from 'react-hook-form'

type FormInputProps = {
    name: string
} & TextFieldProps

const FormInput: FC<FormInputProps> = ({ name, ...otherProps }) => {
    const {
        control,
        formState: { errors },
    } = useFormContext()

    const error = get(errors, name)

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <TextField
                    label='Standard'
                    variant='standard'
                    fullWidth
                    {...otherProps}
                    {...field}
                    value={field.value ?? otherProps.value ?? ''}
                    error={!!errors[name]}
                    helperText={error ? error.message : ''}
                />
            )}
        />
    )
}

export default FormInput
