import React from 'react'
import { FormProvider, useFieldArray, UseFormReturn } from 'react-hook-form'
import AddIcon from '@mui/icons-material/Add'
import DeleteStatusIcon from '@src/components/ui/dialog/editBoard/boardStatus/deleteStatusIcon'
import FormInput from '@src/components/ui/form/formInput'
import { BoardInput } from '@src/schemas/boardSchema'
import FormButton from '@src/components/ui/form/formButton'
import { ApolloError } from '@apollo/client'

type BoardFormProps = {
    methods: UseFormReturn<BoardInput>
    submitAction: () => void
    loading: boolean
    error: ApolloError | undefined
}

const BoardForm = ({
    methods,
    submitAction,
    loading,
    error,
}: BoardFormProps) => {
    const defaultValues = methods.getValues()

    const { control } = methods

    const { remove, append } = useFieldArray({
        control,
        name: 'status',
    })

    return (
        <FormProvider {...methods}>
            <form className='m-6 space-y-5' onSubmit={submitAction}>
                <div className='font-bold'>Board Name</div>
                <FormInput name='boardName' />
                <div className='font-bold'>Board Statuses</div>
                {defaultValues.status.map(
                    (status: { value: string }, index: number) => {
                        return (
                            <div
                                className='flex justify-center items-center gap-3'
                                key={index}
                            >
                                <FormInput
                                    name={`status.${index}.value`}
                                    value={status.value}
                                />
                                <DeleteStatusIcon
                                    statusesLength={defaultValues.status.length}
                                    onClickAction={() => remove(index)}
                                />
                            </div>
                        )
                    }
                )}
                <div
                    className='w-full flex justify-center items-center font-bold h-12 border-none rounded uppercase bg-black text-white cursor-pointer text-sm'
                    onClick={() => append({ value: '' })}
                >
                    <AddIcon />
                    Add new column
                </div>
                <FormButton
                    text={'Create new Board'}
                    loading={loading}
                    isError={error}
                />
            </form>
        </FormProvider>
    )
}

export default BoardForm
