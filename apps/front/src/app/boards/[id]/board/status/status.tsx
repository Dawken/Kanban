import React from 'react'
import { StatusProps } from '@src/types/status/statusProps'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'

const Status = ({ status }: { status: StatusProps }) => {
    return (
        <div className='min-w-[250px] max-w-[250px] h-[220px] max-sm:min-h-[220px] bg-neutral-900 rounded text-gray-400 statusesScrollbar'>
            <div className='w-full h-12'>
                <div className='m-3 flex items-center justify-between'>
                    <div className='flex items-center justify-between overflow-hidden'>
                        <DragIndicatorIcon className='text-xl' />
                        <div className='ml-2 font-bold text-xs overflow-hidden overflow-ellipsis whitespace-nowrap'>
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
