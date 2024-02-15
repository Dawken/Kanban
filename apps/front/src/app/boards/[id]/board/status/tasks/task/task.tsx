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
            >
                <div className='bg-black min-h-[90px] sm:w-[260px] rounded mx-2 text-white font-sans'>
                    <div className='h-full flex justify-between items-start p-2'>
                        {isEditTaskOpen ? (
                            <ClickAwayListener
                                onClickAway={handleCloseEditTask}
                            >
                                <div className='w-full h-full'>
                                    <AddContentTextField
                                        closeNewStatus={handleCloseEditTask}
                                        createContent={updateName}
                                        parentId={task.id}
                                        isCreating={isTaskNameUpdating}
                                        defaultText={task.taskName}
                                        multiline={true}
                                        fontSize={14}
                                    />
                                </div>
                            </ClickAwayListener>
                        ) : (
                            <div
                                className='p-2 text-sm break-all'
                                onClick={handleOpenEditTask}
                            >
                                {task.taskName}
                            </div>
                        )}
                        <IconButton size='small' onClick={handleClick}>
                            <MoreHorizIcon />
                        </IconButton>
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
