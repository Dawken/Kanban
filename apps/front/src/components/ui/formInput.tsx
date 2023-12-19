import { TextField } from '@mui/material'
import React, { FC, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { FormInputProps } from '@src/types/formInputProps'

const FormInput: FC<FormInputProps> = ({ name, ...otherProps }) => {
    const [isFocused, setIsFocused] = useState(false)

    const { trigger } = useFormContext()

    return (
        <Controller
            name={name}
            render={({ field, fieldState }) => (
                <TextField
                    className='h-[7vh]'
                    variant='outlined'
                    fullWidth
                    focused={isFocused}
                    color={
                        field.value && !fieldState.error?.message
                            ? 'success'
                            : 'primary'
                    }
                    {...otherProps}
                    {...field}
                    value={field.value ?? ''}
                    error={otherProps.error ?? !!fieldState.error}
                    helperText={
                        otherProps.helperText ?? fieldState.error?.message
                    }
                    onChange={(event) => {
                        field.onChange(event.target.value)
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
