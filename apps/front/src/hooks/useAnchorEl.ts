import React, { useState } from 'react'

const useAnchorEl = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)

    return {
        anchorEl,
        handleClick,
        handleClose,
        open,
    }
}

export default useAnchorEl
