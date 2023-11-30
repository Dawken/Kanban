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
        trigger,
        setValue,
    } = useFormContext()

    const error = get(errors, name)

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <TextField
                    className='h-[7vh]'
                    variant='outlined'
                    fullWidth
                    focused={field.value}
                    color={field.value && !error ? 'success' : 'primary'}
                    {...otherProps}
                    {...field}
                    value={field.value ?? ''}
                    error={!!errors[name]}
                    helperText={error ? error.message : !!errors[name]}
                    onChange={(event) => {
                        setValue(name, event.target.value, {
                            shouldValidate: true,
                        })
                        trigger(name)
                    }}
                    onBlur={() => {
                        trigger(name)
                    }}
                />
            )}
        />
    )
}

export default FormInput
