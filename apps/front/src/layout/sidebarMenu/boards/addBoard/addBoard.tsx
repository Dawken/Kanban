import React from 'react'
import { Dialog, DialogTitle } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { FormProvider } from 'react-hook-form'
import DialogInput from '@src/components/ui/dialogInput'
import ClearIcon from '@mui/icons-material/Clear'
import FormButton from '@src/components/ui/formButton'
import useAddBoard from '@src/layout/sidebarMenu/boards/addBoard/useAddBoard'
import useToggleOpen from '@src/hooks/useToogleOpen'

const AddBoard = () => {
    const {
        methods,
        register,
        defaultValues,
        remove,
        append,
        loading,
        error,
        transformBoardData,
        addBoard,
    } = useAddBoard()

    const { open, handleOpen, handleClose } = useToggleOpen()

    return (
        <>
            <button
                className='w-full m-5 space-x-1 text-sm font-bold'
                onClick={handleOpen}
            >
                <span>
                    <AddIcon />
                </span>
                <span>Add new Board</span>
            </button>
            <Dialog onClose={handleClose} open={open} fullWidth>
                <div className='m-3'>
                    <DialogTitle className='text-2xl font-bold'>
                        Add new board
                    </DialogTitle>
                    <FormProvider {...methods}>
                        <form
                            className='m-5 space-y-5'
                            onSubmit={methods.handleSubmit((data) => {
                                const boardData = transformBoardData(data)
                                addBoard(boardData)
                            })}
                        >
                            <div className='font-bold'>Board Name</div>
                            <DialogInput name='boardName' />
                            <div className='font-bold'>Board Columns</div>
                            {defaultValues.status.map((board, index) => {
                                return (
                                    <div
                                        className='flex justify-center items-center gap-3'
                                        key={index}
                                    >
                                        <DialogInput
                                            {...register(
                                                `status.${index}.value`
                                            )}
                                        />
                                        <ClearIcon
                                            className='cursor-pointer text-3xl'
                                            onClick={() => remove(index)}
                                        />
                                    </div>
                                )
                            })}
                            <div
                                className='w-full flex justify-center items-center font-bold h-12 border-none rounded uppercase bg-[#000000] text-white cursor-pointer'
                                onClick={() => append({ value: '' })}
                            >
                                <AddIcon />
                                Add new column
                            </div>
                            <FormButton
                                loading={loading}
                                error={error}
                                text={'Create new board'}
                            />
                        </form>
                    </FormProvider>
                </div>
            </Dialog>
        </>
    )
}

export default AddBoard
