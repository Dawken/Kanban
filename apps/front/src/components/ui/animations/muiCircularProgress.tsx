import React from 'react'
import { CircularProgress } from '@mui/material'

const MuiCircularProgress = ({ size }: { size: number }) => {
    return (
        <div className='flex items-center'>
            <CircularProgress size={size} className='text-blue-400' />
        </div>
    )
}

export default MuiCircularProgress
