import React from 'react'
import { TextField } from '@mui/material'
import MuiCircularProgress from '@src/components/ui/animations/muiCircularProgress'
import ClearIcon from '@mui/icons-material/Clear'
import useDeleteStatus from '@src/hooks/status/useDeleteStatus'
import { StatusProps } from '@src/types/statusProps'

const BoardStatus = ({ status }: { status: StatusProps }) => {
    const { removeStatus, isDeletingStatus } = useDeleteStatus()

    return (
        <div className='flex justify-center items-center gap-3' key={status.id}>
            <TextField fullWidth value={status.statusName} />
            {isDeletingStatus ? (
                <MuiCircularProgress />
            ) : (
                <ClearIcon
                    className='cursor-pointer text-2xl'
                    onClick={() => removeStatus(status.id)}
                />
            )}
        </div>
    )
}

export default BoardStatus
