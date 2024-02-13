import React from 'react'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { ClickAwayListener, IconButton } from '@mui/material'
import EditStatus from '@src/app/boards/[id]/board/status/editStatus'
import useAnchorEl from '@src/hooks/useAnchorEl'
import useUpdateStatusName from '@src/hooks/status/useUpdateStatusName'
import AddContentTextField from '@src/components/ui/addContentTextField'
import useToggleOpen from '@src/hooks/useToggleOpen'
import Task from '@src/app/boards/[id]/board/status/task/task'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { StatusProps } from '@src/types/status/statusProps'
import { TaskProps } from '@src/types/task/taskProps'
import useStatus from '@src/app/boards/[id]/board/status/useStatus'
import AddIcon from '@mui/icons-material/Add'

type CustomStatusProps = {
    status: StatusProps
    tasks: TaskProps[]
    isDraggingTask: boolean
    statusesLength: number
}
const Status = ({ status, tasks, statusesLength }: CustomStatusProps) => {
    const { anchorEl, handleClick, handleClose, open } = useAnchorEl()

    const {
        open: isStatusOpen,
        handleOpen: handleOpenStatus,
        handleClose: handleCloseStatus,
    } = useToggleOpen()

    const {
        open: isCreateTaskOpen,
        handleOpen: handleOpenCreateTask,
        handleClose: handleCloseCreateTask,
    } = useToggleOpen()

    const { isStatusNameUpdating, editStatusName } = useUpdateStatusName()

    const { tasksIds, isTaskCreating, addNewTask } = useStatus(tasks)

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
                    'max-sm:w-[60vw] sm:min-w-[270px] min-h-[220px] bg-neutral-900 rounded text-gray-400 flex flex-col'
                }
                ref={setNodeRef}
                style={style}
            >
                <div
                    {...attributes}
                    {...listeners}
                    className='w-full h-12 cursor-grab'
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
                                    <div
                                        className='w-36 p-2 hover:bg-blue-600 hover:bg-opacity-5 rounded font-bold overflow-hidden overflow-ellipsis whitespace-nowrap'
                                        onClick={handleOpenStatus}
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
                <div className='flex-1 flex flex-col my-2 flex-grow h-full gap-2'>
                    {tasks.length > 0 ? (
                        <SortableContext items={tasksIds}>
                            {tasks.map((task) => {
                                return <Task task={task} key={task.id} />
                            })}
                        </SortableContext>
                    ) : isCreateTaskOpen ? (
                        <div className='bg-black min-h-[90px] rounded mx-2 flex items-center justify-center'>
                            <div className='px-1 w-full'>
                                <AddContentTextField
                                    closeNewStatus={handleCloseCreateTask}
                                    createContent={addNewTask}
                                    multiline={true}
                                    parentId={status.id}
                                    isCreating={isTaskCreating}
                                />
                            </div>
                        </div>
                    ) : (
                        <div
                            className='bg-black opacity-50 max-h-[90px] rounded mx-2 flex items-center justify-center flex-1 text-sm font-bold hover:bg-blue-600 hover:bg-opacity-10 cursor-pointer'
                            onClick={handleOpenCreateTask}
                        >
                            <AddIcon />
                            Create task
                        </div>
                    )}
                </div>
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
