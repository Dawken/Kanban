import { BoardType } from '@src/types/boardType'
import DashboardIcon from '@mui/icons-material/Dashboard'
import React from 'react'
import Link from 'next/link'

type PropsType = {
    board: BoardType
    expanded: boolean
}
const Board = ({ board, expanded }: PropsType) => {
    return (
        <Link
            href={`/boards/${board.id}`}
            className='w-full h-10 bg-zinc-900 rounded m-1 hover:bg-[#353535] flex items-center'
        >
            <div className='w-full h-full space-x-3 text-sm flex ml-4 justify-start items-center whitespace-nowrap overflow-hidden'>
                <DashboardIcon />
                {expanded && (
                    <div className='overflow-hidden overflow-ellipsis'>
                        {board.boardName}
                    </div>
                )}
            </div>
        </Link>
    )
}
export default Board
