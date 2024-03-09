import { useState } from 'react'

const useToggleOpen = () => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const toggleOpen = () => {
        setOpen((prevState) => !prevState)
    }

    return { open, handleOpen, handleClose, toggleOpen }
}
export default useToggleOpen
