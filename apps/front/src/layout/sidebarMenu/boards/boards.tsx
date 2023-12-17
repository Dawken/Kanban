import React from 'react'
import useBoards from '@src/layout/sidebarMenu/boards/useBoards'
import { BoardType } from '@src/types/boardType'
import arrayFrom from '@src/utils/arrayFrom'
import Skeleton from '@mui/material/Skeleton'
import Board from '@src/layout/sidebarMenu/boards/board/board'
import AddBoard from '@src/layout/sidebarMenu/boards/addBoard/addBoard'

const Boards = () => {
    const { data, loading } = useBoards()

    return (
        <div className='flex flex-col items-center m-3'>
            <div className='w-full h-10 bg-zinc-900 rounded flex justify-center items-center hover:bg-[#353535] cursor-pointer'>
                <AddBoard />
            </div>
            <div className='text-left m-5 font-bold w-full'>
                {loading ? (
                    <Skeleton
                        variant='rounded'
                        width={110}
                        height={20}
                        animation='wave'
                    />
                ) : (
                    `ALL BOARDS ( ${data?.boards.length} )`
                )}
            </div>
            {loading
                ? arrayFrom(
                      3,
                      <Skeleton
                          className='m-1 w-full'
                          height={40}
                          variant='rounded'
                          animation='wave'
                      />
                  )
                : data?.boards.map((board: BoardType) => {
                      return <Board board={board} key={board.id} />
                  })}
        </div>
    )
}

export default Boards
