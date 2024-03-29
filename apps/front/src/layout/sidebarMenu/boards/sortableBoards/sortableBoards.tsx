import React from 'react'
import { BoardProps } from '@src/types/board/boardProps'
import Board from '@src/layout/sidebarMenu/boards/sortableBoards/board/board'
import arrayFrom from '@src/utils/arrayFrom'
import Skeleton from '@mui/material/Skeleton'
import useSortableBoards from '@src/layout/sidebarMenu/boards/sortableBoards/useSortableBoards'
import { DragIdProps } from '@src/types/dragIdProps'

type SortableBoardsProps = {
    boards: BoardProps[]
    expanded: boolean
    loading: boolean
    dragId: DragIdProps
}
const SortableBoards = ({
    boards,
    expanded,
    loading,
    dragId,
}: SortableBoardsProps) => {
    const { isBoardOrderUpdating } = useSortableBoards()

    return (
        <div className='w-full h-full overscroll-y-scroll flex flex-col gap-3 pr-1 pl-2 boardsVerticalScrollbar'>
            {loading
                ? arrayFrom(5, <Skeleton height={48} variant='rounded' />)
                : boards.map((board: BoardProps) => {
                      return (
                          <Board
                              board={board}
                              expanded={expanded}
                              dragId={dragId}
                              isBoardOrderUpdating={isBoardOrderUpdating}
                              key={board.id}
                          />
                      )
                  })}
        </div>
    )
}

export default SortableBoards
