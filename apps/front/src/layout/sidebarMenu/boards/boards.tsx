import React from 'react'
import useBoards from '@src/layout/sidebarMenu/boards/useBoards'
import { BoardType } from '@src/types/boardType'
import SidebarBoard from '@src/components/ui/sidebarBoard'

const Boards = () => {
    const { data, loading } = useBoards()

    if (loading) return <div>Loading...</div>

    return (
        <div className='flex flex-col items-center m-3'>
            <div className='text-left m-5 font-bold w-full'>
                ALL BOARDS ({`${data.boards.length}`})
            </div>
            {data.boards.map((board: BoardType) => {
                return <SidebarBoard board={board} key={board.id} />
            })}
        </div>
    )
}

export default Boards
