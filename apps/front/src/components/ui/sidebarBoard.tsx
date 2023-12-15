import React from 'react'
import { BoardType } from '@src/types/boardType'
import DashboardIcon from '@mui/icons-material/Dashboard'

const SidebarBoard = ({ board }: { board: BoardType }) => {
    return (
        <div className='w-full bg-zinc-900 h-10 rounded m-2 flex justify-center items-center'>
            <span className='w-full m-5 space-x-5 text-sm'>
                <span>
                    <DashboardIcon />
                </span>
                <span>{board.boardName}</span>
            </span>
        </div>
    )
}

export default SidebarBoard
