import React from 'react'
import AbcIcon from '@mui/icons-material/Abc'
import DeleteIcon from '@mui/icons-material/Delete'
import EditContentPopover from '@src/components/ui/editContentPopover'
import DeleteContentDialog from '@src/components/ui/dialog/deleteContentDialog'
import useToggleOpen from '@src/hooks/useToggleOpen'
import useDeleteStatus from '@src/hooks/status/useDeleteStatus'
import { StatusProps } from '@src/types/status/statusProps'
import ToolTip from '@src/components/ui/toolTip'

type EditStatusProps = {
    open: boolean
    onClose: () => void
    anchorEl: HTMLButtonElement | null
    handleOpenStatus: () => void
    status: StatusProps
    statusesLength: number
}
const EditStatus = ({
    open,
    onClose,
    anchorEl,
    handleOpenStatus,
    status,
    statusesLength,
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
                    className='w-full gap-2 p-2 px-5 flex items-center hover:bg-neutral-900 transition-all'
                    onClick={() => {
                        handleOpenStatus()
                        onClose()
                    }}
                >
                    <AbcIcon fontSize='small' />
                    <p>Change name</p>
                </button>
                <button
                    className='w-full'
                    onClick={handleOpenDeleteDialog}
                    disabled={statusesLength === 1}
                >
                    <ToolTip
                        name={
                            statusesLength === 1
                                ? 'Board must contain at least 1 status'
                                : ''
                        }
                        placement='bottom'
                    >
                        <div
                            className={`w-full gap-2 p-2 px-5 flex items-center ${
                                statusesLength === 1
                                    ? 'text-disabled cursor-not-allowed'
                                    : 'text-primary'
                            } 
                ${
                    statusesLength === 1
                        ? 'hover:bg-transparent hover:text-disabled'
                        : 'hover:bg-neutral-900 hover:text-delete'
                } transition-all`}
                        >
                            <DeleteIcon fontSize='small' />
                            <p>Delete</p>
                        </div>
                    </ToolTip>
                </button>
            </EditContentPopover>
            <DeleteContentDialog
                handleClose={handleClose}
                open={isDeleteDialogOpen}
                remove={() => removeStatus(status.id)}
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
