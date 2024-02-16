import React from 'react'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { ClickAwayListener, IconButton } from '@mui/material'
import EditStatus from '@src/app/boards/[id]/board/status/editStatus'
import useAnchorEl from '@src/hooks/useAnchorEl'
import useUpdateStatusName from '@src/hooks/status/useUpdateStatusName'
import AddContentTextField from '@src/components/ui/addContentTextField'
import useToggleOpen from '@src/hooks/useToggleOpen'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { StatusProps } from '@src/types/status/statusProps'
import { TaskProps } from '@src/types/task/taskProps'
import Tasks from '@src/app/boards/[id]/board/status/tasks/tasks'

type CustomStatusProps = {
    status: StatusProps
    tasks: TaskProps[]
    isDraggingTask: boolean
    statusesLength: number
}
const Status = ({ status, tasks, statusesLength }: CustomStatusProps) => {
    const { anchorEl, handleClick, handleClose, open } = useAnchorEl()

    const {
        open: isEditStatusOpen,
        handleOpen: handleOpenEditStatus,
        handleClose: handleCloseEditStatus,
    } = useToggleOpen()

    const {
        open: isCreateTaskOpen,
        handleOpen: handleOpenCreateTask,
        handleClose: handleCloseCreateTask,
    } = useToggleOpen()

    const { isStatusNameUpdating, editStatusName } = useUpdateStatusName()

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: status.id,
        data: {
            type: 'Status',
            status,
        },
    })

    const style = {
        transition,
        transform: CSS.Translate.toString(transform),
    }

    if (isDragging) {
        return (
            <div
                className={
                    'invisible max-sm:w-[60vw] sm:min-w-[270px] min-h-[220px]'
                }
                ref={setNodeRef}
                style={style}
            />
        )
    }

    return (
        <>
            <div
                className={
                    'max-sm:w-[60vw] min-h-[220px] bg-neutral-900 rounded text-gray-400 flex flex-col '
                }
                ref={setNodeRef}
                style={style}
            >
                {/*Top of status with name and edit status button*/}
                <div
                    {...attributes}
                    {...listeners}
                    className='w-full h-12 cursor-grab'
                >
                    <div className='p-3 flex items-center justify-between'>
                        <div className='flex items-center justify-between'>
                            <DragIndicatorIcon className='text-xl' />
                            <div className='ml-2 font-bold text-xs'>
                                {isEditStatusOpen ? (
                                    <ClickAwayListener
                                        onClickAway={handleCloseEditStatus}
                                    >
                                        <div className='w-44 h-8'>
                                            <AddContentTextField
                                                closeNewStatus={
                                                    handleCloseEditStatus
                                                }
                                                createContent={editStatusName}
                                                parentId={status.id}
                                                isCreating={
                                                    isStatusNameUpdating
                                                }
                                                defaultText={status.statusName}
                                                isSingleRow={true}
                                            />
                                        </div>
                                    </ClickAwayListener>
                                ) : (
                                    <div
                                        className='w-44 p-2 hover:bg-blue-600 hover:bg-opacity-5 rounded font-bold overflow-hidden overflow-ellipsis whitespace-nowrap'
                                        onClick={handleOpenEditStatus}
                                    >
                                        {status.statusName}
                                    </div>
                                )}
                            </div>
                        </div>
                        <IconButton size='small' onClick={handleClick}>
                            <MoreHorizIcon />
                        </IconButton>
                    </div>
                </div>
                {/*Sortable tasks with add task text field*/}
                <Tasks
                    tasks={tasks}
                    statusId={status.id}
                    isCreateTaskOpen={isCreateTaskOpen}
                    handleOpenCreateTask={handleOpenCreateTask}
                    handleCloseCreateTask={handleCloseCreateTask}
                />
            </div>
            {open && (
                <EditStatus
                    open={open}
                    onClose={handleClose}
                    anchorEl={anchorEl}
                    handleOpenEditStatus={handleOpenEditStatus}
                    status={status}
                    statusesLength={statusesLength}
                    handleOpenCreateTask={handleOpenCreateTask}
                />
            )}
        </>
    )
}

export default Status
