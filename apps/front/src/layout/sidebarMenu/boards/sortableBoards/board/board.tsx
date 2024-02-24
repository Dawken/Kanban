import { BoardProps } from '@src/types/board/boardProps'
import React from 'react'
import Link from 'next/link'
import ToolTip from '@src/components/ui/toolTip'
import useToggleOpen from '@src/hooks/useToggleOpen'
import EditIcon from '@mui/icons-material/Edit'
import useToggleHover from '@src/hooks/useToggleHover'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import { useParams } from 'next/navigation'
import { DragIdProps } from '@src/types/dragIdProps'
import Draggable from '@src/components/ui/drag/draggable'
import EditBoard from '@src/components/ui/dialog/editBoard/editBoard'
import { IconButton } from '@mui/material'

type BoardsProps = {
    board: BoardProps
    expanded: boolean
    dragId?: DragIdProps
}

const Board = ({ board, expanded, dragId }: BoardsProps) => {
    const { open, handleOpen, handleClose } = useToggleOpen()

    const { isHover, handleHover, handleUnhover } = useToggleHover()

    const params = useParams()

    return (
        <>
            <Draggable id={board.id} disabled={!expanded}>
                <ToolTip name={dragId ? '' : board.boardName}>
                    <div
                        className={`${
                            params.id === board.id
                                ? 'bg-gradient-to-br from-[#00dffc] to-[#00ff82] text-black'
                                : 'bg-zinc-900'
                        } w-full h-12 rounded-md flex items-center font-bold hover:bg-zinc-800 shadow-2xl`}
                        onMouseEnter={handleHover}
                        onMouseLeave={handleUnhover}
                    >
                        <Link
                            href={`/boards/${board.id}`}
                            className={
                                'w-full h-full text-sm flex justify-start items-center whitespace-nowrap overflow-hidden'
                            }
                        >
                            <DashboardRoundedIcon className='text-2xl ml-[1.15rem] ' />
                            {expanded && (
                                <div className='overflow-hidden overflow-ellipsis mx-2'>
                                    {board.boardName}
                                </div>
                            )}
                        </Link>
                        {expanded && (
                            <div
                                className={`flex items-center ml-auto mr-1 transition-all duration-300 ease-in-out gap-1 ${
                                    isHover ? 'opacity-100' : 'opacity-0'
                                }`}
                            >
                                <IconButton onClick={handleOpen}>
                                    <EditIcon
                                        className={`${
                                            params.id === board.id
                                                ? 'text-black'
                                                : 'text-white'
                                        } text-lg`}
                                    />
                                </IconButton>
                                <DragIndicatorIcon />
                            </div>
                        )}
                    </div>
                </ToolTip>
            </Draggable>
            <EditBoard board={board} open={open} handleClose={handleClose} />
        </>
    )
}
export default Board
