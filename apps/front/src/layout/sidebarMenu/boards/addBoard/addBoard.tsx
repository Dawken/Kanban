import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import useAddBoard from '@src/layout/sidebarMenu/boards/addBoard/useAddBoard'
import useToggleOpen from '@src/hooks/useToogleOpen'
import { ExpandedProps } from '@src/types/expandedProps'
import ToolTip from '@src/components/ui/toolTip'
import BoardForm from '@src/components/ui/boardForm'
import { Dialog, DialogTitle } from '@mui/material'
import FormButton from '@src/components/ui/formButton'

const AddBoard = ({ expanded }: ExpandedProps) => {
    const { methods, loading, error, addBoard } = useAddBoard()

    const { handleOpen, open, handleClose } = useToggleOpen()

    return (
        <>
            <ToolTip name={'Add new board'}>
                <button
                    className='w-full h-full space-x-1 text-sm font-bold whitespace-nowrap overflow-hidden'
                    onClick={handleOpen}
                >
                    <span>
                        <AddIcon />
                    </span>
                    {expanded && (
                        <span className='overflow-ellipsis'>Add new Board</span>
                    )}
                </button>
            </ToolTip>
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
                                error={error}
                            />
                        }
                    />
                </div>
            </Dialog>
        </>
    )
}

export default AddBoard
