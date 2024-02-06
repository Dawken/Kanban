import React, { useMemo } from 'react'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { ClickAwayListener, IconButton } from '@mui/material'
import EditStatus from '@src/app/boards/[id]/board/status/editStatus'
import useAnchorEl from '@src/hooks/useAnchorEl'
import useUpdateStatusName from '@src/hooks/status/useUpdateStatusName'
import AddContentTextField from '@src/components/ui/addContentTextField'
import useToggleOpen from '@src/hooks/useToggleOpen'
import ToolTip from '@src/components/ui/toolTip'
import { DragIdProps } from '@src/types/dragIdProps'
import Task from '@src/app/boards/[id]/board/status/task/task'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { StatusProps } from '@src/types/status/statusProps'
import { TaskProps } from '@src/types/task/taskProps'

type CustomStatusProps = {
    status: StatusProps
    tasks: TaskProps[]
    statusesLength: number
    dragId?: DragIdProps
}
const Status = ({
    status,
    tasks,
    statusesLength,
    dragId,
}: CustomStatusProps) => {
    const { anchorEl, handleClick, handleClose, open } = useAnchorEl()

    const {
        open: isStatusOpen,
        handleOpen: handleOpenStatus,
        handleClose: handleCloseStatus,
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

    const tasksIds = useMemo(() => {
        return tasks.map((task) => task.id)
    }, [tasks])

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
                    'max-sm:w-[60vw] sm:min-w-[270px] min-h-[220px] bg-neutral-900 rounded text-gray-400 flex flex-col'
                }
                ref={setNodeRef}
                style={style}
            >
                <div
                    {...attributes}
                    {...listeners}
                    className='w-full h-12 mb-3 cursor-grab'
                >
                    <div className='p-3 flex items-center justify-between relative'>
                        <div className='flex items-center justify-between overflow-hidden'>
                            <DragIndicatorIcon className='text-xl' />
                            <div className='ml-2 font-bold text-xs'>
                                {isStatusOpen ? (
                                    <ClickAwayListener
                                        onClickAway={handleCloseStatus}
                                    >
                                        <div className='absolute w-40 top-3 left-8'>
                                            <AddContentTextField
                                                closeNewStatus={
                                                    handleCloseStatus
                                                }
                                                createContent={editStatusName}
                                                parentId={status.id}
                                                isCreating={
                                                    isStatusNameUpdating
                                                }
                                                defaultText={status.statusName}
                                                isSmallField={true}
                                            />
                                        </div>
                                    </ClickAwayListener>
                                ) : (
                                    <ToolTip
                                        name={dragId ? '' : status.statusName}
                                        placement='top'
                                    >
                                        <div
                                            className='w-36 p-2 hover:bg-blue-600 hover:bg-opacity-5 rounded font-bold overflow-hidden overflow-ellipsis whitespace-nowrap'
                                            onClick={handleOpenStatus}
                                        >
                                            {status.id}
                                        </div>
                                    </ToolTip>
                                )}
                            </div>
                        </div>
                        <IconButton size='small' onClick={handleClick}>
                            <MoreHorizIcon />
                        </IconButton>
                    </div>
                </div>
                <div className='flex-1 h-full'>
                    <SortableContext items={tasksIds}>
                        <div className='space-y-2'>
                            {tasks &&
                                tasks.length > 0 &&
                                tasks.map((task) => {
                                    return <Task task={task} key={task.id} />
                                })}
                        </div>
                    </SortableContext>
                </div>
                <div className='h-8'></div>
            </div>
            {open && (
                <EditStatus
                    open={open}
                    onClose={handleClose}
                    anchorEl={anchorEl}
                    handleOpenStatus={handleOpenStatus}
                    status={status}
                    statusesLength={statusesLength}
                />
            )}
        </>
    )
}

export default Status
