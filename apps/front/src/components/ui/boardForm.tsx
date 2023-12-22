import React, { ReactElement } from 'react'
import { FormProvider, useFieldArray, UseFormReturn } from 'react-hook-form'
import DialogInput from '@src/components/ui/dialogInput'
import ClearIcon from '@mui/icons-material/Clear'
import AddIcon from '@mui/icons-material/Add'
import { BoardCredentialsProps } from '@src/types/boardCredentialsProps'

type BoardDialogProps = {
    methods: UseFormReturn<BoardCredentialsProps>
    submitAction: () => void
    ActionButton: ReactElement
}

const BoardForm = ({
    methods,
    submitAction,
    ActionButton,
}: BoardDialogProps) => {
    const defaultValues = methods.getValues()

    const { register, control } = methods

    const { remove, append } = useFieldArray({
        control,
        name: 'status',
    })

    return (
        <FormProvider {...methods}>
            <form className='m-5 space-y-5' onSubmit={submitAction}>
                <div className='font-bold'>Board Name</div>
                <DialogInput name='boardName' />
                <div className='font-bold'>Board Columns</div>
                {defaultValues.status.map(
                    (status: { value: string }, index: number) => {
                        return (
                            <div
                                className='flex justify-center items-center gap-3'
                                key={index}
                            >
                                <DialogInput
                                    {...register(`status.${index}.value`)}
                                />
                                <ClearIcon
                                    className='cursor-pointer text-3xl'
                                    onClick={() => remove(index)}
                                />
                            </div>
                        )
                    }
                )}
                <div
                    className='w-full flex justify-center items-center font-bold h-12 border-none rounded uppercase bg-[#000000] text-white cursor-pointer'
                    onClick={() => append({ value: '' })}
                >
                    <AddIcon />
                    Add new column
                </div>
                {ActionButton}
            </form>
        </FormProvider>
    )
}

export default BoardForm
