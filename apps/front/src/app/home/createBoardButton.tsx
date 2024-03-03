'use client'
import React from 'react'
import CreateBoardDialog from '@src/components/ui/dialog/createBoardDialog/createBoardDialog'
import useToggleOpen from '@src/hooks/useToggleOpen'

const CreateBoardButton = () => {
    const { handleOpen, open, handleClose } = useToggleOpen()

    return (
        <div className='w-full flex justify-center xl:justify-start items-center gap-2 text-sm font-medium text-white'>
            <button
                className='w-36 h-8 hover:bg-blue-500 bg-blue-600 transition-all duration-500 rounded flex items-center justify-center'
                onClick={handleOpen}
            >
                Create Board
            </button>
            <CreateBoardDialog handleClose={handleClose} open={open} />
        </div>
    )
}

export default CreateBoardButton
