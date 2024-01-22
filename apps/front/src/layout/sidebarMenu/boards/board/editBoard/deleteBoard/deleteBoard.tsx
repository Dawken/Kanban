import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import useToggleOpen from '@src/hooks/useToggleOpen'
import useDeleteBoard from '@src/layout/sidebarMenu/boards/board/editBoard/deleteBoard/useDeleteBoard'
import DeleteContentDialog from '@src/components/ui/dialog/deleteContentDialog'

type DeleteBoardProps = {
    boardId: string
}
const DeleteBoard = ({ boardId }: DeleteBoardProps) => {
    const { open, handleOpen, handleClose } = useToggleOpen()

    const { removeBoard, isBoardRemoving } = useDeleteBoard(boardId)

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
            <DeleteContentDialog
                handleClose={handleClose}
                open={open}
                remove={removeBoard}
                textContent={{
                    removedContentName: 'Board',
                    effectsOfDeletion: [
                        'Irreversible board removal',
                        'Removal of all board statuses',
                        'Removal of all tasks belonging to the board',
                    ],
                }}
                loading={isBoardRemoving}
            />
        </>
    )
}

export default DeleteBoard
