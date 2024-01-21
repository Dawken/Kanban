import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import { Dialog } from '@mui/material'
import useToggleOpen from '@src/hooks/useToggleOpen'
import useDeleteBoard from '@src/layout/sidebarMenu/boards/board/deleteBoard/useDeleteBoard'
import DeleteDialogButtons from '@src/components/ui/dialog/deleteDialogButtons'

type DeleteBoardProps = {
    boardId?: string
}
const DeleteBoard = ({ boardId }: DeleteBoardProps) => {
    const { open, handleOpen, handleClose } = useToggleOpen()

    const { removeBoard } = useDeleteBoard(boardId)

    return (
        <>
            <button
                className='bg-[#ff4f4d] rounded text-black'
                onClick={handleOpen}
            >
                <div className='m-1 flex justify-center items-center text-sm font-bold'>
                    <DeleteIcon className='text-xl my-1 mx-2' />
                </div>
            </button>
            <Dialog onClose={handleClose} open={open}>
                <div className='my-5 mx-10 font-bold space-y-5'>
                    <div className='text-center'>
                        Are you sure you want to delete board?
                    </div>
                    <div className='text-[#ADADB8] text-sm space-y-2'>
                        <hr className='my-4 border-t border-[#474747] w-96' />
                        <p>The removal of the board is associated with:</p>
                        <ul className='list-disc list-inside'>
                            <li>Irreversible board removal</li>
                            <li>Removal of all board statuses</li>
                            <li>Removal of all tasks belonging to the board</li>
                        </ul>
                    </div>
                    <div className='flex justify-center items-center gap-2 text-sm'>
                        <DeleteDialogButtons
                            handleClose={handleClose}
                            remove={removeBoard}
                        />
                    </div>
                </div>
            </Dialog>
        </>
    )
}

export default DeleteBoard
