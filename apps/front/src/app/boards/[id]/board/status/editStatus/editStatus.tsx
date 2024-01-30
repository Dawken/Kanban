import React from 'react'
import AbcIcon from '@mui/icons-material/Abc'
import DeleteIcon from '@mui/icons-material/Delete'
import EditContentPopover from '@src/components/ui/editContentPopover'
import DeleteContentDialog from '@src/components/ui/dialog/deleteContentDialog'
import useToggleOpen from '@src/hooks/useToggleOpen'
import useDeleteStatus from '@src/hooks/status/useDeleteStatus'

type EditStatusProps = {
    open: boolean
    onClose: () => void
    anchorEl: HTMLButtonElement | null
    handleOpenStatus: () => void
    statusId: string
}
const EditStatus = ({
    open,
    onClose,
    anchorEl,
    handleOpenStatus,
    statusId,
}: EditStatusProps) => {
    const {
        open: isDeleteDialogOpen,
        handleOpen: handleOpenDeleteDialog,
        handleClose,
    } = useToggleOpen()

    const { removeStatus, isStatusRemoving } = useDeleteStatus()

    return (
        <>
            <EditContentPopover
                open={open}
                onClose={onClose}
                anchorEl={anchorEl}
            >
                <button
                    className='w-full gap-2 p-2 px-5 flex items-center hover:bg-neutral-900 hover:text-blue-600 transition-all'
                    onClick={() => {
                        handleOpenStatus()
                        onClose()
                    }}
                >
                    <AbcIcon />
                    <p>Change name</p>
                </button>
                <button
                    className='w-full gap-2 p-2 px-5 flex items-center hover:bg-neutral-900 hover:text-red-600 transition-all'
                    onClick={handleOpenDeleteDialog}
                >
                    <DeleteIcon />
                    <p>Delete</p>
                </button>
            </EditContentPopover>
            <DeleteContentDialog
                handleClose={handleClose}
                open={isDeleteDialogOpen}
                remove={() => removeStatus(statusId)}
                textContent={{
                    removedContentName: 'Status',
                    effectsOfDeletion: [
                        'Irreversible status removal',
                        'Removal of all tasks belonging to the status',
                    ],
                }}
                loading={isStatusRemoving}
            />
        </>
    )
}

export default EditStatus
