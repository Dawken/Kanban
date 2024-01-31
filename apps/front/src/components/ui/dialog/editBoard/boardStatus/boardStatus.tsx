import React from 'react'
import { TextField } from '@mui/material'
import useDeleteStatus from '@src/hooks/status/useDeleteStatus'
import DeleteContentDialog from '@src/components/ui/dialog/deleteContentDialog'
import useToggleOpen from '@src/hooks/useToggleOpen'
import { StatusProps } from '@src/types/status/statusProps'
import { BoardProps } from '@src/types/board/boardProps'
import DeleteStatusIcon from '@src/components/ui/dialog/editBoard/boardStatus/deleteStatusIcon'

type BoardStatusProps = {
    status: StatusProps
    board: BoardProps
}

const BoardStatus = ({ status, board }: BoardStatusProps) => {
    const { open, handleOpen, handleClose } = useToggleOpen()

    const { removeStatus, isStatusRemoving } = useDeleteStatus()

    return (
        <>
            <div className='flex justify-center items-center gap-3'>
                <TextField fullWidth value={status.statusName} disabled />
                <DeleteStatusIcon
                    statusesLength={board.status.length}
                    onClickAction={handleOpen}
                />
            </div>
            <DeleteContentDialog
                handleClose={handleClose}
                open={open}
                remove={() => removeStatus(status.id)}
                textContent={{
                    removedContentName: 'Status',
                    effectsOfDeletion: [
                        'Irreversible status removal',
                        'Removal of all tasks belonging to the status',
                    ],
                }}
                loading={isStatusRemoving}
            />
        </>
    )
}

export default BoardStatus
