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
import { DragIdProps } from '@src/types/dragIdProps'

type CustomStatusProps = {
    status: StatusProps
    tasks: TaskProps[]
    statusesLength: number
    isStatusOrderUpdating?: boolean
    isTaskOrderUpdating?: boolean
    dragId: DragIdProps
    hideCreateTask?: boolean
}
const Status = ({
    status,
    tasks,
    statusesLength,
    isStatusOrderUpdating,
    isTaskOrderUpdating,
    dragId,
    hideCreateTask,
}: CustomStatusProps) => {
    const { anchorEl, handleClick, handleClose, open } = useAnchorEl()

    const {
        open: isEditStatusNameOpen,
        handleOpen: handleOpenEditStatusName,
        handleClose: handleCloseEditStatusName,
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
            status,
        },
        disabled:
            isEditStatusNameOpen ||
            isStatusOrderUpdating ||
            isTaskOrderUpdating,
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
                className={`${isDragging ? 'invisible' : 'visible'} 
                ${
                    isStatusOrderUpdating || isTaskOrderUpdating
                        ? 'pointer-events-none'
                        : 'pointer-events-auto'
                }
                ${
                    dragId === status.id && isStatusOrderUpdating
                        ? 'animate-pulse'
                        : 'animate-none'
                }
                touch-none max-sm:w-[60vw] sm:min-w-[276px] sm:max-w-[276px] flex-1 min-h-[420px] self-stretch bg-neutral-900 rounded text-gray-400 flex flex-col relative`}
                ref={setNodeRef}
                style={style}
            >
                {/*Top of status with name and edit status button*/}
                <div
                    {...attributes}
                    {...listeners}
                    className='h-12 cursor-grab sticky top-0 z-10 bg-neutral-900'
                >
                    <div className='p-3 flex items-center justify-between'>
                        <div className='flex items-center justify-start w-4/5 font-sans'>
                            <DragIndicatorIcon className='text-xl' />
                            <div className='w-11/12 ml-2 font-bold text-xs'>
                                {isEditStatusNameOpen ? (
                                    <ClickAwayListener
                                        onClickAway={handleCloseEditStatusName}
                                    >
                                        <div className='h-8'>
                                            <AddContentTextField
                                                closeNewStatus={
                                                    handleCloseEditStatusName
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
                                        onClick={handleOpenEditStatusName}
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
                    } mt-1 h-full`}
                    ref={droppableArea}
                >
                    <Tasks
                        tasks={tasks}
                        status={status}
                        isCreateTaskOpen={isCreateTaskOpen}
                        isTaskOrderUpdating={isTaskOrderUpdating}
                        handleOpenCreateTask={handleOpenCreateTask}
                        handleCloseCreateTask={handleCloseCreateTask}
                        hideCreateTask={hideCreateTask}
                        dragId={dragId}
                    />
                </div>
            </div>
            {open && (
                <EditStatus
                    open={open}
                    onClose={handleClose}
                    anchorEl={anchorEl}
                    handleOpenEditStatus={handleOpenEditStatusName}
                    status={status}
                    statusesLength={statusesLength}
                    handleOpenCreateTask={handleOpenCreateTask}
                />
            )}
        </>
    )
}

export default Status
