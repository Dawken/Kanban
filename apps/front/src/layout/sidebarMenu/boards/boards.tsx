'use client'
import React from 'react'
import useBoards from '@src/layout/sidebarMenu/boards/useBoards'
import Skeleton from '@mui/material/Skeleton'
import Board from '@src/layout/sidebarMenu/boards/sortableBoards/board/board'
import AddBoard from '@src/layout/sidebarMenu/boards/addBoard/addBoard'
import { ExpandedProps } from '@src/types/expandedProps'
import { BoardProps } from '@src/types/board/boardProps'
import DntContext from '@src/components/ui/drag/dntContext'
import { DragOverlay } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import useDragHandler from '@src/hooks/useDragHandler'
import SortableBoards from '@src/layout/sidebarMenu/boards/sortableBoards/sortableBoards'

const Boards = ({ expanded }: ExpandedProps) => {
    const { loading, boards, setBoards, boardsId } = useBoards()

    const {
        dragId,
        onDragStart,
        onDragCancel,
        handleOnDragEnd,
        draggedItem: draggedBoard,
    } = useDragHandler(boards)

    return (
        <div className='flex flex-col items-center mx-2 flex-1'>
            <div className='w-full h-12 px-1'>
                <AddBoard expanded={expanded} />
            </div>
            <div
                className={`${
                    expanded ? 'text-left' : 'text-center'
                } my-5 px-2 font-bold w-full whitespace-nowrap overflow-hidden`}
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
