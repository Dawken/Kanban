import React, { FC, forwardRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { TextField, TextFieldProps } from '@mui/material'

type FormInputProps = {
    name: string
} & TextFieldProps
const DialogInput: FC<FormInputProps> = forwardRef(
    ({ name, ...otherProps }, ref) => {
        const { control } = useFormContext()

        return (
            <Controller
                control={control}
                name={name}
                defaultValue={otherProps.value}
                render={({ field }) => (
                    <TextField
                        variant='outlined'
                        fullWidth
                        {...otherProps}
                        {...field}
                        value={field.value ?? ''}
                        inputRef={ref}
                    />
                )}
            />
        )
    }
)

DialogInput.displayName = 'DialogInput'

export default DialogInput
