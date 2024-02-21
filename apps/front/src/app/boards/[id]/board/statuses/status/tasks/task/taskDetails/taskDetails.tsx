import React from 'react'
import { ClickAwayListener, Dialog } from '@mui/material'
import DeleteContentDialog from '@src/components/ui/dialog/deleteContentDialog'
import useToggleOpen from '@src/hooks/useToggleOpen'
import useDeleteTask from '@src/hooks/task/useDeleteTask'
import DeleteIcon from '@mui/icons-material/Delete'
import dayjs from 'dayjs'
import AddContentTextField from '@src/components/ui/addContentTextField'
import useUpdateTaskName from '@src/hooks/task/useUpdateTaskName'
import Skeleton from '@mui/material/Skeleton'
import Description from '@src/app/boards/[id]/board/statuses/status/tasks/task/taskDetails/description/description'
import useTaskDetails from '@src/app/boards/[id]/board/statuses/status/tasks/task/taskDetails/useTaskDetails'

type TaskDetailsProps = {
    open: boolean
    handleClose: () => void
    taskId: string
}

const TaskDetails = ({ open, handleClose, taskId }: TaskDetailsProps) => {
    const { data, isTaskDataLoading } = useTaskDetails(taskId)

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

    const { updateName, isTaskNameUpdating } = useUpdateTaskName()

    const { removeTask, isTaskRemoving } = useDeleteTask()

    return (
        <>
            <Dialog onClose={handleClose} open={open} fullWidth>
                <div className='my-5 mx-10 font-medium space-y-5 font-sans'>
                    <div className='flex items-start justify-between mt-5 text-xl'>
                        <div className='w-5/6'>
                            {isEditTaskNameOpen ? (
                                <ClickAwayListener
                                    onClickAway={handleCloseEditTaskName}
                                >
                                    <div className='relative right-2'>
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
                                <div className='mb-1.5'>
                                    {isTaskDataLoading ? (
                                        <Skeleton
                                            height={44}
                                            variant='rounded'
                                        />
                                    ) : (
                                        <div
                                            className='p-2 break-all relative right-2 hover:bg-blue-600 hover:bg-opacity-5 rounded cursor-pointer'
                                            onClick={handleOpenEditTaskName}
                                        >
                                            {data?.task.taskName}
                                        </div>
                                    )}
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
                        <div className='flex flex-col items-start space-y-3'>
                            {isTaskDataLoading ? (
                                <>
                                    <div className='w-full flex items-end gap-2'>
                                        <Skeleton
                                            variant='rounded'
                                            width={480}
                                            height={88}
                                        />
                                        <div>
                                            <Skeleton
                                                variant='circular'
                                                width={36}
                                                height={36}
                                            />
                                        </div>
                                    </div>
                                    <Skeleton
                                        variant='rounded'
                                        width={64}
                                        height={32}
                                    />
                                </>
                            ) : (
                                <Description
                                    description={data.task.description}
                                    taskId={taskId}
                                />
                            )}
                        </div>
                        <hr className='my-4 border-t border-[#474747] w-full' />
                        <div className='text-xs text-gray-300 space-y-3 font-normal'>
                            <div className='flex gap-2'>
                                Created At{' '}
                                {isTaskDataLoading ? (
                                    <Skeleton
                                        variant={'rounded'}
                                        width={123}
                                        height={16}
                                    />
                                ) : (
                                    dayjs(data?.task.createdAt).format(
                                        'DD MMMM YYYY HH:mm'
                                    )
                                )}
                            </div>
                            <div className='flex gap-2'>
                                Updated At{' '}
                                {isTaskDataLoading ? (
                                    <Skeleton
                                        variant={'rounded'}
                                        width={123}
                                        height={16}
                                    />
                                ) : (
                                    dayjs(data?.task.updatedAt).format(
                                        'DD MMMM YYYY HH:mm'
                                    )
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
