import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import useAddBoard from '@src/layout/sidebarMenu/boards/addBoard/useAddBoard'
import useToggleOpen from '@src/hooks/useToggleOpen'
import { ExpandedProps } from '@src/types/expandedProps'
import ToolTip from '@src/components/ui/toolTip'
import BoardForm from '@src/layout/sidebarMenu/boards/addBoard/boardForm'
import { Dialog, DialogTitle } from '@mui/material'
import FormButton from '@src/components/ui/formButton'

const AddBoard = ({ expanded }: ExpandedProps) => {
    const { methods, loading, error, addBoard } = useAddBoard()

    const { handleOpen, open, handleClose } = useToggleOpen()

    return (
        <>
            <ToolTip name={'Add new board'}>
                <button
                    className='w-full h-12 bg-zinc-900 rounded-md whitespace-nowrap overflow-hidden flex justify-center items-center font-bold hover:bg-gradient-to-br from-[#00dffc] to-[#00ff82] hover:text-black'
                    onClick={handleOpen}
                >
                    <AddIcon />
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
                                isError={error}
                            />
                        }
                    />
                </div>
            </Dialog>
        </>
    )
}

export default AddBoard
