import { TextField } from '@mui/material'
import React, { FC, useState } from 'react'
import { Controller, get, useFormContext } from 'react-hook-form'
import { FormInputProps } from '@src/types/formInputProps'

const FormInput: FC<FormInputProps> = ({ name, ...otherProps }) => {
    const [isFocused, setIsFocused] = useState(false)

    const {
        formState: { errors },
        trigger,
        setValue,
    } = useFormContext()

    const error = get(errors, name)

    return (
        <Controller
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
