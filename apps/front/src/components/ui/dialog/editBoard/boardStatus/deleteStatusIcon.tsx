import React from 'react'
import ToolTip from '@src/components/ui/toolTip'
import ClearIcon from '@mui/icons-material/Clear'

type DeleteStatusIconProps = {
    statusesLength: number
    onClickAction: () => void
}
const DeleteStatusIcon = ({
    statusesLength,
    onClickAction,
}: DeleteStatusIconProps) => {
    return (
        <button
            className={`${
                statusesLength === 1
                    ? 'text-disabled cursor-not-allowed'
                    : 'cursor-pointer'
            }`}
            onClick={onClickAction}
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
                <ClearIcon className={'text-2xl'} />
            </ToolTip>
        </button>
    )
}

export default DeleteStatusIcon
