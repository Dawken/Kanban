import React from 'react'
import { StatusProps } from '@src/types/status/statusProps'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Draggable from '@src/components/ui/drag/draggable'
import { ClickAwayListener, IconButton } from '@mui/material'
import EditStatus from '@src/app/boards/[id]/board/status/editStatus'
import useAnchorEl from '@src/hooks/useAnchorEl'
import useUpdateStatusName from '@src/hooks/status/useUpdateStatusName'
import AddContentTextField from '@src/components/ui/addContentTextField'
import useToggleOpen from '@src/hooks/useToggleOpen'
import ToolTip from '@src/components/ui/toolTip'
import { DragIdProps } from '@src/types/dragIdProps'
import Task from '@src/app/boards/[id]/board/status/task/task'

type CustomStatusProps = {
    status: StatusProps
    statusesLength: number
    dragId?: DragIdProps
}
const Status = ({ status, statusesLength, dragId }: CustomStatusProps) => {
    const { anchorEl, handleClick, handleClose, open } = useAnchorEl()

    const {
        open: isStatusOpen,
        handleOpen: handleOpenStatus,
        handleClose: handleCloseStatus,
    } = useToggleOpen()

    const { isStatusNameUpdating, editStatusName } = useUpdateStatusName()

    return (
        <div>
            <Draggable id={status.id}>
                <div className='max-sm:w-[60vw] sm:min-w-[270px] min-h-[220px] bg-neutral-900 rounded text-gray-400'>
                    <div className='w-full h-12 mb-3'>
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
                                                    createContent={
                                                        editStatusName
                                                    }
                                                    parentId={status.id}
                                                    isCreating={
                                                        isStatusNameUpdating
                                                    }
                                                    defaultText={
                                                        status.statusName
                                                    }
                                                    isSmallField={true}
                                                />
                                            </div>
                                        </ClickAwayListener>
                                    ) : (
                                        <ToolTip
                                            name={
                                                dragId ? '' : status.statusName
                                            }
                                            placement='top'
                                        >
                                            <div
                                                className='w-36 p-2 hover:bg-blue-600 hover:bg-opacity-5 rounded font-bold overflow-hidden overflow-ellipsis whitespace-nowrap'
                                                onClick={handleOpenStatus}
                                            >
                                                {status.statusName}
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
                    <div className='space-y-1'>
                        {status.task.length > 0 &&
                            status.task.map((task) => {
                                return <Task task={task} key={task.id} />
                            })}
                    </div>
                    <div className='h-8'></div>
                </div>
            </Draggable>
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
        </div>
    )
}

export default Status
