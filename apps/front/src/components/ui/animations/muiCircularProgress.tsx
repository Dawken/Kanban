import React from 'react'
import { CircularProgress } from '@mui/material'

const MuiCircularProgress = () => {
    return (
        <div className='flex items-center'>
            <CircularProgress size={30} className='text-white' />
        </div>
    )
}

export default MuiCircularProgress
