import React from 'react'
import { Dialog, DialogTitle } from '@mui/material'
import BoardForm from '@src/components/ui/form/boardForm'
import useCreateBoardDialog from '@src/components/ui/dialog/createBoardDialog/useCreateBoardDialog'

type CreateBoardProps = {
    handleClose: () => void
    open: boolean
}
const CreateBoardDialog = ({ handleClose, open }: CreateBoardProps) => {
    const { methods, loading, addBoard } = useCreateBoardDialog(handleClose)

    return (
        <Dialog onClose={handleClose} open={open} fullWidth>
            <div className='m-3 mt-6'>
                <DialogTitle className='text-2xl font-bold'>
                    Create new Board
                </DialogTitle>
                <BoardForm
                    methods={methods}
                    submitAction={addBoard()}
                    loading={loading}
                />
            </div>
        </Dialog>
    )
}

export default CreateBoardDialog
