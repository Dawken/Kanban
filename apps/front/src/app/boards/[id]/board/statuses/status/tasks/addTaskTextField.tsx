import React from 'react'
import { ClickAwayListener } from '@mui/material'
import AddContentTextField from '@src/components/ui/addContentTextField'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'

type AddTaskTextFieldProps = {
    handleCloseCreateTask: () => void
    addNewTask: (
        taskName: string,
        statusId: string,
        description?: string
    ) => void
    statusId: string
    isTaskCreating: boolean
}
const AddTaskTextField = ({
    handleCloseCreateTask,
    addNewTask,
    statusId,
    isTaskCreating,
}: AddTaskTextFieldProps) => {
    return (
        <div className='bg-black rounded flex items-start justify-start'>
            <ClickAwayListener onClickAway={handleCloseCreateTask}>
                <div className='p-2 flex-1 h-full flex flex-col'>
                    <AddContentTextField
                        closeNewStatus={handleCloseCreateTask}
                        createContent={addNewTask}
                        parentId={statusId}
                        isCreating={isTaskCreating}
                    />
                    <div className='mt-4 pt-0.5 flex items-center font-semibold gap-2 text-sm'>
                        <span>Create</span>
                        <div className='bg-zinc-800 h-4 flex items-center rounded'>
                            <KeyboardReturnIcon className='text-xs text-white mx-2' />
                        </div>
                    </div>
                </div>
            </ClickAwayListener>
        </div>
    )
}

export default AddTaskTextField
