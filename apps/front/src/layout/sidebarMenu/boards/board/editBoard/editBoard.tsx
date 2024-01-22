import React from 'react'
import DeleteBoard from '@src/layout/sidebarMenu/boards/board/editBoard/deleteBoard/deleteBoard'
import { Dialog, TextField } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import { StatusProps } from '@src/types/statusProps'
import useEditBoard from '@src/layout/sidebarMenu/boards/board/editBoard/useEditBoard'
import { BoardProps } from '@src/types/boardProps'
import MuiCircularProgress from '@src/components/ui/animations/muiCircularProgress'
import useUpdateBoardName from '@src/hooks/board/useUpdateBoardName'
import BoardStatus from '@src/layout/sidebarMenu/boards/board/editBoard/boardStatus/boardStatus'

type EditBoardProps = {
    board: BoardProps
    open: boolean
    handleClose: () => void
}
const EditBoard = ({ board, open, handleClose }: EditBoardProps) => {
    const { boardName, handleChange } = useEditBoard({ board })

    const { isBoardNameUpdating, editBoardName } = useUpdateBoardName(
        boardName,
        board.id
    )

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
                        {isBoardNameUpdating ? (
                            <MuiCircularProgress />
                        ) : (
                            <DoneIcon
                                className='cursor-pointer text-3xl'
                                onClick={editBoardName}
                            />
                        )}
                    </div>
                    <div className='font-bold'>Board Statuses</div>
                    {board.status.map((status: StatusProps) => {
                        return <BoardStatus status={status} key={status.id} />
                    })}
                </div>
            </div>
        </Dialog>
    )
}

export default EditBoard
