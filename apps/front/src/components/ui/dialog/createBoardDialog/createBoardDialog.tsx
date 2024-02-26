import React from 'react'
import { Dialog, DialogTitle } from '@mui/material'
import BoardForm from '@src/components/ui/form/boardForm'
import FormButton from '@src/components/ui/form/formButton'
import useCreateBoardDialog from '@src/components/ui/dialog/createBoardDialog/useCreateBoardDialog'

type CreateBoardProps = {
    handleClose: () => void
    open: boolean
}
const CreateBoardDialog = ({ handleClose, open }: CreateBoardProps) => {
    const { methods, loading, error, addBoard } =
        useCreateBoardDialog(handleClose)
    return (
        <Dialog onClose={handleClose} open={open} fullWidth>
            <div className='m-3'>
                <DialogTitle className='text-2xl font-bold'>
                    Create new Board
                </DialogTitle>
                <BoardForm
                    methods={methods}
                    submitAction={addBoard()}
                    ActionButton={
                        <FormButton
                            text={'Create new Board'}
                            loading={loading}
                            isError={error}
                        />
                    }
                />
            </div>
        </Dialog>
    )
}

export default CreateBoardDialog
