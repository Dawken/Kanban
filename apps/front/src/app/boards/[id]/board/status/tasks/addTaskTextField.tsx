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
        <div className='bg-black min-h-[90px] rounded mx-2 flex items-center justify-center'>
            <ClickAwayListener onClickAway={handleCloseCreateTask}>
                <div className='px-1 w-full'>
                    <AddContentTextField
                        closeNewStatus={handleCloseCreateTask}
                        createContent={addNewTask}
                        multiline={true}
                        parentId={statusId}
                        isCreating={isTaskCreating}
                    />
                </div>
            </ClickAwayListener>
        </div>
    )
}

export default AddTaskTextField
