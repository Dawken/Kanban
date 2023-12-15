import { BoardType } from '@src/types/boardType'
import DashboardIcon from '@mui/icons-material/Dashboard'
import React from 'react'

const Board = ({ board }: { board: BoardType }) => {
    return (
        <div className='w-full h-10 bg-zinc-900 rounded m-2 flex justify-center items-center'>
            <span className='w-full m-5 space-x-5 text-sm'>
                <span>
                    <DashboardIcon />
                </span>
                <span>{board.boardName}</span>
            </span>
        </div>
    )
}
export default Board
