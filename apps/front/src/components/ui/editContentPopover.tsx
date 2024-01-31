import React, { ReactNode } from 'react'
import { Popover } from '@mui/material'

type EditContentPopoverProps = {
    open: boolean
    onClose: () => void
    anchorEl: HTMLButtonElement | null
    children: ReactNode
}
const EditContentPopover = ({
    open,
    onClose,
    anchorEl,
    children,
}: EditContentPopoverProps) => {
    return (
        <Popover
            open={open}
            onClose={onClose}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <div className='text-xs text-gray-400 bg-neutral-950 font-bold'>
                <h1 className='pt-5 pb-2 px-5'>ACTIVITIES</h1>
                {children}
            </div>
        </Popover>
    )
}

export default EditContentPopover
