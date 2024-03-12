import React, { RefObject, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add'
import useCreateStatus from '@src/hooks/status/useCreateStatus'
import AddContentTextField from '@src/components/ui/addContentTextField'
import useToggleOpen from '@src/hooks/useToggleOpen'
import { ClickAwayListener } from '@mui/material'
import SkeletonStatus from '@src/components/ui/animations/skeletons/skeletonStatus'

type AddStatusProps = {
    boardId: string
    scrollableRef: RefObject<HTMLDivElement>
}
const AddStatus = ({ boardId, scrollableRef }: AddStatusProps) => {
    const { addStatus, isStatusCreating, newStatusName } = useCreateStatus()

    const {
        open: isNewStatusOpen,
        handleOpen,
        handleClose: closeNewStatus,
    } = useToggleOpen()

    useEffect(() => {
        if (scrollableRef.current && (isNewStatusOpen || isStatusCreating)) {
            const { scrollWidth, clientWidth } = scrollableRef.current
            // Scroll to right edge of statuses container
            if (scrollWidth > clientWidth) {
                scrollableRef.current.scrollLeft = scrollWidth
            }
        }
    }, [isNewStatusOpen, isStatusCreating, scrollableRef])

    return (
        <>
            {isStatusCreating && (
                <SkeletonStatus newStatusName={newStatusName} />
            )}
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
