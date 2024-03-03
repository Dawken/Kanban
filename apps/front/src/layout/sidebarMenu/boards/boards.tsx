'use client'
import React from 'react'
import useBoards from '@src/layout/sidebarMenu/boards/useBoards'
import Skeleton from '@mui/material/Skeleton'
import Board from '@src/layout/sidebarMenu/boards/sortableBoards/board/board'
import { ExpandedProps } from '@src/types/expandedProps'
import { BoardProps } from '@src/types/board/boardProps'
import DntContext from '@src/components/ui/drag/dntContext'
import { DragOverlay } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import useDragHandler from '@src/hooks/useDragHandler'
import SortableBoards from '@src/layout/sidebarMenu/boards/sortableBoards/sortableBoards'
import AddIcon from '@mui/icons-material/Add'
import ToolTip from '@src/components/ui/toolTip'
import useToggleOpen from '@src/hooks/useToggleOpen'
import CreateBoardDialog from '@src/components/ui/dialog/createBoardDialog/createBoardDialog'

const Boards = ({ expanded }: ExpandedProps) => {
    const { loading, boards, setBoards, boardsId } = useBoards()

    const {
        dragId,
        onDragStart,
        onDragCancel,
        handleOnDragEnd,
        draggedItem: draggedBoard,
    } = useDragHandler(boards)

    const { handleOpen, open, handleClose } = useToggleOpen()

    return (
        <div className='flex flex-col items-center mx-2 h-4/5'>
            <div className='w-full h-12 px-1'>
                <ToolTip name={'Add new board'}>
                    <button
                        className='w-full h-12 bg-zinc-900 rounded-md whitespace-nowrap overflow-hidden flex justify-center items-center font-bold hover:bg-gradient-to-br from-[#00dffc] to-[#00ff82] hover:text-black'
                        onClick={handleOpen}
                    >
                        <AddIcon />
                        {expanded && (
                            <span className='overflow-ellipsis'>
                                Add new Board
                            </span>
                        )}
                    </button>
                </ToolTip>
                <CreateBoardDialog handleClose={handleClose} open={open} />
            </div>
            <div
                className={`${
                    expanded ? 'text-left' : 'text-center'
                } py-5 px-2 font-bold w-full whitespace-nowrap overflow-hidden`}
            >
                {loading ? (
                    <Skeleton
                        variant='rounded'
                        width={expanded ? 110 : 55}
                        height={20}
                    />
                ) : expanded ? (
                    `ALL BOARDS ( ${boards.length} )`
                ) : (
                    boards.length
                )}
            </div>
            <DntContext
                handleOnDragEnd={(event) =>
                    handleOnDragEnd<BoardProps>(event, setBoards)
                }
                onDragStart={onDragStart}
                onDragCancel={onDragCancel}
            >
                <SortableContext items={boardsId}>
                    <SortableBoards
                        boards={boards}
                        expanded={expanded}
                        loading={loading}
                    />
                </SortableContext>
                <DragOverlay>
                    {draggedBoard && (
                        <Board
                            key={draggedBoard.id}
                            board={draggedBoard as BoardProps}
                            expanded={expanded}
                            dragId={dragId}
                        />
                    )}
                </DragOverlay>
            </DntContext>
        </div>
    )
}

export default Boards
