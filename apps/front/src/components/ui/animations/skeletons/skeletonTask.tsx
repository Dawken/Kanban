import { IconButton } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import MuiCircularProgress from '@src/components/ui/animations/muiCircularProgress'

const SkeletonTask = ({ taskName }: { taskName: string }) => {
    return (
        <div className='bg-black animate-pulse min-h-[95px] rounded mx-1 text-white font-sans relative cursor-pointer'>
            <div className='h-full flex justify-between p-2'>
                <div className='w-4/5'>
                    <div className='p-2 mb-[5px] text-sm break-words cursor-pointer hover:bg-blue-400 hover:bg-opacity-5 transition-colors duration-500 rounded'>
                        {taskName}
                    </div>
                </div>
                <div className='absolute bottom-0 right-0 p-2.5 mr-1 flex flex-col justify-between h-full'>
                    <IconButton size='small'>
                        <MoreHorizIcon className='text-gray-400' />
                    </IconButton>
                    <div className='h-9 flex items-center justify-center'>
                        <MuiCircularProgress size={21} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkeletonTask
