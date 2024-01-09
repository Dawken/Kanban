'use client'
import React from 'react'
import useBoards from '@src/layout/sidebarMenu/boards/useBoards'
import { BoardProps } from '@src/types/boardProps'
import arrayFrom from '@src/utils/arrayFrom'
import Skeleton from '@mui/material/Skeleton'
import Board from '@src/layout/sidebarMenu/boards/board/board'
import AddBoard from '@src/layout/sidebarMenu/boards/addBoard/addBoard'
import { ExpandedProps } from '@src/types/expandedProps'

const Boards = ({ expanded }: ExpandedProps) => {
    const { data, loading } = useBoards()

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
                    `ALL BOARDS ( ${data?.boards.length} )`
                ) : (
                    data?.boards.length
                )}
            </div>
            <div className='w-full max-h-[63vh] overscroll-auto space-y-3 custom-scrollbar'>
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
                    : data?.boards.map((board: BoardProps) => {
                          return (
                              <Board
                                  board={board}
                                  key={board.id}
                                  expanded={expanded}
                              />
                          )
                      })}
            </div>
        </div>
    )
}

export default Boards
