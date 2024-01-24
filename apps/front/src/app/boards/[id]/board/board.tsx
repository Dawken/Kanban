'use client'
import React from 'react'
import useBoard from '@src/app/boards/[id]/board/useBoard'
import Skeleton from '@mui/material/Skeleton'
import EditIcon from '@mui/icons-material/Edit'
import EditBoard from '@src/components/ui/dialog/editBoard/editBoard'
import useToggleOpen from '@src/hooks/useToggleOpen'
import Image from 'next/image'
import BoardPhoto from '../../../../../public/assets/boardImage.png'

const Board = () => {
    const { open, handleOpen, handleClose } = useToggleOpen()

    const { data, loading } = useBoard()

    return (
        <>
            <div className='text-gray-200 mt-10 text-xl font-bold md:w-[40vw]'>
                {loading ? (
                    <div className='flex items-center gap-3'>
                        <Skeleton
                            width={44}
                            height={44}
                            variant='rounded'
                            animation='wave'
                        />
                        <Skeleton
                            className='w-1/3'
                            height={32}
                            variant='rounded'
                            animation='wave'
                        />
                    </div>
                ) : (
                    <div className='flex items-center gap-3'>
                        <Image
                            src={BoardPhoto}
                            alt='board image'
                            width={44}
                            className='rounded object-cover'
                        />
                        <div className='overflow-hidden overflow-ellipsis whitespace-nowrap'>
                            {data?.board.boardName}
                        </div>
                        <EditIcon
                            className='text-gray-400 cursor-pointer text-lg'
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
