import React from 'react'
import { TextField } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'
import useDeleteStatus from '@src/hooks/status/useDeleteStatus'
import { StatusProps } from '@src/types/status/statusProps'
import DeleteContentDialog from '@src/components/ui/dialog/deleteContentDialog'
import useToggleOpen from '@src/hooks/useToggleOpen'

const BoardStatus = ({ status }: { status: StatusProps }) => {
    const { open, handleOpen, handleClose } = useToggleOpen()

    const { removeStatus, isStatusRemoving } = useDeleteStatus()

    return (
        <>
            <div className='flex justify-center items-center gap-3'>
                <TextField fullWidth value={status.statusName} />
                <ClearIcon
                    className='cursor-pointer text-2xl'
                    onClick={handleOpen}
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
