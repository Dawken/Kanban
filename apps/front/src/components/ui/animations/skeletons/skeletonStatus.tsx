import React from 'react'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import MuiCircularProgress from '@src/components/ui/animations/muiCircularProgress'

const SkeletonStatus = ({ newStatusName }: { newStatusName: string }) => {
    return (
        <div className='pointer-events-none animate-pulse touch-none max-sm:w-[60vw] sm:min-w-[276px] sm:max-w-[276px] min-h-[420px] bg-neutral-900 rounded text-gray-400'>
            <div className='h-12 cursor-grab sticky top-0 z-10 bg-neutral-900'>
                <div className='p-3 flex items-center justify-between'>
                    <div className='flex items-center justify-start w-4/5 font-sans'>
                        <DragIndicatorIcon className='text-xl' />
                        <div className='w-11/12 ml-2 font-bold text-xs'>
                            <div className='p-2 rounded font-bold overflow-hidden whitespace-nowrap overflow-ellipsis'>
                                {newStatusName}
                            </div>
                        </div>
                    </div>
                    <div className='w-[34px] h-[34px] flex items-center justify-center'>
                        <MuiCircularProgress size={21} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkeletonStatus
