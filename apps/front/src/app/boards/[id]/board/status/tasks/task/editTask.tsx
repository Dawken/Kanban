import React from 'react'
import AbcIcon from '@mui/icons-material/Abc'
import DeleteIcon from '@mui/icons-material/Delete'
import EditContentPopover from '@src/components/ui/editContentPopover'
import useToggleOpen from '@src/hooks/useToggleOpen'
import DeleteContentDialog from '@src/components/ui/dialog/deleteContentDialog'
import useDeleteTask from '@src/hooks/task/useDeleteTask'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'

type EditTaskProps = {
    open: boolean
    taskId: string
    handleOpenEditTask: () => void
    handleOpenTaskDetails: () => void
    onClose: () => void
    anchorEl: HTMLButtonElement | null
}
const EditTask = ({
    open,
    taskId,
    handleOpenEditTask,
    handleOpenTaskDetails,
    onClose,
    anchorEl,
}: EditTaskProps) => {
    const {
        open: isDeleteDialogOpen,
        handleOpen: handleOpenDeleteDialog,
        handleClose: handleCloseDeleteDialog,
    } = useToggleOpen()

    const { removeTask, isTaskRemoving } = useDeleteTask()

    return (
        <>
            <EditContentPopover
                open={open}
                onClose={onClose}
                anchorEl={anchorEl}
            >
                <button
                    className='w-full gap-2 p-2 px-5 flex items-center hover:bg-neutral-900 transition-all'
                    onClick={() => {
                        handleOpenEditTask()
                        onClose()
                    }}
                >
                    <AbcIcon fontSize='small' />
                    <p>Change name</p>
                </button>
                <button
                    className='w-full gap-2 p-2 px-5 flex items-center hover:bg-neutral-900 transition-all'
                    onClick={() => {
                        handleOpenTaskDetails()
                        onClose()
                    }}
                >
                    <InfoOutlinedIcon fontSize='small' />
                    <p>Details</p>
                </button>
                <button className='w-full' onClick={handleOpenDeleteDialog}>
                    <div className='w-full gap-2 p-2 px-5 flex items-center text-primary hover:bg-neutral-900 hover:text-delete transition-all'>
                        <DeleteIcon fontSize='small' />
                        <p>Delete</p>
                    </div>
                </button>
            </EditContentPopover>
            <DeleteContentDialog
                handleClose={handleCloseDeleteDialog}
                open={isDeleteDialogOpen}
                remove={() => removeTask(taskId)}
                textContent={{
                    removedContentName: 'Task',
                    effectsOfDeletion: [
                        'Irreversible Task removal',
                        'Removal of all tasks data such a description',
                    ],
                }}
                loading={isTaskRemoving}
            />
        </>
    )
}

export default EditTask
