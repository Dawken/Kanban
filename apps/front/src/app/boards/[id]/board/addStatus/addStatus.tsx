import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import useCreateStatus from '@src/hooks/status/useCreateStatus'
import AddContentTextField from '@src/components/ui/addContentTextField'
import useToggleOpen from '@src/hooks/useToggleOpen'
import { ClickAwayListener } from '@mui/material'

const AddStatus = ({ boardId }: { boardId: string }) => {
    const { addStatus, isStatusCreating } = useCreateStatus()

    const {
        open: isNewStatusOpen,
        handleOpen,
        handleClose: closeNewStatus,
    } = useToggleOpen()

    return (
        <>
            {isNewStatusOpen ? (
                <ClickAwayListener onClickAway={closeNewStatus}>
                    <div className='min-w-[15vw] text-white'>
                        <AddContentTextField
                            closeNewStatus={closeNewStatus}
                            createContent={addStatus}
                            parentId={boardId}
                            isCreating={isStatusCreating}
                        />
                    </div>
                </ClickAwayListener>
            ) : (
                <button
                    className='bg-neutral-900 p-3 rounded flex items-center justify-center'
                    onClick={handleOpen}
                >
                    <AddIcon className='text-base text-white' />
                </button>
            )}
        </>
    )
}

export default AddStatus
