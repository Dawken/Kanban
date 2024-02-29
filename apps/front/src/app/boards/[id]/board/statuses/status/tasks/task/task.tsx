import React from 'react'
import { TaskProps } from '@src/types/task/taskProps'
import Draggable from '@src/components/ui/drag/draggable'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { ClickAwayListener, IconButton } from '@mui/material'
import useToggleOpen from '@src/hooks/useToggleOpen'
import useAnchorEl from '@src/hooks/useAnchorEl'
import AddContentTextField from '@src/components/ui/addContentTextField'
import CopyToClipboard from '@src/components/ui/copyToClipboard'
import useUpdateTaskName from '@src/hooks/task/useUpdateTaskName'
import TaskDetails from '@src/app/boards/[id]/board/statuses/status/tasks/task/taskDetails/taskDetails'
import EditTask from '@src/app/boards/[id]/board/statuses/status/tasks/task/editTask'
import { DragIdProps } from '@src/types/dragIdProps'
import MuiCircularProgress from '@src/components/ui/animations/muiCircularProgress'

type TasksProps = {
    task: TaskProps
    isTaskOrderUpdating?: boolean
    dragId?: DragIdProps
}

const Task = ({ task, isTaskOrderUpdating, dragId }: TasksProps) => {
    const {
        open: isEditTaskOpen,
        handleOpen: handleOpenEditTask,
        handleClose: handleCloseEditTask,
    } = useToggleOpen()

    const { anchorEl, handleClick, handleClose, open } = useAnchorEl()

    const { updateName, isTaskNameUpdating } = useUpdateTaskName()

    const {
        open: isTaskDetailsOpen,
        handleOpen: handleOpenTaskDetails,
        handleClose: handleCloseTaskDetails,
    } = useToggleOpen()

    return (
        <>
            <Draggable
                id={task.id}
                data={{
                    type: 'Task',
                    item: task,
                }}
                disabled={isEditTaskOpen}
            >
                <div
                    className={`bg-black ${
                        isTaskOrderUpdating && dragId === task.id
                            ? 'animate-pulse'
                            : 'animate-none'
                    } min-h-[95px] rounded mx-1 text-white font-sans relative cursor-pointer`}
                    onClick={handleOpenTaskDetails}
                >
                    <div className='h-full flex justify-between p-2'>
                        <div
                            className='w-4/5'
                            onClick={(event) => event.stopPropagation()}
                        >
                            {isEditTaskOpen ? (
                                <ClickAwayListener
                                    onClickAway={handleCloseEditTask}
                                >
                                    <div>
                                        <AddContentTextField
                                            closeNewStatus={handleCloseEditTask}
                                            createContent={updateName}
                                            parentId={task.id}
                                            isCreating={isTaskNameUpdating}
                                            defaultText={task.taskName}
                                        />
                                    </div>
                                </ClickAwayListener>
                            ) : (
                                <div
                                    className='p-2 mb-[5px] text-sm break-words cursor-pointer hover:bg-blue-400 hover:bg-opacity-5 transition-colors duration-500 rounded'
                                    onClick={handleOpenEditTask}
                                >
                                    {task.taskName}
                                </div>
                            )}
                        </div>
                        <div className='absolute bottom-0 right-0 p-2.5 mr-1 flex flex-col justify-between h-full'>
                            <IconButton
                                size='small'
                                onClick={(event) => {
                                    handleClick(event)
                                    event.stopPropagation()
                                }}
                            >
                                <MoreHorizIcon className='text-gray-400' />
                            </IconButton>
                            {isTaskOrderUpdating && dragId === task.id ? (
                                <div className='w-8 h-9 flex items-center justify-center'>
                                    <MuiCircularProgress size={18} />
                                </div>
                            ) : (
                                <div
                                    onClick={(event) => event.stopPropagation()}
                                >
                                    <CopyToClipboard
                                        text={task.taskName}
                                        placement='bottom'
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Draggable>
            {open && (
                <EditTask
                    open={open}
                    taskId={task.id}
                    handleOpenEditTask={handleOpenEditTask}
                    handleOpenTaskDetails={handleOpenTaskDetails}
                    onClose={handleClose}
                    anchorEl={anchorEl}
                />
            )}
            {isTaskDetailsOpen && (
                <TaskDetails
                    open={isTaskDetailsOpen}
                    handleClose={handleCloseTaskDetails}
                    taskId={task.id}
                />
            )}
        </>
    )
}

export default Task
