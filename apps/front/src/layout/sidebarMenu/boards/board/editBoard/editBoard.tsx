import React from 'react'
import DeleteBoard from '@src/layout/sidebarMenu/boards/board/deleteBoard/deleteBoard'
import { CircularProgress, Dialog, TextField } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import { StatusProps } from '@src/types/statusProps'
import ClearIcon from '@mui/icons-material/Clear'
import useEditBoard from '@src/layout/sidebarMenu/boards/board/editBoard/useEditBoard'
import { BoardProps } from '@src/types/boardProps'

type EditBoardProps = {
    board: BoardProps
    open: boolean
    handleClose: () => void
}
const EditBoard = ({ board, open, handleClose }: EditBoardProps) => {
    const { loading, editBoardName, boardName, handleChange } = useEditBoard({
        board,
    })

    return (
        <Dialog onClose={handleClose} open={open} fullWidth>
            <div className='m-3 custom-scrollbar'>
                <div className='m-6 flex justify-between items-center'>
                    <div className='text-2xl font-bold'>Edit Board</div>
                    <DeleteBoard boardId={board.id} />
                </div>
                <div className='m-6 space-y-5'>
                    <div className='font-bold'>Board Name</div>
                    <div className='flex items-center gap-3'>
                        <TextField
                            value={boardName}
                            onChange={(event) =>
                                handleChange(event.target.value)
                            }
                            fullWidth
                        />
                        {loading ? (
                            <div className='w-8'>
                                <CircularProgress size={30} />
                            </div>
                        ) : (
                            <DoneIcon
                                className='cursor-pointer text-3xl'
                                onClick={editBoardName}
                            />
                        )}
                    </div>
                    <div className='font-bold'>Board Columns</div>
                    {board.status.map((status: StatusProps) => {
                        return (
                            <div
                                className='flex justify-center items-center gap-3'
                                key={status.id}
                            >
                                <TextField
                                    fullWidth
                                    value={status.statusName}
                                />
                                <ClearIcon className='cursor-pointer text-3xl' />
                            </div>
                        )
                    })}
                </div>
            </div>
        </Dialog>
    )
}

export default EditBoard
