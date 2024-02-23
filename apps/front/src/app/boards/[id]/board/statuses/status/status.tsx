import React from 'react'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { ClickAwayListener, IconButton } from '@mui/material'
import useAnchorEl from '@src/hooks/useAnchorEl'
import useUpdateStatusName from '@src/hooks/status/useUpdateStatusName'
import AddContentTextField from '@src/components/ui/addContentTextField'
import useToggleOpen from '@src/hooks/useToggleOpen'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { StatusProps } from '@src/types/status/statusProps'
import { TaskProps } from '@src/types/task/taskProps'
import Tasks from '@src/app/boards/[id]/board/statuses/status/tasks/tasks'
import EditStatus from '@src/app/boards/[id]/board/statuses/status/editStatus'
import { useDroppable } from '@dnd-kit/core'

type CustomStatusProps = {
    status: StatusProps
    tasks: TaskProps[]
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
    })

    const { setNodeRef: droppableArea } = useDroppable({
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

    return (
        <>
            <div
                className={`${
                    isDragging ? 'invisible' : 'visible'
                } touch-none max-sm:w-[60vw] sm:min-w-[276px] sm:max-w-[276px] min-h-[220px] bg-neutral-900 rounded text-gray-400 flex flex-col`}
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
                        <div className='flex items-center justify-start w-4/5 font-sans'>
                            <DragIndicatorIcon className='text-xl' />
                            <div className='w-11/12 ml-2 font-bold text-xs'>
                                {isEditStatusOpen ? (
                                    <ClickAwayListener
                                        onClickAway={handleCloseEditStatus}
                                    >
                                        <div className='h-8'>
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
                                        className='p-2 hover:bg-blue-600 hover:bg-opacity-5 rounded font-bold overflow-hidden whitespace-nowrap overflow-ellipsis'
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
                <div
                    className={`${
                        isDragging ? 'opacity-0' : 'opacity-100'
                    } mt-2`}
                    ref={droppableArea}
                >
                    <Tasks
                        tasks={tasks}
                        status={status}
                        isCreateTaskOpen={isCreateTaskOpen}
                        handleOpenCreateTask={handleOpenCreateTask}
                        handleCloseCreateTask={handleCloseCreateTask}
                    />
                </div>
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
