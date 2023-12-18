import React from 'react'
import useBoards from '@src/layout/sidebarMenu/boards/useBoards'
import { BoardType } from '@src/types/boardType'
import arrayFrom from '@src/utils/arrayFrom'
import Skeleton from '@mui/material/Skeleton'
import Board from '@src/layout/sidebarMenu/boards/board/board'
import AddBoard from '@src/layout/sidebarMenu/boards/addBoard/addBoard'
import { ExpandedType } from '@src/types/expandedType'

const Boards = ({ expanded }: ExpandedType) => {
    const { data, loading } = useBoards()

    return (
        <div className='flex flex-col items-center m-3'>
            <div className='w-full h-10 bg-zinc-900 rounded flex justify-center items-center cursor-pointer hover:bg-[#353535] transition-color duration-500 ease-in-out'>
                <AddBoard expanded={expanded} />
            </div>
            <div
                className={`${
                    expanded ? 'text-left' : 'text-center'
                } m-5 font-bold w-full whitespace-nowrap overflow-hidden`}
            >
                {loading ? (
                    <Skeleton
                        variant='rounded'
                        width={expanded ? 110 : 55}
                        height={20}
                        animation='wave'
                    />
                ) : expanded ? (
                    `ALL BOARDS ( ${data.boards.length} )`
                ) : (
                    data.boards.length
                )}
            </div>
            {loading
                ? arrayFrom(
                      5,
                      <Skeleton
                          className='m-1 w-full'
                          height={40}
                          variant='rounded'
                          animation='wave'
                      />
                  )
                : data?.boards.map((board: BoardType) => {
                      return (
                          <Board
                              board={board}
                              key={board.id}
                              expanded={expanded}
                          />
                      )
                  })}
        </div>
    )
}

export default Boards
