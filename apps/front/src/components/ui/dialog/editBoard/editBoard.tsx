import React from 'react'
import { ClickAwayListener, Dialog, TextField } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import { StatusProps } from '@src/types/status/statusProps'
import { BoardProps } from '@src/types/board/boardProps'
import MuiCircularProgress from '@src/components/ui/animations/muiCircularProgress'
import useUpdateBoardName from '@src/hooks/board/useUpdateBoardName'
import BoardStatus from '@src/components/ui/dialog/editBoard/boardStatus/boardStatus'
import DeleteBoard from '@src/components/ui/dialog/editBoard/deleteBoard/deleteBoard'
import FormButton from '@src/components/ui/form/formButton'
import useToggleOpen from '@src/hooks/useToggleOpen'
import useTextState from '@src/hooks/useTextState'
import AddContentTextField from '@src/components/ui/addContentTextField'
import useCreateStatus from '@src/hooks/status/useCreateStatus'

type EditBoardProps = {
    board: BoardProps
    open: boolean
    handleClose: () => void
}
const EditBoard = ({ board, open, handleClose }: EditBoardProps) => {
    const { text: boardName, handleChange } = useTextState(board.boardName)

    const { isBoardNameUpdating, editBoardName } = useUpdateBoardName()

    const {
        open: isNewStatusOpen,
        handleOpen,
        handleClose: closeNewStatus,
    } = useToggleOpen()

    const { addStatus, isStatusCreating } = useCreateStatus()

    return (
        <Dialog onClose={handleClose} open={open} fullWidth>
            <div className='m-3 boardsVerticalScrollbar'>
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
                            <MuiCircularProgress size={24} />
                        ) : (
                            <DoneIcon
                                className='cursor-pointer text-2xl'
                                onClick={() =>
                                    editBoardName(boardName, board.id)
                                }
                            />
                        )}
                    </div>
                    <div className='font-bold'>Board Statuses</div>
                    {board.status.map((status: StatusProps) => {
                        return (
                            <BoardStatus
                                status={status}
                                board={board}
                                key={status.id}
                            />
                        )
                    })}
                    {isNewStatusOpen && (
                        <ClickAwayListener onClickAway={closeNewStatus}>
                            <div>
                                <AddContentTextField
                                    closeNewStatus={closeNewStatus}
                                    createContent={addStatus}
                                    parentId={board.id}
                                    isCreating={isStatusCreating}
                                />
                            </div>
                        </ClickAwayListener>
                    )}
                    <div onClick={handleOpen}>
                        <FormButton loading={false} text={'Add new status'} />
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default EditBoard
