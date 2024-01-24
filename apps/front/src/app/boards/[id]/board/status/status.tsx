import React from 'react'
import { StatusProps } from '@src/types/status/statusProps'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

const Status = ({ status }: { status: StatusProps }) => {
    return (
        <div className='w-72 h-60 bg-neutral-900 rounded text-gray-400'>
            <div className='w-full h-12'>
                <div className='m-3 flex items-center justify-between'>
                    <div className='flex items-center justify-between'>
                        <DragIndicatorIcon className='text-xl' />
                        <div className='ml-2 font-bold text-sm'>
                            {status.statusName}
                        </div>
                    </div>
                    <MoreHorizIcon />
                </div>
            </div>
        </div>
    )
}

export default Status
