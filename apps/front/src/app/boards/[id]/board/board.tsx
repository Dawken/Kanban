'use client'
import React from 'react'
import useBoard from '@src/app/boards/[id]/board/useBoard'
import Skeleton from '@mui/material/Skeleton'
import EditIcon from '@mui/icons-material/Edit'
import EditBoard from '@src/components/ui/dialog/editBoard/editBoard'
import useToggleOpen from '@src/hooks/useToggleOpen'
const Board = () => {
    const { open, handleOpen, handleClose } = useToggleOpen()

    const { data, loading } = useBoard()

    return (
        <>
            <div className='text-gray-200 mt-10 text-xl font-bold w-[40vw]'>
                {loading ? (
                    <Skeleton
                        className='w-2/3'
                        height={32}
                        variant='rounded'
                        animation='wave'
                    />
                ) : (
                    <div className='flex items-center gap-3'>
                        <div className='overflow-hidden overflow-ellipsis whitespace-nowrap'>
                            {data?.board.boardName}
                        </div>
                        <EditIcon
                            className='text-gray-400 cursor-pointer'
                            onClick={() => handleOpen()}
                        />
                    </div>
                )}
            </div>
            {data?.board && (
                <EditBoard
                    board={data.board}
                    open={open}
                    handleClose={handleClose}
                />
            )}
        </>
    )
}

export default Board
