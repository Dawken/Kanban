import React from 'react'
import { ClickAwayListener } from '@mui/material'
import AddContentTextField from '@src/components/ui/addContentTextField'

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
        <div className='bg-black min-h-[90px] w-[260px] rounded mx-2 flex items-center justify-start mt-2'>
            <ClickAwayListener onClickAway={handleCloseCreateTask}>
                <div className='p-4 flex-1'>
                    <AddContentTextField
                        closeNewStatus={handleCloseCreateTask}
                        createContent={addNewTask}
                        parentId={statusId}
                        isCreating={isTaskCreating}
                    />
                </div>
            </ClickAwayListener>
        </div>
    )
}

export default AddTaskTextField
