import React from 'react'
import { ClickAwayListener, Dialog, TextareaAutosize } from '@mui/material'
import useTaskDetails from '@src/app/boards/[id]/board/status/tasks/task/taskDetails/useTaskDetails'
import useTextState from '@src/hooks/useTextState'
import DeleteContentDialog from '@src/components/ui/dialog/deleteContentDialog'
import useToggleOpen from '@src/hooks/useToggleOpen'
import useDeleteTask from '@src/hooks/task/useDeleteTask'
import DeleteIcon from '@mui/icons-material/Delete'
import dayjs from 'dayjs'
import AddContentTextField from '@src/components/ui/addContentTextField'
import useUpdateTaskName from '@src/hooks/task/useUpdateTaskName'
import { GET_BOARD_TASKS, GET_TASK } from '@src/graphQL/tasks/queries'

type TaskDetailsProps = {
    open: boolean
    handleClose: () => void
    taskId: string
}

const TaskDetails = ({ open, handleClose, taskId }: TaskDetailsProps) => {
    const { data, loading, updateName, isTaskNameUpdating } =
        useTaskDetails(taskId)

    const { text, handleChange } = useTextState(data?.task.description)

    const {
        open: isDeleteDialogOpen,
        handleOpen: handleOpenDeleteDialog,
        handleClose: handleCloseDeleteDialog,
    } = useToggleOpen()

    const {
        open: isEditTaskNameOpen,
        handleOpen: handleOpenEditTaskName,
        handleClose: handleCloseEditTaskName,
    } = useToggleOpen()

    const { removeTask, isTaskRemoving } = useDeleteTask()

    return (
        <>
            <Dialog onClose={handleClose} open={open} fullWidth>
                <div className='my-5 mx-10 font-medium space-y-5 font-sans'>
                    <div className='flex items-start justify-between mt-5 text-xl'>
                        <div className='w-5/6 relative right-2'>
                            {isEditTaskNameOpen ? (
                                <ClickAwayListener
                                    onClickAway={handleCloseEditTaskName}
                                >
                                    <div>
                                        <AddContentTextField
                                            closeNewStatus={
                                                handleCloseEditTaskName
                                            }
                                            createContent={updateName}
                                            parentId={taskId}
                                            isCreating={isTaskNameUpdating}
                                            defaultText={data?.task.taskName}
                                        />
                                    </div>
                                </ClickAwayListener>
                            ) : (
                                <div
                                    className='mb-[6px] p-2 break-all hover:bg-blue-600 hover:bg-opacity-5 rounded cursor-pointer'
                                    onClick={handleOpenEditTaskName}
                                >
                                    {data?.task.taskName}
                                </div>
                            )}
                        </div>
                        <button
                            className='bg-delete rounded text-black'
                            onClick={handleOpenDeleteDialog}
                        >
                            <div className='m-1 flex justify-center items-center text-sm font-bold'>
                                <DeleteIcon className='text-xl my-1 mx-2' />
                            </div>
                        </button>
                    </div>
                    <div className='w-full space-y-3'>
                        <div>Description</div>
                        <TextareaAutosize
                            minRows={3}
                            value={text}
                            onChange={(event) =>
                                handleChange(event.target.value)
                            }
                            className='w-full outline-none p-1.5 rounded border-2 border-[#474747] focus:border-blue-600 transition-colors duration-500 font-normal bg-transparent resize-none'
                        />

                        <div className='flex justify-start items-center gap-2 text-sm'>
                            <button className='hover:bg-blue-500 bg-blue-600 transition-all duration-500 rounded'>
                                <div className='my-1.5 mx-4 w-8 h-5 flex items-center justify-center'>
                                    Save
                                </div>
                            </button>
                            <button className='hover:bg-zinc-600 transition-all duration-500 rounded'>
                                <div className='my-1.5 mx-4 w-8 h-5 flex items-center justify-center'>
                                    Cancel
                                </div>
                            </button>
                        </div>
                        <hr className='my-4 border-t border-[#474747] w-full' />
                        <div className='text-xs text-gray-300 space-y-3 font-normal'>
                            <div>
                                Created At{' '}
                                {dayjs(data?.task.createdAt).format(
                                    'DD MMMM YYYY HH:mm'
                                )}
                            </div>
                            <div>
                                Updated At{' '}
                                {dayjs(data?.task.updatedAt).format(
                                    'DD MMMM YYYY HH:mm'
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
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

export default TaskDetails
