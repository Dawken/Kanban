import { BoardType } from '@src/types/boardType'
import DashboardIcon from '@mui/icons-material/Dashboard'
import React from 'react'
import Link from 'next/link'

const Board = ({ board }: { board: BoardType }) => {
    return (
        <Link
            href={`/boards/${board.id}`}
            className='w-full h-10 bg-zinc-900 rounded m-1 flex justify-center items-center hover:bg-[#353535]'
        >
            <span className='w-full m-5 space-x-3 text-sm'>
                <span>
                    <DashboardIcon />
                </span>
                <span>{board.boardName}</span>
            </span>
        </Link>
    )
}
export default Board
