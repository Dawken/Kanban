import React from 'react'
import { StatusProps } from '@src/types/status/statusProps'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Draggable from '@src/components/ui/drag/draggable'
import { ClickAwayListener, IconButton } from '@mui/material'
import EditStatus from '@src/app/boards/[id]/board/status/editStatus/editStatus'
import useAnchorEl from '@src/hooks/useAnchorEl'
import useUpdateStatusName from '@src/hooks/status/useUpdateStatusName'
import AddContentTextField from '@src/components/ui/addContentTextField'
import useToggleOpen from '@src/hooks/useToggleOpen'
import ToolTip from '@src/components/ui/toolTip'
import { DragIdProps } from '@src/types/dragIdProps'

const Status = ({
    status,
    statusesLength,
    dragId,
}: {
    status: StatusProps
    statusesLength: number
    dragId?: DragIdProps
}) => {
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
                <div className='min-w-[250px] max-w-[250px] h-[220px] max-sm:min-h-[220px] bg-neutral-900 rounded text-gray-400'>
                    <div className='w-full h-12'>
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
                                                className='w-36 p-2 hover:bg-blue-600 hover:bg-opacity-5 rounded overflow-hidden overflow-ellipsis whitespace-nowrap'
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
