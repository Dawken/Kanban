'use client'
import React from 'react'
import useBoards from '@src/layout/sidebarMenu/boards/useBoards'
import arrayFrom from '@src/utils/arrayFrom'
import Skeleton from '@mui/material/Skeleton'
import Board from '@src/layout/sidebarMenu/boards/board/board'
import AddBoard from '@src/layout/sidebarMenu/boards/addBoard/addBoard'
import { ExpandedProps } from '@src/types/expandedProps'
import { BoardProps } from '@src/types/board/boardProps'
import DntContext from '@src/components/ui/drag/dntContext/dntContext'
import { DragOverlay } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import useDragHandler from '@src/hooks/useDragHandler'

const Boards = ({ expanded }: ExpandedProps) => {
    const { dragId, onDragStart, onDragCancel } = useDragHandler()

    const { loading, boards, setBoards, draggedBoard } = useBoards(dragId)

    return (
        <div className='flex flex-col items-center m-3'>
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
                        animation='wave'
                    />
                ) : expanded ? (
                    `ALL BOARDS ( ${boards.length} )`
                ) : (
                    boards.length
                )}
            </div>
            <DntContext
                setItems={setBoards}
                onDragStart={onDragStart}
                onDragCancel={onDragCancel}
            >
                <SortableContext items={boards}>
                    <div className='w-full max-h-[63vh] overscroll-auto space-y-3 boardsVerticalScrollbar'>
                        {loading
                            ? arrayFrom(
                                  5,
                                  <Skeleton
                                      className='w-full'
                                      height={48}
                                      variant='rounded'
                                      animation='wave'
                                  />
                              )
                            : boards.map((board: BoardProps) => {
                                  return (
                                      <Board
                                          board={board}
                                          expanded={expanded}
                                          key={board.id}
                                      />
                                  )
                              })}
                    </div>
                </SortableContext>
                <DragOverlay>
                    {draggedBoard ? (
                        <Board
                            key={draggedBoard.id}
                            board={draggedBoard}
                            expanded={expanded}
                            dragId={dragId}
                        />
                    ) : null}
                </DragOverlay>
            </DntContext>
        </div>
    )
}

export default Boards
