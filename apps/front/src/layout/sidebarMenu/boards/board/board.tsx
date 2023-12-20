import { BoardType } from '@src/types/boardType'
import DashboardIcon from '@mui/icons-material/Dashboard'
import React from 'react'
import Link from 'next/link'
import ToolTip from '@src/components/ui/toolTip'

type PropsType = {
    board: BoardType
    expanded: boolean
}
const Board = ({ board, expanded }: PropsType) => {
    return (
        <ToolTip name={board.boardName}>
            <Link
                href={`/boards/${board.id}`}
                className='w-full h-10 bg-zinc-900 rounded flex items-center font-bold hover:bg-[#353535] transition-color duration-500 ease-in-out'
            >
                <div className='w-full h-full space-x-3 text-sm flex mx-4 justify-start items-center whitespace-nowrap overflow-hidden'>
                    <DashboardIcon />
                    {expanded && (
                        <div className='overflow-hidden overflow-ellipsis'>
                            {board.boardName}
                        </div>
                    )}
                </div>
            </Link>
        </ToolTip>
    )
}
export default Board
