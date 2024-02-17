import React from 'react'
import { TaskProps } from '@src/types/task/taskProps'
import Draggable from '@src/components/ui/drag/draggable'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { ClickAwayListener, IconButton } from '@mui/material'
import useToggleOpen from '@src/hooks/useToggleOpen'
import EditTask from '@src/app/boards/[id]/board/status/tasks/task/editTask'
import useAnchorEl from '@src/hooks/useAnchorEl'
import AddContentTextField from '@src/components/ui/addContentTextField'
import useTask from '@src/app/boards/[id]/board/status/tasks/task/useTask'
import CopyToClipboard from '@src/components/ui/copyToClipboard'

type TasksProps = {
    task: TaskProps
}

const Task = ({ task }: TasksProps) => {
    const {
        open: isEditTaskOpen,
        handleOpen: handleOpenEditTask,
        handleClose: handleCloseEditTask,
    } = useToggleOpen()

    const { anchorEl, handleClick, handleClose, open } = useAnchorEl()

    const { updateName, isTaskNameUpdating } = useTask()

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
                <div className='bg-black min-h-[95px] rounded mx-1 text-white font-sans relative'>
                    <div className='h-full flex justify-between p-2'>
                        <div className='w-4/5'>
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
                                    className='p-2 mb-[5px] text-sm break-all cursor-pointer'
                                    onClick={handleOpenEditTask}
                                >
                                    {task.taskName}
                                </div>
                            )}
                        </div>
                        <div className='absolute bottom-0 right-0 p-2.5 mr-1 flex flex-col justify-between h-full'>
                            <IconButton size='small' onClick={handleClick}>
                                <MoreHorizIcon className='text-gray-400' />
                            </IconButton>
                            <div>
                                <CopyToClipboard
                                    text={task.taskName}
                                    placement='bottom'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Draggable>
            {open && (
                <EditTask
                    open={open}
                    taskId={task.id}
                    handleOpenEditTask={handleOpenEditTask}
                    onClose={handleClose}
                    anchorEl={anchorEl}
                />
            )}
        </>
    )
}

export default Task
